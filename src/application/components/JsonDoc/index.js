import React, { Component, PropTypes } from 'react';

import styles from './jsonDoc.css';

// const data = [
//   {
//     name: 'Person',
//     description: 'A person that buys stuff',
//     example: 'abcd',
//     default: '123',
//     type: 'object',
//     fields: [
//       {
//         name: 'id',
//         description: 'Person ID',
//         required: true,
//         default: undefined,
//         example: 'abcd',
//         type: 'string',
//       },
//       {
//         name: 'firstName',
//         description: 'A person First Name',
//         required: true,
//         default: undefined,
//         example: 'Kal',
//         type: 'string',
//       },
//       {
//         name: 'lastName',
//         description: 'A person Last Name',
//         required: true,
//         default: undefined,
//         example: 'Smith',
//         type: 'string',
//       },
//       {
//         name: 'gender',
//         description: 'The person gender',
//         required: false,
//         default: undefined,
//         example: undefined,
//         type: 'Gender',
//       },
//       {
//         name: 'tags',
//         description: 'Tags attributed to this person',
//         required: false,
//         default: [],
//         example: ['funny', 'cool'],
//         type: '[string]',
//       },
//       {
//         name: 'addresses',
//         description: 'Person Address',
//         required: false,
//         default: undefined,
//         example: undefined,
//         type: '[Address]', // fixme [Address]
//         // type: 'Address', // fixme [Address]
//       },
//     ],
//   },
//   {
//     name: 'Gender',
//     description: undefined,
//     example: 'male',
//     default: '123',
//     type: 'enum',
//     fields: [
//       {
//         name: 'male',
//         description: 'Male',
//       },
//       {
//         name: 'female',
//         description: 'Female',
//       },
//     ],
//   },
//   {
//     name: 'Address',
//     description: 'Lorem ipsum dolor sit amet, has vitae liberavisse no, brute vituperata ne his, ne sapientem quaerendum nam. An everti ponderum nec, ius no mentitum theophrastus. Deserunt adversarium ut sit, viris vivendum pri et. Vim at viris disputationi. Vivendum abhorreant cum cu, petentium expetendis efficiantur qui in, evertitur voluptatum sit et. Vim cu dicunt imperdiet. Cu duo nullam reformidans, an enim sint antiopam mea',
//     example: undefined,
//     default: undefined,
//     required: undefined,
//     type: 'object',
//     fields: [
//       {
//         name: 'street',
//         description: 'Street Address',
//         required: true,
//         default: undefined,
//         example: '123 Abc St',
//         type: 'string',
//       },
//       {
//         name: 'State',
//         description: 'State',
//         required: true,
//         default: undefined,
//         example: 'CA',
//         type: 'string',
//       },
//     ],
//   },
// ];

const numSpaces = 4;

const spaces = (indent) => Array(indent * numSpaces).join(' ');

const getType = (type) => {
  const ex = /[\[]?([^\]]+)/i;
  return type.match(ex)[1];
};

const getModel = (name, spec) => spec.models.find(m => m.name === getType(name));
const isModel = (type, spec) => Boolean(getModel(type, spec));

const getEnum = (type, spec) => spec.enums.find(e => e.name === type);
const isEnum = (type, spec) => Boolean(getEnum(type, spec));

const isArray = (type) => type.startsWith('[');


// --    "name": "value",
const FieldValue = ({ name, value, fullType, indent, mouseOver }) => (
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver}>
    <span className={styles.name}>{spaces(indent)}"{name}"</span>: <span className={styles.value}>"{value}"</span>,{`\n`}
  </a>
);
FieldValue.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

// --    "name":
const FieldEmpty = ({ name, fullType, indent, mouseOver }) => (
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver}>
    <span className={styles.name}>{spaces(indent)}"{name}"</span>:
  </a>
);
FieldEmpty.propTypes = {
  name: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

// --   "value",
const StringValue = ({ value, fullType, indent, mouseOver }) => (
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver}>
    <span className={styles.name}>{spaces(indent)}"{value}"</span>{`\n`}
  </a>
);
StringValue.propTypes = {
  value: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

const ArrayValue = ({ name, fullType, indent, mouseOver }) => (
  <div>
    <FieldEmpty name={name} fullType={fullType} indent={indent} mouseOver={mouseOver} /> {'[\n'}
    <StringValue value={name} fullType={fullType} indent={indent + 1} mouseOver={mouseOver} />
    {`${spaces(indent)}],`}
  </div>
);
ArrayValue.propTypes = {
  name: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

const renderModel = (key, name, type, fullType, spec, indent, mouseOver) => {
  let open = '{';
  let close = '}';
  if (isArray(type)) {
    open = '[{';
    close = '}]';
  } else if (isEnum(type, spec)) {
    open = '[';
    close = ']';
  }
  return (
    <Model
      key={key}
      name={name}
      type={type}
      fullType={fullType}
      spec={spec}
      indent={indent}
      mouseOver={mouseOver}
      open={open}
      close={close}
    />
  );
};

const ModelInner = ({ type, fullType, spec, indent, mouseOver }) => {
  if (isEnum(type, spec)) {
    // Enum Value
    const enumModel = getEnum(type, spec);
    return (
      <StringValue value={enumModel.fields[0].name} fullType={fullType} indent={indent + 1} mouseOver={mouseOver} />
    );
  } else {
    // Model, Array, Field
    return (
      <div>
        {getModel(type, spec).fields.map((field, id) => {
          const value = field.example;
          if (isModel(field.type, spec)) {
            return renderModel(id, field.name, field.type, `${type}.${field.name}`, spec, indent + 1, mouseOver);
          } else if (isArray(field.type)) {
            return (
              <ArrayValue
                key={id}
                name={field.name}
                value={value}
                fullType={`${type}.${field.name}`}
                indent={indent + 1}
                mouseOver={mouseOver}
              />);
          } else {
            return (
              <FieldValue
                key={id}
                name={field.name}
                value={value}
                fullType={`${type}.${field.name}`}
                indent={indent + 1}
                mouseOver={mouseOver}
              />);
          }
        })}
      </div>
    );
  }
};
ModelInner.propTypes = {
  type: PropTypes.string.isRequired,
  fullType: PropTypes.string,
  spec: PropTypes.object.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

const Model = ({ name, type, fullType, spec, indent, mouseOver, open, close }) => (
  <div>
    <FieldEmpty name={name} fullType={fullType} indent={indent} mouseOver={mouseOver} /> {open}
    <ModelInner type={getType(type)} fullType={fullType} spec={spec} indent={indent} mouseOver={mouseOver} />
    {`${spaces(indent)}${close},`}
  </div>
);
Model.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  open: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
};


const Documentation = ({ fullType, spec }) => {
  if (fullType) {
    const [modelName, fieldName] = fullType.split('.');
    const model = getModel(modelName, spec);
    const field = model.fields.find(f => f.name === fieldName);

    return (
      <div className={styles.documentation}>
        <h2 className={styles.modelName}>{modelName}</h2>
        <p className={styles.modelDescription}>{model.description}</p>
        <div className={styles.fieldContainer}>
          <div className={styles.fieldLeft}>
            <h3>{field.name}</h3>
            <p>Type: {field.type}</p>
            <p><i>{field.required ? 'Required' : 'Optional'}</i></p>
          </div>
          <div className={styles.fieldRight}>
            {field.description ? <p className={styles.fieldDescription}>{field.description}</p> : ''}
            {field.example ? <p className={styles.fieldExample}>Example: {field.example}</p> : ''}
            {field.default ? <p className={styles.fieldDefault}>Default: {field.default}</p> : ''}
          </div>
        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }
};
Documentation.propTypes = {
  fullType: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
};

// TODO
// Support for markdown descriptions
class JsonDoc extends Component {
  constructor(props) {
    super(props);
    this.state = { documentationFullType: '' };

    this.mouseOver = (event) => {
      const documentationFullType = event.currentTarget.dataset.fulltype;
      this.setState({ documentationFullType });
    };
  }

  render() {
    return (
      <div className={styles.jsonDoc}>
        <pre className={styles.code}>
        {'{'}
          <ModelInner type={this.props.baseModel} spec={this.props.spec} indent={0} mouseOver={this.mouseOver} />
        {'}'}
        </pre>
        <Documentation fullType={this.state.documentationFullType} spec={this.props.spec} />
      </div>
    );
  }
}
JsonDoc.propTypes = {
  spec: PropTypes.object.isRequired,
  baseModel: PropTypes.string.isRequired,
};

export default JsonDoc;
