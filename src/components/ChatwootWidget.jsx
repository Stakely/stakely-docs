import { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import * as chatwoot from 'ahize/chatwoot';

const STORAGE_KEY = 'chatwoot_visitor_id';

function fallbackVisitorId() {
  return `anon_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getOrCreateVisitorId() {
  const existingId = window.localStorage.getItem(STORAGE_KEY);
  if (existingId) {
    return existingId;
  }

  const generatedId =
    typeof window.crypto?.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : fallbackVisitorId();
  window.localStorage.setItem(STORAGE_KEY, generatedId);
  return generatedId;
}

export default function ChatwootWidget() {
  const { siteConfig } = useDocusaurusContext();
  const { chatwootWebsiteToken, chatwootBaseUrl } = siteConfig.customFields ?? {};

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (!chatwootWebsiteToken || !chatwootBaseUrl) {
      return;
    }

    const visitorId = getOrCreateVisitorId();

    let cancelled = false;
    const boot = async () => {
      try {
        await chatwoot.load({
          websiteToken: chatwootWebsiteToken,
          baseUrl: chatwootBaseUrl,
          darkMode: 'auto',
        });
        await chatwoot.ready();
        if (!cancelled) {
          await chatwoot.identify({ id: visitorId });
        }
      } catch (error) {
        console.error('Failed to initialize Chatwoot widget:', error);
      }
    };

    void boot();

    return () => {
      cancelled = true;
    };
  }, [chatwootWebsiteToken, chatwootBaseUrl]);

  return null;
}
