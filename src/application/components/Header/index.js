import React, { PropTypes } from 'react';

import { cleanPath } from '../../../utils';

import JsonDoc from '../../components/JsonDoc';
import ParameterListGroup from '../../components/ParameterListGroup';

import styles from './header.css';

const Header = ({ operation, service, imports, orgKey, appKey }) => {
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

Header.propTypes = {
  operation: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  orgKey: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
};

export default Header;

export {
  styles,
};
