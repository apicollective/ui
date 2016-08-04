import React, { PropTypes } from 'react';

import H2 from '../../../components/H2';
import ParameterList from '../ParameterList';

import styles from './parameter-list-group.css';

const ParameterListGroup = ({ title, parameters, service, imports, parentModel }) => (
  <div>
    <H2 className={styles.title}>{title}</H2>
    <div className={styles.container}>
      {parameters.length > 0
        ? parameters.map((parameter, id) => (
          <ParameterList
            key={id}
            {...parameter}
            service={service}
            imports={imports}
            parentModel={parentModel}
          />))
        : <p className={styles.noContent}>No parameters</p>}
    </div>
  </div>
);

ParameterListGroup.propTypes = {
  title: PropTypes.string.isRequired,
  parameters: PropTypes.array.isRequired,
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  parentModel: PropTypes.string.isRequired,
};

export default ParameterListGroup;
