// @flow
import React from 'react';

import H2 from 'components/H2';
import ParameterList from 'application/components/ParameterList';

import type { Service } from 'generated/version/ServiceType';

import styles from 'application/components/parameter-list-group.css';

const ParameterListGroup = ({
  title,
  parameters,
  service,
  importedServices,
  parentModel,
}: {
  title: string,
  parameters: any[], // FIXME PropTypes.array.isRequired,
  service: Service,
  importedServices: Service[],
  parentModel: string,
}) => (
  <div>
    <H2 className={styles.title}>{title}</H2>
    <div className={styles.container}>
      {parameters.length > 0
        ? parameters.map((parameter, id) => (
            <ParameterList
              key={parameter.name}
              {...parameter}
              service={service}
              importedServices={importedServices}
              parentModel={parentModel}
            />
          ))
        : <p className={styles.noContent}>No parameters</p>}
    </div>
  </div>
);

export default ParameterListGroup;
