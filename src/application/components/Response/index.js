import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import { onClickHref, buildNavHref, getType } from '../../../utils';

import H2 from '../../../components/H2';
import JsonDoc from '../../components/JsonDoc';

import styles from './response.css';

const Response = ({ operation, spec, imports, orgKey, appKey }) => {
  const body = (response) => {
    if (response.type) {
      const baseModel = response.type;
      return (
        <div>
          <h3>Body</h3>
          <JsonDoc
            modelNameClick={
              onClickHref(buildNavHref({
                organization: orgKey, application: appKey, model: getType(baseModel),
              }))
            }
            baseModel={baseModel}
            spec={spec}
            imports={imports}
            includeModel={true}
            excludeModelDescription={true}
          />
        </div>
      );
    } else return null;
  };

  return (
    <div className={styles.response}>
      <H2>Response</H2>
      {operation.responses.map((response, id) => (
        <div key={id}>
          <div>{response.code.integer.value}</div>
          <ReactMarkdown source={response.description ? response.description : ''} className={styles.description} />
          {body(response)}
        </div>
      ))}
    </div>
  );
};

Response.propTypes = {
  operation: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  orgKey: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
};

export default Response;

export {
  styles,
};
