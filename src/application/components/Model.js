// @flow
import React from 'react';

import H1 from 'components/H1';
import Markdown from 'components/Markdown';
import JsonDoc from 'application/components/JsonDoc/JsonDoc';
import ParameterListGroup from 'application/components/ParameterListGroup';

import { simplifyName } from 'utils';

import type {
  Service,
  Model as ModelType,
} from 'generated/version/ServiceType';

import styles from 'application/components/model.css';

const Model = ({
  model,
  service,
  importedServices,
  showJsonDoc,
}: {
  model: ModelType,
  service: Service,
  importedServices: Service[],
  showJsonDoc: boolean,
}) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <H1 className={styles.title}>{simplifyName(model.name)}</H1>
      <Markdown
        source={model.description ? model.description : ''}
        className={styles.description}
      />
    </div>
    <div className={styles.fieldsContainer}>
      <ParameterListGroup
        parameters={model.fields}
        title="Fields"
        service={service}
        importedServices={importedServices}
        parentModel={model.name}
      />
      <div className={styles.json}>
        {showJsonDoc
          ? <JsonDoc
              baseModel={model.name}
              service={service}
              importedServices={importedServices}
              includeModel={false}
            />
          : null}
      </div>
    </div>
  </div>
);

export default Model;
