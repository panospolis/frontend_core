import React, {Component} from "react";
import {observer} from "mobx-react";
import {StoreContext} from "../../../context/Store";
import PropTypes from "prop-types";
import {withRouter} from "react-router";

@withRouter
@observer
export default class ErrorModal extends Component {
    static contextType = StoreContext

    render() {
        const {UIStore, CsStore} = this.context.rootStore;
        const {message} = this.props;
        const url = `${this.context.rootStore.CsStore.url}/logger/download/`;
        return <div className="modal-content">
            <div className="modal-header align-content-center">
                <h5 className="modal-title">{gettext('Error')}</h5>
                <button type="button" onClick={UIStore.toggleModal} className="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body justify-content-center">
                <p><strong>{message}</strong></p>
            </div>
            <div className="modal-footer justify-content-center">
                <button onClick={UIStore.toggleModal} type="button" className="btn btn-success"
                        data-dismiss="modal">{gettext('Ok')}
                </button>
                {this.props.downloadLogs && <a className="btn btn-info" target={"_blank"}
                href={url}
                >{gettext('Download Logs File')}</a>}

            </div>
        </div>
    }
}

ErrorModal.defaultProps ={
    downloadLogs: true
}

ErrorModal.propTypes =
    {
        message: PropTypes.string,
        downloadLogs: PropTypes.bool
    }