import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as docActions } from '../../../generated/documentation/getByRootUrlAndMarkdownPath';

import H1 from './../../../components/H1';
import LoadingOverlay from '../../../components/LoadingOverlay';
import Markdown from '../../../components/Markdown';

import styles from './documentation.css';
import docs from '../../../../documents.json';

const allActions = Object.assign({}, docActions);

class Documentation extends Component {

  componentDidMount() {
    const document =
      docs.organizations[this.props.params.organizationKey].documents
          .filter((doc) => doc.name === this.props.params.documentationKey);
    this.props.actions.getByRootUrlAndMarkdownPath_get(
      { rootUrl: document.rootUrl, markdownPath: document.markdownPath }
    );
  }

  render() {
    if (!this.props.loaded) {
      return (
        <LoadingOverlay />
      );
    } else {
      return (
        <div className={styles.content}>
          <div className={styles.header}>
            <H1 className={styles.h1}>Organizations</H1>
          </div>
          <div className={styles.container}>
            <Markdown source={this.props.markdown} className={styles.markdown} />
          </div>
        </div>
      );
    }
  }
}

Documentation.propTypes = {
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  markdown: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => (
  {
    markdown: state.app.get('markdown'),
    loaded: state.app.get('loaded'),
  }
);

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(allActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Documentation);

export {
  styles,
};
