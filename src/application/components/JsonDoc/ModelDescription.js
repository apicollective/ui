// @flow
import React from 'react';

import H2 from 'components/H2';
import Markdown from 'components/Markdown';

import type { Service } from 'generated/version/ServiceType';

import * as utils from 'utils';
import styles from 'application/components/JsonDoc/json-doc.css';

const ModelDescription = ({
  baseModel,
  service,
  importedServices,
  toHref,
}: {
  baseModel: string,
  service: Service,
  importedServices: Service[],
  toHref?: string,
}) => {
  const type = utils.getType(baseModel);
  const model = utils.getModel(type, service, importedServices);

  return (
    <div className={styles.modelDescription}>
      <H2 className={styles.modelName} toHref={toHref}>
        {utils.simplifyName(baseModel)}
      </H2>
      {model && model.description
        ? <Markdown
            source={model.description ? model.description : ''}
            className={styles.description}
          />
        : null}
    </div>
  );
};

export default ModelDescription;
