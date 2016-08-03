import React, { Component, PropTypes } from 'react';

import Documenation from './Documentation';
import ModelDescription from './ModelDescription';
import Element from './Element';

import * as utils from '../../../utils';

import styles from './json-doc.css';

class JsonDoc extends Component {

  constructor(props) {
    super(props);
    this.state = { documentationFullType: '' };

    this.mouseOver = (event) => {
      const documentationFullType = event.currentTarget.dataset.fieldkey;
      this.setState({ documentationFullType });
      // Stop parent nav events to be publishes - jsondoc nesting
      if (event.stopPropagation) event.stopPropagation();
    };
  }

  getModelJson(baseModel, spec, imports, mouseOver) {
    if (utils.isImportOrInSpec(baseModel, spec, imports)) {
      return (
        <Element
          type={baseModel}
          fieldKey="__"
          indent={0}
          mouseOver={this.mouseOver}
          spec={spec}
          imports={imports}
        />
      );
    } else {
      return null;
    }
  }

  getJson(baseModel, spec, imports, modelFieldJson) {
    if (modelFieldJson) {
      return (
        <pre className={styles.code}>
          {modelFieldJson}
        </pre>
      );
    } else {
      return null;
    }
  }

  render() {
    const { baseModel, spec, imports, includeModel } = this.props;

    return (
      <div className={styles.jsonDoc}>
        {includeModel ? <ModelDescription
          baseModel={baseModel}
          spec={spec}
          imports={imports}
          modelNameClick={this.props.modelNameClick}
        /> : null}
        <div className={styles.container}>
          {this.getJson(baseModel, spec, imports,
                        this.props.rawValue ?
                        this.props.rawValue :
                        this.getModelJson(baseModel, spec, imports, this.mouseOver))}
          <Documenation
            documentationFullType={this.state.documentationFullType}
            spec={spec}
            imports={imports}
          />
        </div>
      </div>
    );
  }
}
JsonDoc.propTypes = {
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  baseModel: PropTypes.string.isRequired,
  includeModel: PropTypes.bool, // Include Model Documentation in JsonDoc
  excludeModelDescription: PropTypes.bool,
  modelNameClick: PropTypes.func,
  rawValue: PropTypes.string,
};

export default JsonDoc;
