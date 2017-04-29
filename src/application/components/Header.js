// @flow
import React from 'react';

import * as utils from '../../utils';
import ParameterListGroup from '../components/ParameterListGroup';

import type { Operation, Service } from '../../generated/version/ServiceType';

import styles from './header.css';

const Header = ({
  operation,
  service,
  importedServices,
  orgKey,
  appKey,
}: {
  operation: Operation,
  service: Service,
  importedServices: Service[],
  orgKey: string,
  appKey: string,
}) => {
  if (service.headers && service.headers.length) {
    return (
      <div className={styles.container}>
        <ParameterListGroup
          parameters={service.headers}
          title="Headers"
          service={service}
          importedServices={importedServices}
          parentModel={utils.cleanPath(operation.path)}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Header;

export { styles };
