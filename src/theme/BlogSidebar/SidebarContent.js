import React, { useState } from 'react';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useVisibleBlogSidebarItems } from '@docusaurus/plugin-content-blog/client';

function parseDateFromPermalink(permalink) {
  const m = permalink.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
  if (!m) return null;
  return new Date(m[1], m[2] - 1, m[3]).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function SidebarContent({ sidebar, cx }) {
  const location = useLocation();
  const { globalData } = useDocusaurusContext();
  const onTagPage = location.pathname.startsWith('/tags');

  const [view, setView] = useState(() => {
    if (onTagPage) return 'tags';
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('blogSidebarView') || 'home';
    }
    return 'home';
  });

  const changeView = (v) => {
    setView(v);
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('blogSidebarView', v);
  };

  const tags = globalData['blog-tags-plugin']?.default?.tags ?? [];
  const allItems = useVisibleBlogSidebarItems(sidebar.items);
  const items = view === 'home' ? allItems.slice(0, 3) : allItems;

  const grouped = items.reduce((acc, item) => {
    const m = item.permalink.match(/\/(\d{4})\//);
    const year = m ? m[1] : 'Other';
    (acc[year] = acc[year] || []).push(item);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => b - a);
  const [expandedYears, setExpandedYears] = useState(() => {
    if (typeof sessionStorage === 'undefined') return new Set();
    const stored = sessionStorage.getItem('blogSidebarExpandedYears');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const toggleYear = (year) =>
    setExpandedYears((prev) => {
      const next = new Set(prev);
      next.has(year) ? next.delete(year) : next.add(year);
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('blogSidebarExpandedYears', JSON.stringify([...next]));
      }
      return next;
    });

  const postItem = (item) => (
    <li key={item.permalink} className={cx.item}>
      <Link to={item.permalink} className={clsx(cx.link, parseDateFromPermalink(item.permalink) && cx.linkWithDate, location.pathname === item.permalink && cx.linkActive)}>
        {item.title}
        {parseDateFromPermalink(item.permalink) && (
          <span className={cx.date}>{parseDateFromPermalink(item.permalink)}</span>
        )}
      </Link>
    </li>
  );

  return (
    <>
      <div className={cx.stickyHeader}>
        <div className={cx.tabs}>
          <Link
            to="/"
            className={clsx(cx.tab, view === 'home' && cx.tabActive)}
            onClick={() => changeView('home')}
          >
            Home
          </Link>
          <button
            className={clsx(cx.buttonReset, cx.tab, view === 'posts' && cx.tabActive)}
            onClick={() => changeView('posts')}
          >
            All Posts
          </button>
          <button
            className={clsx(cx.buttonReset, cx.tab, view === 'tags' && cx.tabActive)}
            onClick={() => changeView('tags')}
          >
            Tags
          </button>
        </div>
        <div className={cx.title}>
          {view === 'tags' ? 'Tags' : view === 'posts' ? 'All Posts' : 'Recent Posts'}
        </div>
      </div>

      {view === 'home' && (
        <ul className={cx.list}>{items.map(postItem)}</ul>
      )}

      {view === 'posts' && (
        <ul className={cx.list}>
          {years.map((year) => (
            <li key={year}>
              <button className={clsx(cx.buttonReset, cx.yearToggle)} onClick={() => toggleYear(year)}>
                {year}
                <span>{expandedYears.has(year) ? '▾' : '▸'}</span>
              </button>
              {expandedYears.has(year) && (
                <ul className={clsx(cx.list, cx.yearGroup)}>{grouped[year].map(postItem)}</ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {view === 'tags' && (
        <ul className={cx.list}>
          {tags.map((tag) => (
            <li key={tag.permalink} className={cx.item}>
              <Link
                to={tag.permalink}
                className={clsx(cx.link, location.pathname === tag.permalink && cx.linkActive)}
              >
                {tag.label}
                <span className={cx.tagCount}>{tag.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
