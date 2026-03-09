import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const DEFAULT_TITLE = 'Barber2Door | #1 AI-Powered Premium Home Barber Dubai | VIP Grooming';
const DEFAULT_DESC = "Dubai's top mobile barber. AI-powered haircut suggestions for your face shape. Luxury grooming at home for executives & VIPs. Book elite barber Dubai.";
const DEFAULT_OG = 'https://www.barber2door.com/og-image.png';

export default function SEO({ title, description, keywords, canonical, ogImage, ogTitle, ogDescription }: SEOProps) {
  const effectiveTitle = title ? `${title} | Barber2Door Dubai` : DEFAULT_TITLE;
  const effectiveDesc = description || DEFAULT_DESC;
  const effectiveOgTitle = ogTitle ?? effectiveTitle;
  const effectiveOgDesc = ogDescription ?? effectiveDesc;

  useEffect(() => {
    document.title = effectiveTitle;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [effectiveTitle]);

  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', effectiveDesc);
    return () => {
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESC);
    };
  }, [effectiveDesc]);

  useEffect(() => {
    if (!keywords) return;
    const metaKw = document.querySelector('meta[name="keywords"]');
    if (metaKw) metaKw.setAttribute('content', keywords);
  }, [keywords]);

  useEffect(() => {
    if (!canonical) return;
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) linkCanonical.setAttribute('href', canonical);
  }, [canonical]);

  // Open Graph - used when sharing links on social media
  useEffect(() => {
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    const twTitleEl = document.querySelector('meta[name="twitter:title"]');
    const twDescEl = document.querySelector('meta[name="twitter:description"]');
    const img = ogImage || DEFAULT_OG;
    const ogImg = document.querySelector('meta[property="og:image"]');
    const twImg = document.querySelector('meta[name="twitter:image"]');

    if (ogTitleEl) ogTitleEl.setAttribute('content', effectiveOgTitle);
    if (ogDescEl) ogDescEl.setAttribute('content', effectiveOgDesc);
    if (twTitleEl) twTitleEl.setAttribute('content', effectiveOgTitle);
    if (twDescEl) twDescEl.setAttribute('content', effectiveOgDesc);
    if (ogImg) ogImg.setAttribute('content', img);
    if (twImg) twImg.setAttribute('content', img);

    return () => {
      if (ogTitleEl) ogTitleEl.setAttribute('content', DEFAULT_TITLE);
      if (ogDescEl) ogDescEl.setAttribute('content', DEFAULT_DESC);
      if (twTitleEl) twTitleEl.setAttribute('content', DEFAULT_TITLE);
      if (twDescEl) twDescEl.setAttribute('content', DEFAULT_DESC);
    };
  }, [effectiveOgTitle, effectiveOgDesc, ogImage]);

  return null;
}
