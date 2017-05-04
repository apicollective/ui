// @flow
import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import { simplifyName } from 'utils';
import type { NavItem } from 'components/NavBar';

import styles from 'components/SideBar/sidebar.css';

/* const SidebarIcon = ({ item }: { item: NavItem }) => {
 *   const iconClasses = classnames(
 *     item.type ? styles[item.type.toLowerCase()] : null,
 *     styles.icon
   *     item.method ? styles[item.method.toLowerCase()] : null
   *   );
*
*   const markup = item.method ? item.method : item.type[0];
  *   const markup = item.type ? item.type[0] : null;
  *
  *   return <div className={iconClasses}>{markup}</div>;
* };
* */

const Item = ({ item }: { item: NavItem }) => (
  <NavLink
    to={item.toHref}
    className={classnames(styles.a, item.active ? styles.active : null)}
  >
    {/* { {...item.data} } > */}
    {/* {item.path ? `${item.method} ${item.path}` : simplifyName(item.name)} */}
    {item.name}
  </NavLink>
);

const Groups = ({ group }: { group: NavItem }) => (
  <div className={styles.group}>
    <h2 className={styles.h2}>{group.name}</h2>
    {group.items
      ? group.items.map((item, id) => <Item key={item.name} item={item} />)
      : null}
  </div>
);

const Section = ({ section }: { section: NavItem }) => (
  <div className={styles.section}>
    <label className={styles.label}>{section.name}</label>
    {section.items
      ? section.items.map((group, id) => (
          <Groups key={group.name} group={group} />
        ))
      : null}
  </div>
);

const SideBar = ({ sections }: { sections: NavItem[] }) => (
  <div className={styles.sidebar}>
    <div className={styles.sidebarInner}>
      {sections.map((section, id) => (
        <Section key={section.name} section={section} />
      ))}
    </div>
  </div>
);

export default SideBar;

export { styles };
