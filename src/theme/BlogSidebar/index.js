import React, { useState } from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import BlogSidebarMobile from '@theme/BlogSidebar/Mobile';
import { SidebarContent } from './SidebarContent';
import styles from './styles.module.css';

const desktopCx = {
  stickyHeader: styles.stickyHeader,
  buttonReset: null,
  tabs: styles.tabs,
  tab: styles.tab,
  tabActive: styles.tabActive,
  title: clsx(styles.sidebarItemTitle, 'margin-bottom--md'),
  list: clsx(styles.sidebarItemList, 'clean-list'),
  item: styles.sidebarItem,
  link: styles.sidebarItemLink,
  linkActive: styles.sidebarItemLinkActive,
  linkWithDate: null,
  date: styles.postDate,
  yearToggle: styles.yearToggle,
  yearGroup: styles.yearGroup,
  tagCount: styles.tagCount,
};

function BlogSidebarDesktop({ sidebar }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={clsx('col col--3', styles.asideRelative, collapsed && styles.asideCollapsed)}>
      <div className={styles.collapseToggleAnchor}>
        <button
          className={clsx(styles.collapseToggle, collapsed && styles.collapseToggleCollapsed)}
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '▶ menu ▶' : '◀ hide ◀'}
        </button>
      </div>
      {!collapsed && (
        <nav
          className={clsx(styles.sidebar, 'thin-scrollbar')}
          aria-label={translate({
            id: 'theme.blog.sidebar.navAriaLabel',
            message: 'Blog recent posts navigation',
            description: 'The ARIA label for recent posts in the blog sidebar',
          })}
        >
          <SidebarContent sidebar={sidebar} cx={desktopCx} />
        </nav>
      )}
    </aside>
  );
}

export default function BlogSidebar({ sidebar }) {
  const windowSize = useWindowSize();
  if (!sidebar?.items.length) return null;
  if (windowSize === 'mobile') return <BlogSidebarMobile sidebar={sidebar} />;
  return <BlogSidebarDesktop sidebar={sidebar} />;
}
