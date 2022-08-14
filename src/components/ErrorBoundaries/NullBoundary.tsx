import React, { ErrorInfo, ReactNode } from "react";

export class NullBoundary extends React.Component<{
  readonly children: ReactNode;
}> {
  public state: { error: Error | undefined } = { error: undefined };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return null;
    }

    return this.props.children;
  }
}
