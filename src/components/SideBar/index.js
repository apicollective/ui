import React, { PropTypes } from 'react';

import styles from './sidebar.css';

const Item = ({ item, onClick }) =>
  <div onClick={onClick} className={styles.a} {...item.data}>{item.name}</div>;

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Groups = ({ group, onClick }) =>
  <div className={styles.group}>
    <h2 className={styles.h2}>{group.name}</h2>
    {group.items.map((item, id) => (
      <Item key={id} item={item} onClick={onClick} />
    ))}
  </div>;

Groups.propTypes = {
  group: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Section = ({ section, onClick }) =>
  <div className={styles.section}>
    <label className={styles.label}>{section.name}</label>
    {section.items.map((group, id) => (
      <Groups key={id} group={group} onClick={onClick} />
    ))}
  </div>;

Section.propTypes = {
  section: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SideBar = ({ items, onClick }) =>
  <div className={styles.sidebar}>
    {items.map((section, id) => (
      <Section key={id} section={section} onClick={onClick} />
    ))}
  </div>;

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SideBar;

export {
  styles,
};
