// GA4 behind consent. Nothing from Google loads until the visitor allows it
// (see src/components/ConsentBanner.astro). Until then `track` holds this
// page's events in memory: sent if the visitor allows on this page (a reader
// asked at the end of a post still counts as having read it), dropped on
// reject or when they leave. Nothing is stored or sent before consent.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'analytics-consent';
export type Consent = 'granted' | 'denied';

type Params = Record<string, string | number>;
/** This page's events from before a choice; see the header comment. */
const pending: [string, Params | undefined][] = [];

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* storage blocked: ask again next visit */ }
}

/** Loads gtag.js once. Page views, outbound clicks (LinkedIn, GitHub) and file
 *  downloads (CV) come from GA4 enhanced measurement; custom events use `track`. */
export function loadGa(id: string) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = false;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  // gtag must push the `arguments` object itself, not an array copy.
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
  for (const [event, params] of pending.splice(0)) window.gtag('event', event, params);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.append(s);
}

/** Withdrawal: stop GA on this page and remove its cookies (_ga, _ga_<id>). */
export function stopGa(id: string) {
  pending.length = 0;
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = true;
  const host = location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const name of document.cookie.split(';').map(c => c.split('=')[0].trim())) {
    if (!name.startsWith('_ga')) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    }
  }
}

export function track(event: string, params?: Params) {
  if (window.gtag) window.gtag('event', event, params);
  else if (readConsent() === null) pending.push([event, params]);  // undecided: hold until a choice
}
