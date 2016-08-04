import React, { PropTypes } from 'react';

import { cleanPath } from '../../../utils';

import JsonDoc from '../../components/JsonDoc';
import ParameterListGroup from '../../components/ParameterListGroup';

import styles from './request.css';

const Request = ({ operation, service, imports, orgKey, appKey }) => {
  const body = () => {
    if (operation.body) {
      const baseModel = operation.body.type;
      return (
        <div className={styles.json}>
          <JsonDoc
            key={`${operation.body}-requestbody`}
            baseModel={baseModel}
            service={service}
            imports={imports}
            includeModel={true}
          />
        </div>
      );
    } else return null;
  };

  return (
    <div className={styles.container}>
      <ParameterListGroup
        parameters={operation.parameters}
        title="Request"
        service={service}
        imports={imports}
        parentModel={cleanPath(operation.path)}
      />
      {body()}
    </div>
  );
};
Request.propTypes = {
  operation: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  orgKey: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
};

export default Request;

export {
  styles,
};
