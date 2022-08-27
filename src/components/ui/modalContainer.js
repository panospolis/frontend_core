import React, {Component} from "react";
import {StoreContext} from "../../context/store";
import PropTypes from "prop-types";
import {observer} from "mobx-react";

@observer
export default class ModalContainer extends Component {
    static contextType = StoreContext


    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.modal = this.modal.bind(this);
    }

    close() {
        this.context.rootStore.UIStore.toggleModal();
    }

    modal(){
        const {UIStore} = this.context.rootStore;

        return UIStore.modal.body
    }

    render() {
        const {UIStore} = this.context.rootStore;
        if (!UIStore.triggerModal) {
            return null;
        }

        return <div className="modal fade show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
            <div className={`modal-dialog  ${UIStore.modal.styles}`} role="document">
                {this.modal()}
            </div>
        </div>
    }
}

ModalContainer.propTypes = {
    modal: PropTypes.string,
    action: PropTypes.func
}