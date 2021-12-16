import React, {Component} from "react";
import {StoreContext} from "../../../context/Store";
import PropTypes from "prop-types";

export default class ConfirmationModal extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);

        this.onConfirm = this.onConfirm.bind(this);
    }

    onConfirm() {
        const {UIStore} = this.context.rootStore;
        this.props.action();
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
                <button onClick={UIStore.toggleModal} type="button" className="btn btn-danger"
                        data-dismiss="modal" data-testid={'cancel-button'}>{gettext('No')}
                </button>
                <button onClick={this.onConfirm} type="button" data-testid={'confirm-button'} className="btn btn-success">{gettext('Yes')}</button>
            </div>
        </div>
    }
}

ConfirmationModal.propTypes =
    {
        title: PropTypes.string,
        message: PropTypes.string,
        action: PropTypes.func
    }