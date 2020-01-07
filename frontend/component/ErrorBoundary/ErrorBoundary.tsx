import React, { PureComponent } from 'react';

interface IErrorBoundaryProps {
}
interface IErrorBoundaryState {
    hasError: boolean,
    errorInfo: any
}
export class ErrorBoundary extends PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: error,
            errorInfo,
        });
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }


    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{ width: 800, margin: '0 auto' }}>
                    <h1>问题已自动提交服务器，我们将尽快解决！</h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.hasError && this.state.hasError.toString()}
                        <br />
                        {this.state.errorInfo}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}
