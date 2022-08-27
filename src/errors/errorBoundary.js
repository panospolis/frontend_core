import React from "react";
import {StoreContext} from "../context/store";
import ErrorModal from "../components/ui/modals/errorModal";

export default class ErrorBoundary extends React.Component {
    static contextType = StoreContext;


    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidMount() {
        const {Logger, UIStore} = this.context.rootStore;
        window.onerror = (msg, url, line) => {
            Logger.error({"message": `Caught[via window.onerror]: ${msg} from: ${url} line: ${line}`, "stack": ""});
            UIStore.sModal(<ErrorModal message={gettext('Something went wrong')}></ErrorModal>)
            return true;
        };

        window.onunhandledrejection = (PromiseRejectionEvent) => {
            Logger.error({
                "message": `Caught[via window.onunhandledrejection promise]:${PromiseRejectionEvent.reason.stack}`,
                "stack": ""
            });
            return true;
        };

        window.addEventListener("unhandledrejection", (promiseRejectionEvent) => {
            promiseRejectionEvent.preventDefault();
        });

        window.addEventListener('error', (evt) => {
            evt.preventDefault();
        });
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        const {Logger} = this.context.rootStore;
        Logger.error({'message': error.message, 'stack': error.stack});
    }

    render() {
        if (this.state.hasError) {
            return <div className="container-fluid">
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col"}>{gettext('Something went wrong')}</div>
                    </div>
                </div>
            </div>
        }

        return this.props.children;
    }

}