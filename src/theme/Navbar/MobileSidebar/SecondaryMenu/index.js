import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function NavbarMobileSidebarSecondaryMenu() {
  const secondaryMenu = useNavbarSecondaryMenu();
  const { navbar: { items } } = useThemeConfig();
  const githubItem = items.find((item) => item.label === 'GitHub');

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{secondaryMenu.content}</div>
      {githubItem && (
        <div className={styles.footer}>
          <Link href={githubItem.href} className="menu__link">
            {githubItem.label}
          </Link>
        </div>
      )}
    </div>
  );
}
