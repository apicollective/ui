import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './sidebar.css';

const Item = ({ item }) =>
  <div onClick={item.onClick} className={classnames(styles.a, item.active ? styles.active : null)} {...item.data}>
    {item.name}
  </div>;

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

const Groups = ({ group }) =>
  <div className={styles.group}>
    <h2 className={styles.h2}>{group.name}</h2>
    {group.items.map((item, id) => (
      <Item key={id} item={item} />
    ))}
  </div>;

Groups.propTypes = {
  group: PropTypes.object.isRequired,
};

const Section = ({ section }) =>
  <div className={styles.section}>
    <label className={styles.label}>{section.name}</label>
    {section.items.map((group, id) => (
      <Groups key={id} group={group} />
    ))}
  </div>;

Section.propTypes = {
  section: PropTypes.object.isRequired,
};

const SideBar = ({ sections }) =>
  <div className={styles.sidebar}>
    <div className={styles.sidebarInner}>
      {sections.map((section, id) => (
        <Section key={id} section={section} />
      ))}
    </div>
  </div>;

SideBar.propTypes = {
  sections: PropTypes.array.isRequired,
};

export default SideBar;

export {
  styles,
};
