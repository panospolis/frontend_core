import React, {Component} from "react";
import {observer} from "mobx-react";
import {StoreContext} from "../../../context/Store";
import PropTypes from "prop-types";

@observer
export default class InformationModal extends Component {
    static contextType = StoreContext

    render() {
        const {UIStore} = this.context.rootStore;
        const {data, title} = this.props;

        return <div className="modal-content">
            <div className="modal-header align-content-center">
                <h5 className="modal-title">{title}</h5>
                <button type="button" onClick={UIStore.toggleModal} className="close" data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body justify-content-center">
                {data}
            </div>
            <div className="modal-footer justify-content-center">
                <button onClick={UIStore.toggleModal} type="button" className="btn btn-success"
                        data-dismiss="modal">{gettext('Ok')}
                </button>
            </div>
        </div>
    }
}

InformationModal.propTypes =
    {
        data: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
          PropTypes.object
        ]),
        title: PropTypes.string
    }