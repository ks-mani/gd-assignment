import React from "react";
import WidgetContainer from "../WidgetContainer";

class MainErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <WidgetContainer>
          <h2>Something went wrong!</h2>
          <p>{this.state.error?.message}</p>
          <button
            onClick={this.resetError}
            style={{
              padding: "10px 30px",
              border: "3px solid var(--primary-color)",
              borderRadius: "20px",
              background: "none",
              color: "var(--primary-color)",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </WidgetContainer>
      );
    }
    return this.props.children;
  }
}

export default MainErrorBoundary;
