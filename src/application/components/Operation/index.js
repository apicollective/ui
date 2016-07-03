import React, { PropTypes } from 'react';

import Markdown from '../../../components/Markdown';
import Request from '../../components/Request';
import Response from '../../components/Response';
import ResourceCard from '../../components/ResourceCard';

import styles from './operation.css';

const Operation = ({ spec, operation, applicationKey, organizationKey, resource, method, path, imports }) =>
  <div className={styles.content}>
    <div className={styles.header}>
      <ResourceCard
        method={operation.method}
        path={operation.path}
      />
    </div>
    <Markdown source={operation.description ? operation.description : ''} className={styles.description} />
    <div className={styles.request}>
      <Request
        appKey={applicationKey}
        orgKey={organizationKey}
        key={`${method}${resource}${path}-request`}
        operation={operation}
        spec={spec}
        imports={imports}
      />
    </div>
    <Response
      appKey={applicationKey}
      orgKey={organizationKey}
      key={`${method}${resource}${path}-response`}
      operation={operation}
      spec={spec}
      imports={imports}
    />
  </div>;

Operation.propTypes = {
  spec: PropTypes.object.isRequired,
  operation: PropTypes.object.isRequired,
  applicationKey: PropTypes.string.isRequired,
  organizationKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  imports: PropTypes.array.isRequired,
};
export default Operation;
