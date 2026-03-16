import React, { useState, useEffect } from 'react';
import Giscus from '@giscus/react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function GiscusInner() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme')  ?? 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme')  ?? 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <Giscus
      id="comments"
      repo="rnikoopour/engineering-blog"
      repoId="R_kgDORn5vRA"
      category="Blog Comments"
      categoryId="DIC_kwDORn5vRM4C4eSq"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  );
}

export default function GiscusComment() {
  return <BrowserOnly>{() => <GiscusInner />}</BrowserOnly>;
}
