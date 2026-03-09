import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

const DEFAULT_TITLE = 'EliteGrooming | #1 AI-Powered Premium Home Barber Dubai | VIP Grooming';
const DEFAULT_DESC = "Dubai's top mobile barber. AI-powered haircut suggestions for your face shape. Luxury grooming at home for executives & VIPs. Book elite barber Dubai.";
const DEFAULT_OG = 'https://www.barber2door.com/og-image.png';

export default function SEO({ title, description, keywords, canonical, ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title ? `${title} | EliteGrooming Dubai` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);

  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description || DEFAULT_DESC);
    return () => {
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESC);
    };
  }, [description]);

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

  useEffect(() => {
    const img = ogImage || DEFAULT_OG;
    const ogImg = document.querySelector('meta[property="og:image"]');
    const twImg = document.querySelector('meta[name="twitter:image"]');
    if (ogImg) ogImg.setAttribute('content', img);
    if (twImg) twImg.setAttribute('content', img);
  }, [ogImage]);

  return null;
}
