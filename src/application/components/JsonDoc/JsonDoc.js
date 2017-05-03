// @flow
import React, { Component } from 'react';

import Documentation from 'application/components/JsonDoc/Documentation';
import ModelDescription from 'application/components/JsonDoc/ModelDescription';
import Element from 'application/components/JsonDoc/Element';

import * as utils from 'utils';
import type { Service } from 'generated/version/ServiceType';

import styles from 'application/components/JsonDoc/json-doc.css';

type Props = {|
  service: Service,
  importedServices: Service[],
  baseModel: string,
  includeModel?: boolean, // Include Model Documentation in JsonDoc
  toHref?: string,
  rawValue?: string,
|};

class JsonDoc extends Component {
  props: Props;
  state: {
    documentationFullType: string,
  };

  mouseOver: (event: Object) => void;

  constructor(props: Props) {
    super(props);
    this.state = { documentationFullType: '' };

    this.mouseOver = event => {
      const documentationFullType = event.currentTarget.dataset.fieldkey;
      this.setState({ documentationFullType });
      // Stop parent nav events to be publishes - jsondoc nesting
      if (event.stopPropagation) event.stopPropagation();
    };
  }

  static getJson(
    baseModel: string,
    service: Service,
    importedServices: Service[],
    modelFieldJson: any
  ) {
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

  getModelJson(
    baseModel: string,
    service: Service,
    importedServices: Service[],
    mouseOver: (event: Object) => void
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

    const jsonDoc = JsonDoc.getJson(
      baseModel,
      service,
      importedServices,
      this.props.rawValue
        ? this.props.rawValue
        : this.getModelJson(
            baseModel,
            service,
            importedServices,
            this.mouseOver
          )
    );
    return (
      <div className={styles.jsonDoc}>
        {includeModel
          ? <ModelDescription
              baseModel={baseModel}
              service={service}
              importedServices={importedServices}
              toHref={this.props.toHref}
            />
          : null}
        <div className={styles.container}>
          {jsonDoc}
          {jsonDoc &&
            <Documentation
              documentationFullType={this.state.documentationFullType}
              service={service}
              importedServices={importedServices}
            />}
        </div>
      </div>
    );
  }
}

export default JsonDoc;
