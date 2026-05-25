// NQRust-HyperVisor marketing landing page.
// Body markup is the design from claude.ai/design (h/gi5nzjSCXo5etBpK0RWbqg),
// pre-serialised at build time and injected via dangerouslySetInnerHTML so
// the design stays byte-identical. Lucide icons + scroll/anchor handlers
// run client-side after hydration.
import React, {useEffect, useRef} from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import body from './_landing-body.json';
import '../css/landing.css';

export default function Home() {
  const rootRef = useRef(null);

  useEffect(() => {
    // Render Lucide icons once the script is on the page.
    function renderIcons() {
      if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
      }
    }
    if (typeof window !== 'undefined' && !window.lucide) {
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
      s.async = true;
      s.onload = renderIcons;
      document.body.appendChild(s);
    } else {
      renderIcons();
    }

    // Sticky nav shadow on scroll.
    const nav = document.querySelector('.nav');
    const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();

    // Smooth-scroll for internal anchors.
    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({top, behavior: 'smooth'});
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onAnchorClick);
    };
  }, []);

  return (
    <>
      <Head>
        <html lang="en" />
        <title>NQRust-HyperVisor — Production HCI for the data-sovereign enterprise</title>
        <meta
          name="description"
          content="NQRust-HyperVisor is a commercially licensed, hyperconverged virtualization platform — VMs, storage, networking, backup and monitoring from one dashboard, on your own hardware."
        />
        <link rel="icon" type="image/png" sizes="192x192" href={useBaseUrl('/web-icon/android-chrome-192x192.png')} />
        <link rel="icon" type="image/png" sizes="512x512" href={useBaseUrl('/web-icon/android-chrome-512x512.png')} />
        <link rel="apple-touch-icon" href={useBaseUrl('/web-icon/android-chrome-192x192.png')} />
      </Head>
      <div className="nq-landing" ref={rootRef} dangerouslySetInnerHTML={{__html: body}} />
    </>
  );
}
