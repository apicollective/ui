import React, { PropTypes } from 'react';

import H2 from '../../../components/H2';
import ParameterList from '../ParameterList';

import styles from './parameter-list-group.css';

const ParameterListGroup = ({ title, parameters, spec, imports, parentModel }) => (
  <div className={styles.container}>
    <H2 className={styles.title}>{title}</H2>
      {parameters.length > 0 ? parameters.map((parameter, id) => (
        <ParameterList
          key={id}
          {...parameter}
          spec={spec}
          imports={imports}
          parentModel={parentModel}
        />
       )) : <p>No parameters</p>}
  </div>
);

ParameterListGroup.propTypes = {
  title: PropTypes.string.isRequired,
  parameters: PropTypes.array.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  parentModel: PropTypes.string.isRequired,
};

export default ParameterListGroup;
