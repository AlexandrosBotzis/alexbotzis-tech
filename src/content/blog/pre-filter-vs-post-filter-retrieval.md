---
title: "Pre-filter vs Post-filter Retrieval in RAG"
description: "The code passed all tests. Documents came back correctly. The security hole was invisible. Until I thought about what the vector index was actually doing."
pubDate: 2026-10-29
tags: ["AI", "security"]
---

I was building a permission-aware RAG system. The idea was simple: users in different tenants should only ever see documents they're authorized to access. The retrieval flow looked like this:

1. Search documents by vector similarity
2. Filter the results by tenant and classification
3. Pass what's left to the LLM

Tests passed. Documents came back correctly. No errors, no leaks visible in the output. I was about to move on.

Then I stopped and thought about what the vector index was actually doing.

## The problem with filtering after the fact

When you search first and filter second, the vector index touches **every document in the system**, including the confidential ones. It scores them all by similarity, picks the top results, and only then does your authorization layer discard the ones the user shouldn't see.

On the surface, nothing wrong. The unauthorized document never reaches the user.

But here's the silent part: that confidential document just influenced the results. If it ranked first by similarity, it pushed everything else down. What the user gets back has been shaped by a document they're not allowed to know exists.

An attacker who can craft queries and observe the results can eventually figure out:
- Whether a confidential document exists on a given topic
- Roughly what it covers, based on which queries cause "unexpected" shifts in results

No error. No obvious breach. Just information bleeding through scores and rankings. It's the kind of bug that never shows up in a review because it looks exactly like correct code.

## The fix is one line of thinking

Authorization has to happen **before** similarity search, not after. Filter first, then search only within the authorized set.

In SQL with pgvector, the query below *looks* like it filters first: the `WHERE` clause sits right above the `ORDER BY`. That's the trap.

```sql
SELECT d.title, dc.classification, dc.chunk_index, dc.content,
       1 - (dc.embedding <=> $3::vector) AS score
FROM document_chunks dc
JOIN documents d ON d.id = dc.document_id
WHERE dc.tenant_id = $1
  AND dc.classification = ANY($2)
ORDER BY dc.embedding <=> $3::vector
LIMIT $4
```

With an approximate index like HNSW, pgvector walks the index first and applies the `WHERE` clause to the candidates it finds. The graph is shared, so the search still traverses and scores rows from every tenant; the filter only decides which of them you get back. And if most candidates belong to someone else, you get fewer rows than `LIMIT`. That gap is a signal of its own about what else lives in the index.

Real pre-filtering means the search never touches rows the user can't see:

- **A partial index or a partition per tenant.** Each tenant's query runs over its own index, so other tenants' rows are never candidates.
- **An exact scan over the filtered set**, when it's small enough. Without the approximate index, Postgres applies the `WHERE` first and only computes distances for rows that passed it.
- **Iterative index scans** (`SET hnsw.iterative_scan = strict_order;`, pgvector 0.8+) keep scanning until enough rows pass the filter. That fixes the short results, but not the isolation: the index is still shared.

## Things I'd check in any RAG system now

**Every vector database has this footgun.** Elasticsearch, Pinecone, Weaviate, pgvector: they all support pre-filtering, but none of them enforce it. You have to know to ask. Read the docs for whatever you're using. Don't assume the default is safe.

**Shared indexes are the riskiest setup.** When all tenants share a single vector index (common for cost reasons), pre-filtering is the only safe path. Separate indexes per tenant eliminate the problem entirely but come at a price.

**The LLM is not your security layer.** You might think: "I'll just instruct the model to ignore documents it shouldn't reference." That's not a boundary. If unauthorized chunks reach the model, the model has already seen them. The filter has to happen before retrieval, full stop.

**Score-based abstention can leak too.** If your system returns "I don't know" when the top similarity score falls below a threshold, an attacker who consistently triggers abstentions can infer that relevant documents exist, just outside the user's access level. A weaker signal, but a signal.

## The question worth asking in every design review

> "Where exactly does the authorization filter happen relative to the retrieval?"

That's it. That's the whole review. If the answer is "after", stop.

What makes this class of bug hard isn't the fix. Even the SQL that looks correct can be the broken version, as the query above shows. What makes it hard is that the broken version is indistinguishable from the correct one at every layer you'd normally trust. The query returns the right documents. The tests pass. The logs show no errors. The user never sees anything they shouldn't.

Your system is telling you everything is fine. It's just not telling you what it's doing to arrive there.
