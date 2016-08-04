// @flow
import React, { PropTypes } from 'react';

import Documenation from './Documentation';
import ModelDescription from './ModelDescription';
import Element from './Element';

import * as utils from '../../../utils';
import type { Service } from '../../../generated/version/ServiceType';

import styles from './json-doc.css';

type Props = {
  service: Service,
  imports: Array<Service>,
  baseModel: string,
  includeModel?: boolean, // Include Model Documentation in JsonDoc
  excludeModelDescription?: boolean,
  modelNameClick: () => void,
  rawValue: ?string,
};

class JsonDoc extends React.Component {
  state: {
    documentationFullType: string,
  };

  mouseOver: (event: Object) => void;

  constructor(props: Props) {
    super(props);
    this.state = { documentationFullType: '' };

    this.mouseOver = (event) => {
      const documentationFullType = event.currentTarget.dataset.fieldkey;
      this.setState({ documentationFullType });
      // Stop parent nav events to be publishes - jsondoc nesting
      if (event.stopPropagation) event.stopPropagation();
    };
  }

  getModelJson(baseModel: string, service: Service, imports: Array<Service>, mouseOver: (event: Object)=> void) {
    if (utils.isImportOrInService(baseModel, service, imports)) {
      return (
        <Element
          type={baseModel}
          fieldKey="__"
          indent={0}
          mouseOver={this.mouseOver}
          service={service}
          imports={imports}
        />
      );
    } else {
      return null;
    }
  }

  getJson(baseModel: string, service: Service, imports: Array<Service>, modelFieldJson: any) {
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
    const { baseModel, service, imports, includeModel } = this.props;

    return (
      <div className={styles.jsonDoc}>
        {includeModel ? <ModelDescription
          baseModel={baseModel}
          service={service}
          imports={imports}
          modelNameClick={this.props.modelNameClick}
        /> : null}
        <div className={styles.container}>
          {this.getJson(baseModel, service, imports,
                        this.props.rawValue ?
                        this.props.rawValue :
                        this.getModelJson(baseModel, service, imports, this.mouseOver))}
          <Documenation
            documentationFullType={this.state.documentationFullType}
            service={service}
            imports={imports}
          />
        </div>
      </div>
    );
  }
}
// Keep until using flow everywhere
JsonDoc.propTypes = {
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  baseModel: PropTypes.string.isRequired,
  includeModel: PropTypes.bool, // Include Model Documentation in JsonDoc
  excludeModelDescription: PropTypes.bool,
  modelNameClick: PropTypes.func,
  rawValue: PropTypes.string,
};

export default JsonDoc;
