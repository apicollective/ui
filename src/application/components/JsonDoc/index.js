import React, { PropTypes } from 'react';
import _ from 'lodash/fp';

import styles from './jsonDoc.css';

const data = {
  Person: {
    description: 'A person that buys stuff',
    example: 'abcd',
    default: '123',
    type: 'object',
    fields: [
      {
        name: 'id',
        description: 'Person ID',
        required: true,
        default: undefined,
        example: 'abcd',
        type: 'string',
      },
      {
        name: 'firstName',
        description: 'A person First Name',
        required: true,
        default: undefined,
        example: 'Kal',
        type: 'string',
      },
      {
        name: 'lastName',
        description: 'A person Last Name',
        required: true,
        default: undefined,
        example: 'Smith',
        type: 'string',
      },
      {
        name: 'gender',
        description: 'The person gender',
        required: false,
        default: undefined,
        example: undefined,
        type: 'Gender',
      },
      // {
      //   name: 'tags',
      //   description: 'Tags attributed to this person',
      //   required: false,
      //   default: [],
      //   example: ['funny', 'cool'],
      //   type: '[string]'
      // }
      {
        name: 'addresses-fixme',
        description: 'Person Address',
        required: false,
        default: undefined,
        example: undefined,
        type: 'Address', // fixme [Address]
      },
    ]
  },
  Gender: {
    description: undefined,
    example: 'male',
    default: '123',
    type: 'enum',
    fields: [
      {
        name: 'male',
        description: 'Male',
        required: true,
        default: undefined,
        example: undefined,
        type: 'string',
      },
      {
        name: 'female',
        description: 'Female',
        required: true,
        default: undefined,
        example: undefined,
        type: 'string',
      },
    ]
  },
  Address: {
    description: 'Lorem ipsum dolor sit amet, has vitae liberavisse no, brute vituperata ne his, ne sapientem quaerendum nam. An everti ponderum nec, ius no mentitum theophrastus. Deserunt adversarium ut sit, viris vivendum pri et. Vim at viris disputationi. Vivendum abhorreant cum cu, petentium expetendis efficiantur qui in, evertitur voluptatum sit et. Vim cu dicunt imperdiet. Cu duo nullam reformidans, an enim sint antiopam mea',
    example: undefined,
    default: undefined,
    required: undefined,
    type: 'object',
    fields: [
      {
        name: 'street',
        description: 'Street Address',
        required: true,
        default: undefined,
        example: '123 Abc St',
        type: 'string',
      },
      {
        name: 'State',
        description: 'State',
        required: true,
        default: undefined,
        example: 'CA',
        type: 'string',
      },
    ]
  },
};

const numSpaces = 4;

const Line = ({id, indent, name, value}) => {
  const spaces = Array(parseInt(indent) * numSpaces).join(' ');
  return (
    <a href={'#'+id} className={styles.link}>
      <span className={styles.name}>{spaces}"{name}"</span>: <span className={styles.value}>"{value}"</span>,{`\n`}
    </a>
  );
};

const ObjectLine = ({id, indent, name}) => {
  const spaces = Array(parseInt(indent) * numSpaces).join(' ');
  return (
    <a href={'#'+id} className={styles.link}>
      <span className={styles.name}>{spaces}"{name}"</span>: {`{\n`}
    </a>
  );
};

function renderObject(obj, indent = 0, path = '', objectName = '', objectType = '') {
  const spaces = Array(parseInt(indent) * numSpaces).join(' ');

  const header = (objectName === '') ?
          spaces + `{\n` :
          <ObjectLine id={objectType} name={objectName} indent={indent} />;

  return(
      <div>
      {header}
      {obj.fields.map((field, id) => {
        const value = field.example
        if (field.type == 'string') {
          return <Line key={id} id={path + field.name} name={field.name} indent={indent + 1} value={value}/>
        } else {
          return renderObject(data[field.type], indent + 1, field.type + '.', field.name, field.type);
        }
      })}
      {spaces + `}`}
    </div>
  );
}


// TODO
// Support for markdown descriptions
const JsonDoc = ({dataFIXME, rootElement}) => {
  return (
      <div className={styles.jsonDoc}>
      <pre>
      {renderObject(data.Person)}
      </pre>
      </div>
  );
}

export default JsonDoc;
