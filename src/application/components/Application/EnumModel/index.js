import React, { PropTypes } from 'react';

import H1 from '../../../../components/H1';
import H2 from '../../../../components/H2';
import ParameterList from '../../ParameterList';
import ReactMarkdown from 'react-markdown';
import { getEnum, simplifyName } from '../../../../utils';

import styles from './enumModel.css';

const EnumModel = ({ enumName, spec, imports }) => {
  const enumModel = getEnum(enumName, spec, imports);
  enumModel.values = enumModel.values.map((value) => (
    { name: value.name, description: value.description, type: 'string', required: false }
  ));
  return (
    <div>
      <H1>{simplifyName(enumModel.name)}</H1>
      <ReactMarkdown source={enumModel.description ? enumModel.description : ''} className={styles.description} />
      <H2>Values</H2>
      {enumModel.values.map((value, id) => (
        <ParameterList key={id} {...value} spec={spec} imports={imports} parentModel={enumModel.name} />
      ))}
    </div>
  );
};
EnumModel.propTypes = {
  enumName: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

export default EnumModel;
