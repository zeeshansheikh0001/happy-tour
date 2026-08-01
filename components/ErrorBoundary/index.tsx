import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false
        };
    }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // eslint-disable-next-line no-console
    console.error({ error, errorInfo })
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
          <div>Error Page</div>
      )
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children
  }
}

export default ErrorBoundary;
