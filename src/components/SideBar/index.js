import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { simplifyName } from '../../utils';

import styles from './sidebar.css';

const SidebarIcon = ({ item }) => {
  const iconClasses = classnames(
    styles[item.type.toLowerCase()],
    styles.icon,
    item.method ? styles[item.method.toLowerCase()] : null
  );

  const markup = item.method ? item.method[0] : item.type[0];

  return (
    <div className={iconClasses}>{markup}</div>
  )
};

const Item = ({ item }) => {
  return (<div onClick={item.onClick} className={classnames(styles.a, item.active ? styles.active : null)} {...item.data}>
    {item.type ? <SidebarIcon item={item} /> : null}
    {item.path ? item.path : simplifyName(item.name)}
  </div>);
}

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

const SideBar = ({ sections }) => {

  return (<div className={styles.sidebar}>
    <div className={styles.sidebarInner}>
      {sections.map((section, id) => (
        <Section key={id} section={section} />
      ))}
    </div>
  </div>);

};

SideBar.propTypes = {
  sections: PropTypes.array.isRequired,
};

export default SideBar;

export {
  styles,
};
