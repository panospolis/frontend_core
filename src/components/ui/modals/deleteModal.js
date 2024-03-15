import React from "react";
import PropTypes from "prop-types";
import ConfirmationModal from "./confirmationModal";
import {observer} from "mobx-react";

@observer
export default class DeleteModal extends ConfirmationModal.WrappedComponent {

    onConfirm() {
        const {UIStore} = this.context.rootStore;
        this.props.action(this.props.id);
        UIStore.toggleModal();
    }
}

DeleteModal.propTypes =
    {
        title: PropTypes.string,
        message: PropTypes.string,
        action: PropTypes.func
    }