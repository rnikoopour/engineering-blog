import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function RssIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20
        6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1
        2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0
        0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0
        4 12.93V10.1z"/>
    </svg>
  );
}

function AtomIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1
        0 0,1 12,11M4.22,4.22C5.65,2.79 8.54,3.43 11.38,5.56C8.5,5.86
        5.86,8.5 5.56,11.38C3.43,8.54 2.79,5.65
        4.22,4.22M19.78,4.22C21.21,5.65 20.57,8.54 18.44,11.38C18.14,8.5
        15.5,5.86 12.62,5.56C15.46,3.43 18.35,2.79
        19.78,4.22M19.78,19.78C18.35,21.21 15.46,20.57 12.62,18.44C15.5,18.14
        18.14,15.5 18.44,12.62C20.57,15.46 21.21,18.35
        19.78,19.78M4.22,19.78C2.79,18.35 3.43,15.46 5.56,12.62C5.86,15.5
        8.5,18.14 11.38,18.44C8.54,20.57 5.65,21.21 4.22,19.78Z"/>
    </svg>
  );
}

export default function NavbarMobileSidebarSecondaryMenu() {
  const secondaryMenu = useNavbarSecondaryMenu();
  const { navbar: { items } } = useThemeConfig();
  const githubItem = items.find((item) => item.label === 'GitHub');

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{secondaryMenu.content}</div>
      <div className={styles.footer}>
        {githubItem && (
          <Link href={githubItem.href} className="menu__link">
            {githubItem.label}
          </Link>
        )}
        <Link href="/rss.xml" className={styles.feedIcon}
          aria-label="RSS Feed" target="_blank" rel="noopener noreferrer">
          <RssIcon />
        </Link>
        <Link href="/atom.xml" className={styles.feedIcon}
          aria-label="Atom Feed" target="_blank" rel="noopener noreferrer">
          <AtomIcon />
        </Link>
      </div>
    </div>
  );
}
