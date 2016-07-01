import React, { Component, PropTypes } from 'react';

import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import Request from '../../components/Request';
import Response from '../../components/Response';

import styles from './operation.css';

const Operation = ({ spec, operation, applicationKey, organizationKey, resource, method, path, imports }) => {
  return (
    <div>
      <div className={styles.header}>
        <H1 className={styles.h1}>{spec.name}</H1>
        <p className={styles.description}>{spec.description}</p>
      </div>
      <H2>{operation.method} {operation.path}</H2>
      <Request
        appKey={applicationKey}
        orgKey={organizationKey}
        key={`${method}${resource}${path}-request`}
        operation={operation}
        spec={spec}
        imports={imports}
      />
      <Response
        appKey={applicationKey}
        orgKey={organizationKey}
        key={`${method}${resource}${path}-response`}
        operation={operation}
        spec={spec}
        imports={imports}
      />
    </div>
  )
};

export default Operation;