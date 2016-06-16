import React, { PropTypes } from 'react';

import styles from './sidebar.css';


const Item = (props) => {
  return (
      <a href={props.href}>POST /{pros.name}</a>
  );
}

const Group = (props) => {
  return (
    <div>
      <label>{props.section.name}</label>
      {props.section.items.map( (group, id) => (
          <h2 key={id}>{group.name}</h2>
      ))}
    </div>
  )
}
const Groups = (props) => {
    // <label>{props.section.name}</label>
  // {props.section.items.map( (group, id) => (
      // <h2 key={id}>{group.name}</h2>
  // ))}
  return (
      <div>
      tt
    </div>
  )
}

const Section = (props) => {
  const groups = (
    <div>tt</div>
  )
          // <label>{props.section.name}</label>
  return (
    <div>
      {props.section.items.map( (group, id) => (
          <Groups group={group} />
      ))}
    </div>
  )
}

const SideBar = (props) =>  {
  return (
    <div className={styles.sidebar}>
      {props.items.map( (section, id) => (
          <Section key={id} section={section} />
      ))}
      <label>Resources</label>
    </div>
  );
    // <h2>Generator</h2>
    // <a>POST /generator/:id</a>
    // <a class="active">GET /generator/:id</a>
    // <a>PUT /generator</a>
    // <h2>Healthcheck</h2>
    // <a>POST /:id</a>
    // <a>GET /:id</a>
    // <a>PUT /:id</a>

    // <label>Resources</label>
    // <h2>Generator</h2>
    // <a>POST /generator/:id</a>
    // <a>GET /generator/:id</a>
    // <a>PUT /generator</a>
    // <h2>Healthcheck</h2>
    // <a>POST /:id</a>
    // <a>GET /:id</a>
    // <a>PUT /:id</a>
}

SideBar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SideBar;
