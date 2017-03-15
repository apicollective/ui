// @flow
import React, { Component } from 'react';

import Documenation from './Documentation';
import ModelDescription from './ModelDescription';
import Element from './Element';

import * as utils from '../../../utils';
import type { Service } from '../../../generated/version/ServiceType';

import styles from './json-doc.css';

type Props = {
  service: Service,
  importedServices: Service[],
  baseModel: string,
  includeModel?: boolean, // Include Model Documentation in JsonDoc
  modelNameClick: (event: Event) => void,
  rawValue?: string,
};

class JsonDoc extends Component {
  props: Props;
  state: {
    documentationFullType: string,
  };

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

  static getJson(baseModel: string, service: Service, importedServices: Service[], modelFieldJson: any) {
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

  mouseOver: (event: Object) => void;

  getModelJson(
    baseModel: string,
    service: Service,
    importedServices: Service[],
    mouseOver: (event: Object)=> void,
  ) {
    if (utils.isImportOrInService(baseModel, service, importedServices)) {
      return (
        <Element
          type={baseModel}
          fieldKey="__"
          indent={0}
          mouseOver={this.mouseOver}
          service={service}
          importedServices={importedServices}
          isLast={true}
        />
      );
    } else {
      return null;
    }
  }


  render() {
    const { baseModel, service, importedServices, includeModel } = this.props;

    return (
      <div className={styles.jsonDoc}>
        {includeModel ? <ModelDescription
          baseModel={baseModel}
          service={service}
          importedServices={importedServices}
          modelNameClick={this.props.modelNameClick}
        /> : null}
        <div className={styles.container}>
          {JsonDoc.getJson(baseModel, service, importedServices,
                        this.props.rawValue ?
                        this.props.rawValue :
                        this.getModelJson(baseModel, service, importedServices, this.mouseOver))}
          <Documenation
            documentationFullType={this.state.documentationFullType}
            service={service}
            importedServices={importedServices}
          />
        </div>
      </div>
    );
  }
}

export default JsonDoc;
