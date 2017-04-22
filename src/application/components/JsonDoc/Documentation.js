// @flow
import React, { Component } from 'react';
import classnames from 'classnames';

import ParameterList from '../ParameterList';
import * as utils from '../../../utils';

import styles from './json-doc.css';
import type { Service } from '../../../generated/version/ServiceType';

const defaultView =
  (<div className={styles.documentation}>
    <span className={styles.defaultView}>&lt;-- Hover over JSON example for documentation</span>
  </div>);

type Props = {
  documentationFullType: string,
  service: Service,
  importedServices: Service[],
};

class Documentation extends Component {
  props: Props;
  state: {
    height: number,
  };
  constructor(props: props) {
    super(props);
    this.state = { height: 0 };
    this.updateContainerHeight = this.updateContainerHeight.bind(this);
  }

  componentDidUpdate() {
    this.updateContainerHeight();
  }

  updateContainerHeight() {
    const container = this.container;
    if (container) {
      const height = container.clientHeight;
      if (height > this.state.height) {
        this.setState({ height });
      }
    }
  }

  render() {
    const { documentationFullType, service, importedServices } = this.props;
    const { height } = this.state;
    if (!documentationFullType) return defaultView;

    const modelName = documentationFullType.substring(0, documentationFullType.lastIndexOf('.'));
    const fieldName = documentationFullType.substring(documentationFullType.lastIndexOf('.') + 1);
    const model = utils.getModel(modelName, service, importedServices);
    const field = model ? model.fields.find(f => f.name === fieldName) : null;

    return (
      <div
        ref={(el) => { this.container = el; }}
        className={classnames(styles.documentation)}
        style={{ minHeight: `${height}px` }}
      >
        <ParameterList {...field} service={service} importedServices={importedServices} parentModel={modelName} />
      </div>
    );
  }
}

export default Documentation;
