---
name: "Clearance"
descriptor: "permission-aware RAG"
summary: "Permission-aware document intelligence service. Multi-tenant RBAC, access-controlled RAG retrieval, OIDC auth, and full audit logging."
stack: ["Go", "Vue 3", "Postgres", "OpenTelemetry"]
order: 1
post: "pre-filter-vs-post-filter-retrieval"
# Add when ready (each renders only once set):
# role: "Solo, design and build"
# year: "2026"
# status: "Prototype"
# links:
#   - { label: "Source", href: "https://github.com/AlexandrosBotzis/..." }
---

## What it does

A document intelligence service where users ask questions over their organisation's documents, and every answer is limited to what that user is allowed to see. Tenants are isolated, documents carry a classification, and access is enforced at every layer:

- **Identity** through OIDC.
- **Authorization** through multi-tenant, role-based access control.
- **Retrieval** that only ever searches documents the user is cleared for.
- **Full audit logging.**

## Key decision: authorize before you retrieve

The obvious RAG flow searches by similarity first and filters by permission second. Every test passes, and no unauthorized document ever reaches the user. But the vector search has already scored every document in the system, confidential ones included, and those scores shape what the user gets back. Someone who can craft queries can infer what exists outside their access.

So authorization happens **before** similarity search: the search only runs over the set the user is allowed to see. With pgvector, that is subtler than a `WHERE` clause, because an approximate index filters after it scans. The full reasoning, and the ways to get real pre-filtering, are in the write-up: [Pre-filter vs Post-filter Retrieval in RAG](/blog/pre-filter-vs-post-filter-retrieval).

## What building it taught me

- **The LLM is not a security boundary.** If an unauthorized chunk reaches the model, it has already seen it. The filter has to happen before retrieval, not in the prompt.
- **Silent signals leak too.** Results shorter than the requested limit, or an "I don't know" triggered by a score threshold, can reveal that something exists outside the user's access.
