// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import type { NavItem } from 'nav/NavItem';

import styles from 'components/SideBar/sidebar.css';

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

export default Section;
