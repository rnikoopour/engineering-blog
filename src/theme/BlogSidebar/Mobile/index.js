import React from 'react';
import clsx from 'clsx';
import { NavbarSecondaryMenuFiller } from '@docusaurus/theme-common';
import { SidebarContent } from '../SidebarContent';
import styles from './styles.module.css';
import desktopStyles from '../styles.module.css';

const mobileCx = {
  stickyHeader: null,
  // Tabs use desktop pill styles but override font-size to match menu items
  tabs: desktopStyles.tabs,
  tab: clsx(desktopStyles.tab, styles.tabFontOverride),
  tabActive: desktopStyles.tabActive,
  buttonReset: styles.menuButton,
  // Title and list items use Infima mobile menu classes
  title: styles.sectionTitle,
  list: 'menu__list',
  item: 'menu__list-item',
  link: 'menu__link',
  linkActive: 'menu__link--active',
  linkWithDate: styles.linkColumn,
  date: styles.postDate,
  yearToggle: 'menu__link',
  yearGroup: 'menu__list',
  tagCount: styles.tagCount,
};

function MobileSidebarContent({ sidebar }) {
  return <SidebarContent sidebar={sidebar} cx={mobileCx} />;
}

export default function BlogSidebarMobile(props) {
  return <NavbarSecondaryMenuFiller component={MobileSidebarContent} props={props} />;
}
