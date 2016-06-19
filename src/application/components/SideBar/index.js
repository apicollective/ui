import React, { PropTypes } from 'react';

import styles from './sidebar.css';


const Item = ({ item }) => (
  <a className={styles.a} href={item.href}>{item.name}</a>
);
Item.propTypes = {
  item: PropTypes.object.isRequired,
};

const Groups = ({ group }) => (
  <div className={styles.group}>
    <h2 className={styles.h2}>{group.name}</h2>
      {group.items.map((item, id) => (
        <Item key={id} item={item} />
      ))}
  </div>
);
Groups.propTypes = {
  group: PropTypes.object.isRequired,
};

const Section = ({ section }) => (
  <div className={styles.section}>
    <label className={styles.label}>{section.name}</label>
    {section.items.map((group, id) => (
      <Groups key={id} group={group} />
    ))}
  </div>
);
Section.propTypes = {
  section: PropTypes.object.isRequired,
};

const SideBar = ({ items }) => (
  <div className={styles.sidebar}>
    {items.map((section, id) => (
      <Section key={id} section={section} />
    ))}
  </div>
);
SideBar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SideBar;

export {
  styles,
};
