import React, { Component, PropTypes } from 'react';
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
      {
        name: 'tags',
        description: 'Tags attributed to this person',
        required: false,
        default: [],
        example: ['funny', 'cool'],
        type: '[string]',
      },
      {
        name: 'addresses',
        description: 'Person Address',
        required: false,
        default: undefined,
        example: undefined,
        type: '[Address]', // fixme [Address]
        // type: 'Address', // fixme [Address]
      },
    ],
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
      },
      {
        name: 'female',
        description: 'Female',
      },
    ],
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
    ],
  },
};

const numSpaces = 4;

const spaces = (indent) => Array(parseInt(indent) * numSpaces).join(' ');

function getType(type) {
  const ex = /[\[]?([^\]]+)/i;
  return type.match(ex)[1];
}

function isModel(type, spec) {
  return spec.hasOwnProperty(getType(type));
}

function isEnum(type, spec) {
  return isModel(type, spec) ?
    spec[getType(type)].type === 'enum' :
    false;
}

function isArray(type) {
  return type.startsWith('[');
}

// --    "name": "value",
const FieldValue = ({ name, value, fullType, indent, mouseOver }) => {
  return (
      <a href={'#' + fullType} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver}>
      <span className={styles.name}>{spaces(indent)}"{name}"</span>: <span className={styles.value}>"{value}"</span>,{`\n`}
    </a>
  );
};

// --    "name":
const FieldEmpty = ({ name, fullType, indent, mouseOver }) => {
  return (
      <a href={'#' + fullType} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver}>
      <span className={styles.name}>{spaces(indent)}"{name}"</span>:
    </a>
  );
};

// --   "value",
const StringValue = ({ value, fullType, indent, mouseOver }) => {
  return (
      <a href={'#' + fullType} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver}>
      <span className={styles.name}>{spaces(indent)}"{value}"</span>{`\n`}
    </a>
  );
};

const ArrayValue = ({ name, fullType, spec, indent, mouseOver }) => {
  return (
    <div>
      <FieldEmpty name={name} fullType={fullType} indent={indent} mouseOver={mouseOver} /> {'[\n'}
      <StringValue value={name} fullType={fullType} indent={indent + 1} mouseOver={mouseOver} />
      {spaces(indent) + '],'}
    </div>
  );
};

const ModelInner = ({ name, type, fullType, spec, indent, mouseOver }) => {
  if (isEnum(type, spec)) {
    const enumModel = spec[getType(type)];
    return (
      <div>
        <StringValue value={enumModel.fields[0].name} fullType={fullType} indent={indent + 1} mouseOver={mouseOver} />
      </div>
    );
  } else {
    return (
      <div>
        {spec[getType(type)].fields.map((field, id) => {
          const value = field.example;
          if (isModel(field.type, spec)) {
            return renderModel(field.name, field.type, type + '.' + field.name, spec, indent + 1, mouseOver);
          } else if (isArray(field.type)) {
            return (<ArrayValue
              key={id}
              name={field.name}
              value={value}
              fullType={type + '.' + field.name}
              indent={indent + 1}
              mouseOver={mouseOver}
            />);
          } else {
            return (<FieldValue
              key={id}
              name={field.name}
              value={value}
              fullType={type + '.' + field.name}
              indent={indent + 1}
              mouseOver={mouseOver}
            />);
          }
        })}
      </div>
    );
  }
};

const Model = ({ name, type, fullType, spec, indent, mouseOver, open, close }) => {
  return (
    <div>
      <FieldEmpty name={name} fullType={fullType} indent={indent} mouseOver={mouseOver} /> {open}
      <ModelInner type={getType(type)} fullType={fullType} spec={spec} indent={indent} mouseOver={mouseOver} />
      {spaces(indent) + close + ','}
    </div>
  );
};

const renderModel = (name, type, fullType, spec, indent, mouseOver) => {
  let open = '{';
  let close = '}';
  if (isArray(type)) {
    open = '[{';
    close = '}]';
  } else if (isEnum(type, spec)) {
    open = '[';
    close = ']';
  }
  return (<Model
    name={name}
    type={type}
    fullType={fullType}
    spec={spec}
    indent={indent}
    mouseOver={mouseOver}
    open={open}
    close={close}
  />);
};

const Documentation = ({ fullType, spec }) => {
  const [modelName, fieldName] = fullType.split('.');
  const model = spec[modelName];
  const field = _.find({ name: fieldName }, model.fields);

  return (
    <div className={styles.documentation}>
      <h2>{modelName}</h2>
      <p>{model.description}</p>
      <h3>{field.name}</h3>
      {field.description ? <p>Description: {field.description}</p> : ''}
      <p>Type: {field.type}</p>
      <p><i>{field.required ? 'Required' : 'Optional'}</i></p>
      {field.example ? <p>Example: {field.example}</p> : ''}
      {field.default ? <p>Default: {field.default}</p> : ''}
    </div>
  );
};

// TODO
// Support for markdown descriptions
class JsonDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentationFullType: 'Person.' + data.Person.fields[0].name,
    };

    this.mouseOver = (event) => {
      const documentationFullType = event.currentTarget.dataset.fulltype;
      this.setState({ documentationFullType });
    };
  }

  render() {
    const documentation = this.state.documentation;
    return (
      <div className={styles.jsonDoc}>
        <pre className={styles.code}>
        {'{'}
        <ModelInner type="Person" spec={data} indent={0} mouseOver={this.mouseOver} />
        {'}'}
        </pre>
        <Documentation fullType={this.state.documentationFullType} spec={data} />
      </div>
    );
  }
}

export default JsonDoc;
