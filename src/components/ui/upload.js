import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import ContentModal from "./modals/contentModal";
import FileUploader from "./files/fileUploader";
import {StoreContext} from "../../context/store";
import PropTypes from "prop-types";

export default class Upload extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
        this.openFileUploader = this.openFileUploader.bind(this);
    }

    openFileUploader() {
        this.context.rootStore.UIStore.sModal(
            <ContentModal><FileUploader uploadUrl={this.props.uploadUrl}/></ContentModal>, 'form', "modal-info-dialog");
    }

    render() {
        return <button className={"btn btn-success m-1 float-right"}
                       onClick={this.openFileUploader}><FontAwesomeIcon
            icon={faFileUpload}></FontAwesomeIcon></button>
    }
}

Upload.propTypes = {
    uploadUrl: PropTypes.func,
}
