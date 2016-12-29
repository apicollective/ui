// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { snakeCase } from 'lodash';

import { actions as docActions } from '../../../generated/documentation/getByRootUrlAndMarkdownPath';

import H1 from '../../../components/H1';
import LoadingOverlay from '../../../components/LoadingOverlay';
import Markdown from '../../../components/Markdown';

import styles from './documentation.css';
import docs from '../../../../documents.json';

const allActions = Object.assign({}, docActions);

type Props = {
  loaded: boolean,
  params: Object, // FIXME
  actions: Object, // FIXME
  markdown: string,
}

class Documentation extends Component {

  props: Props;

  componentDidMount() {
    const document =
      docs.organizations[this.props.params.organizationKey].documents
          .filter(doc => snakeCase(doc.name) === this.props.params.documentationKey)[0];
    this.props.actions.getByRootUrlAndMarkdownPath_get(
      { rootUrl: document.rootUrl, markdownPath: document.markdownPath },
    );
  }


  render() {
    if (!this.props.loaded) {
      return (
        <LoadingOverlay />
      );
    } else {
      const document =
        docs.organizations[this.props.params.organizationKey].documents
            .filter(doc => snakeCase(doc.name) === this.props.params.documentationKey)[0];
      return (
        <div className={styles.content}>
          <div className={styles.container}>
            <H1 className={styles.h1}>{document.name}</H1>
            <Markdown source={this.props.markdown} className={styles.markdown} />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    markdown: state.documentation.get('markdown'),
    loaded: state.documentation.get('loaded'),
  }
);

const mapDispatchToProps = (dispatch): {[key: string]: Function} => (
  { actions: bindActionCreators(allActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Documentation);

export {
  styles,
};
