import React, {Component} from "react";
import {StoreContext} from "../../../context/store";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import {action, makeObservable, observable} from "mobx"

@observer
export default class ConfirmationModal extends Component {
    static contextType = StoreContext
    checked = false;

    constructor(props) {
        super(props);

        this.onConfirm = this.onConfirm.bind(this);
        this.onNotConfirm = this.onNotConfirm.bind(this);
        this.onCheckBoxClick = this.onCheckBoxClick.bind(this);

        makeObservable(this, {
            checked: observable
        })
    }

    @action
    onCheckBoxClick(e) {
        this.checked = !this.checked;
    }

    onNotConfirm() {
        const {UIStore} = this.context.rootStore;
        this.props.showDoNotShowAgainCallback(this.checked);
        UIStore.toggleModal();
    }

    onConfirm() {
        const {UIStore} = this.context.rootStore;
        this.props.action();
        this.props.showDoNotShowAgainCallback(this.checked);
        UIStore.toggleModal();
    }

    render() {
        const {UIStore} = this.context.rootStore;
        const {title, message} = this.props;
        return <div className="modal-content">
            <div className="modal-header">
                {title && <h5 className="modal-title">{title}</h5>}
                <button type="button" onClick={UIStore.toggleModal} className="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>{message}</p>
            </div>
            <div className="modal-footer">
                <div className={"row"}>
                    <div className={"col"}>
                        <button onClick={this.onNotConfirm} type="button" className="btn btn-danger mr-2"
                                data-dismiss="modal" data-testid={'cancel-button'}>{gettext('No')}
                        </button>
                        <button onClick={this.onConfirm} type="button" data-testid={'confirm-button'}
                                className="btn btn-success">{gettext('Yes')}</button>
                    </div>
                </div>
                {this.props.showDoNotShowAgain && <div className={"row"}>
                    <div className={"col"}>
                        <input type={"checkbox"} onChange={this.onCheckBoxClick} checked={this.checked} value={1}
                               name={"do_not_show_again"}/> {gettext('Do not show again for current section')}
                    </div>
                </div>}
            </div>
        </div>
    }
}

ConfirmationModal.defaultProps = {
    showDoNotShowAgain: false,
    showDoNotShowAgainCallback: () => {
    }
}

ConfirmationModal.propTypes =
    {
        title: PropTypes.string,
        message: PropTypes.string,
        action: PropTypes.func,
        showDoNotShowAgain: PropTypes.bool,
        showDoNotShowAgainCallback: PropTypes.func
    }