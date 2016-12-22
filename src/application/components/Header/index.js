// @flow
import React from 'react';

import { cleanPath } from '../../../utils';
import ParameterListGroup from '../../components/ParameterListGroup';

import type { Operation, Service, Import } from '../../../generated/version/ServiceType';

import styles from './header.css';

const Header = ({ operation, service, imports, orgKey, appKey }: {
  operation: Operation,
  service: Service,
  imports: Import[],
  orgKey: string,
  appKey: string,
}) => {
  return (
    <div className={styles.container}>
      <ParameterListGroup
        parameters={service.headers}
        title="Headers"
        service={service}
        imports={imports}
        parentModel={cleanPath(operation.path)}
      />
    </div>
  );
};

export default Header;

export {
  styles,
};
