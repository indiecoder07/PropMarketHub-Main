'use client';

import PropTypes from 'prop-types';
import React from 'react';
import styles from './FeatureErrorBoundary.module.css';

export class FeatureErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { error };
  }

  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, info) {
    // Surface diagnostics for debugging in development and monitoring hooks.
    console.error('FeatureErrorBoundary captured an error', { error, info });
  }

  render() {
    const { error } = this.state;
    const { className, children, fallbackTitle, fallbackMessage } = this.props;

    if (error) {
      return (
        <div className={[styles.wrapper, className].filter(Boolean).join(' ')} role="alert" aria-live="assertive">
          <h2 className={styles.title}>{fallbackTitle}</h2>
          <p className={styles.message}>{fallbackMessage}</p>
        </div>
      );
    }

    return children;
  }
}

FeatureErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fallbackTitle: PropTypes.string,
  fallbackMessage: PropTypes.string,
};

FeatureErrorBoundary.defaultProps = {
  className: '',
  fallbackTitle: 'Something went wrong while loading this calculator.',
  fallbackMessage: 'Please refresh the page and try again. If the problem continues, contact support.',
};
