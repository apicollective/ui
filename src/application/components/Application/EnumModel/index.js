import React, { PropTypes } from 'react';

import H1 from '../../../../components/H1';
import H2 from '../../../../components/H2';
import ParameterList from '../../ParameterList';
import ReactMarkdown from 'react-markdown';

import styles from './enumModel.css';

const EnumModel = ({ enumName, spec }) => {
  const enumModel = spec.enums.find(m => m.name === enumName);
  enumModel.values = enumModel.values.map((value) => (
    { name: value.name, description: value.description, type: 'string', required: false }
  ));
  return (
    <div>
      <H1>{enumModel.name}</H1>
      {enumModel.description ? <ReactMarkdown source={enumModel.description} className={styles.description} /> : null}
      <H2>Values</H2>
      {enumModel.values.map((value, id) => (
        <ParameterList key={id} {...value} />
      ))}
    </div>
  );
};
EnumModel.propTypes = {
  enumName: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
};

export default EnumModel;
