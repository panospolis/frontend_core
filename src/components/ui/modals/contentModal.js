import React, {Component} from "react";
import {StoreContext} from "../../../context/Store";
import PropTypes from "prop-types";

export default class ContentModal extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
    }

    render() {
        const {UIStore} = this.context.rootStore;
        const {title, message} = this.props;

        return <div className="modal-content ">
            <div className="modal-header">
                {title && <h5 className="modal-title">{title}</h5>}
                <button type="button" onClick={UIStore.toggleModal} className="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {this.props.children}
            </div>
            <div className="modal-footer">

            </div>
        </div>
    }
}

ContentModal.propTypes =
    {
        title: PropTypes.string,
        message: PropTypes.string
    }