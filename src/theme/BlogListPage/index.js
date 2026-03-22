import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import TOC from '@theme/TOC';

function BlogListPageMetadata({ metadata }) {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function ActiveTOC({ items }) {
  const firstToc =
    items.find(({ content }) => content.toc?.length > 0)?.content.toc ?? [];
  const [activeToc, setActiveToc] = useState(firstToc);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Map every permalink to its TOC (empty array if none).
    const tocByPermalink = new Map();
    for (const { content } of items) {
      tocByPermalink.set(content.metadata.permalink, content.toc ?? []);
    }

    function update() {
      const articles = Array.from(document.querySelectorAll('article'));
      const navHeight =
        document.querySelector('.navbar')?.offsetHeight ?? 60;

      // Find the last article whose top has scrolled past the navbar —
      // that's the post currently being read.
      let currentPermalink = null;
      for (const article of articles) {
        const rect = article.getBoundingClientRect();
        if (rect.top <= navHeight + 20) {
          const titleLink = article.querySelector('h2 a[href], h1 a[href]');
          if (titleLink) {
            currentPermalink = titleLink.getAttribute('href');
          }
        }
      }

      const toc =
        currentPermalink !== null
          ? (tocByPermalink.get(currentPermalink) ?? [])
          : firstToc;
      setActiveToc(toc);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [items]);

  if (!activeToc.length) return null;
  return <TOC toc={activeToc} />;
}

function BlogListPageContent({ metadata, items, sidebar }) {
  const hasToc = items.some(({ content }) => content.toc?.length > 0);
  return (
    <BlogLayout
      sidebar={sidebar}
      toc={hasToc ? <ActiveTOC items={items} /> : undefined}
    >
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
