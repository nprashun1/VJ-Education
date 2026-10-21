import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled render error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div className="error-boundary-card" role="alert">
            <div className="error-icon-container" aria-hidden="true">
              ⚠️
            </div>

            <span className="error-tag">System Alert • Unexpected Error</span>

            <h1 className="error-title">Something went wrong</h1>
            <p className="error-desc">
              We encountered an unexpected issue while rendering this page. You can reload the page or navigate safely back to the home portal.
            </p>

            <div className="error-actions">
              <button 
                type="button" 
                onClick={this.handleReload} 
                className="btn-reload"
              >
                <span>🔄</span>
                <span>Reload Page</span>
              </button>
              <button 
                type="button" 
                onClick={this.handleGoHome} 
                className="btn-home"
              >
                <span>🏠</span>
                <span>Back to Homepage</span>
              </button>
            </div>

            <div className="error-details-box">
              <button 
                type="button" 
                onClick={this.toggleDetails} 
                className="error-toggle-btn"
              >
                <span>{this.state.showDetails ? '▼ Hide technical details' : '▶ Show technical details'}</span>
              </button>

              {this.state.showDetails && (
                <div className="error-code-block">
                  <strong>Error:</strong> {this.state.error?.toString() || 'Unknown error'}
                  {this.state.errorInfo?.componentStack && (
                    <>
                      <br /><br />
                      <strong>Component Stack:</strong>
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
