import React, { PropTypes } from 'react';

import styles from './sidebar.css';


const Item = ({item}) => {
  return (
      <a href={item.href}>{item.name}</a>
  );
};

const Groups = ({ group }) => {
    //
  // ))}
  return (
    <div>
      <h2>{group.name}</h2>
        {group.items.map( (item, id) => (
          <Item key={id} item={item} />
        ))}
    </div>
  )
};

const Section = ({ section }) => {
  return (
    <div>
      <label>{section.name}</label>
      {section.items.map( (group, id) => (
          <Groups key={id} group={group} />
      ))}
    </div>
  )
};

const SideBar = (props) =>  {
  return (
    <div className={styles.sidebar}>
      {props.items.map( (section, id) => (
          <Section key={id} section={section} />
      ))}
    </div>
  );
};

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SideBar;
