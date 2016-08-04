import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Markdown from '../../../components/Markdown';

import { buildNavHref, getType, isImport, isImportOrInService, onClickHref, simplifyName } from '../../../utils';

import styles from './parameter-list.css';

const ParameterList = ({ name, type, required, description, example, defaultValue, service, imports, parentModel }) => {
  const possibleImportType = `${parentModel.substring(0, parentModel.lastIndexOf('.'))}.${type}`;
  const modelType = isImport(possibleImportType, imports) ? possibleImportType : type;
  const typeClickFn = isImportOrInService(getType(modelType), service, imports) ?
                      onClickHref(buildNavHref(
                        { organization: service.organization.key,
                          application: service.application.key, model: getType(modelType) }
                      )) : null;

  return (<div className={styles.container}>
    <div className={styles.meta}>
      <a name={`${getType(parentModel)}.${name}`} className={styles.name}>{name}</a>
      <p onClick={typeClickFn} className={classnames(styles.type, typeClickFn ? styles.pointer : null)}>
        {simplifyName(modelType)}
      </p>
      {required ? <p className={styles.required}>required</p> : null}
    </div>
    <div className={styles.info}>
      {description
        ? <Markdown source={description} className={styles.description} />
        : <p className={styles.noContent}>No description</p>
      }
      {example
        ? <p className={styles.sample}><span className={styles.sampleTitle}>Example</span>{example}</p>
        : null
      }
      {defaultValue
        ? <p className={styles.sample}><span className={styles.sampleTitle}>Default</span>{defaultValue}</p>
        : null
      }
    </div>
  </div>);
};

ParameterList.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  parentModel: PropTypes.string.isRequired,
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  description: PropTypes.string,
  example: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default ParameterList;
