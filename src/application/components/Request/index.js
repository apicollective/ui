import React, { PropTypes } from 'react';

import { onClickHref, buildNavHref, getType, simplifyName, cleanPath } from '../../../utils';

import JsonDoc from '../../components/JsonDoc';
import ParameterListGroup from '../../components/ParameterListGroup';

import styles from './request.css';

const Request = ({ operation, spec, imports, orgKey, appKey }) => {
  const body = () => {
    if (operation.body) {
      const baseModel = operation.body.type;
      return (
        <div className={styles.json}>
          {/* <H2
          click={onClickHref(buildNavHref({
          organization: orgKey, application: appKey, model: getType(baseModel),
          }))}
          className={styles.name}
          >
          {simplifyName(baseModel)}
          </H2> */}
          <JsonDoc key={`${operation.body}-requestbody`} baseModel={baseModel} spec={spec} imports={imports} />
        </div>
      );
    } else return null;
  };

  return (
    <div className={styles.container}>
      <ParameterListGroup
        parameters={operation.parameters}
        title="Request"
        spec={spec}
        imports={imports}
        parentModel={cleanPath(operation.path)}
      />
      {body()}
    </div>
  );
};
Request.propTypes = {
  operation: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  orgKey: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
};

export default Request;

export {
  styles,
};
