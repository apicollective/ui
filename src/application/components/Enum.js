// @flow
import React from 'react';

import H1 from 'components/H1';
import Markdown from 'components/Markdown';
import ParameterListGroup from 'application/components/ParameterListGroup';

import { simplifyName } from 'utils';

import type { Service, Enum as EnumType } from 'generated/version/ServiceType';

import styles from 'application/components/enum.css';

const Enum = ({
  enumModel,
  service,
  importedServices,
}: {
  enumModel: EnumType,
  service: Service,
  importedServices: Service[],
}) => {
  const enumValues = enumModel.values.map(value => ({
    name: value.name,
    description: value.description,
    type: 'string',
    required: false,
  }));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <H1 className={styles.title}>{simplifyName(enumModel.name)}</H1>
        <Markdown
          source={enumModel.description ? enumModel.description : ''}
          className={styles.description}
        />
      </div>
      <div className={styles.fieldsContainer}>
        <ParameterListGroup
          parameters={enumValues}
          title="Enum Values"
          service={service}
          importedServices={importedServices}
          parentModel={enumModel.name}
        />
      </div>
    </div>
  );
};

export default Enum;
