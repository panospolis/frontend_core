import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import ContentModal from "./modals/contentModal";
import FileUploader from "./files/fileUploader";
import {StoreContext} from "../../context/store";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

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
        const toolTipElement = (
            <Tooltip id="tooltip">
                {gettext('Upload file')}
            </Tooltip>
        );

        return <OverlayTrigger placement={this.props.tooltipPlacement} overlay={toolTipElement}>
            <button className={"btn btn-success m-1 float-right"}
                    onClick={this.openFileUploader}><FontAwesomeIcon
                icon={faFileUpload}></FontAwesomeIcon></button>
        </OverlayTrigger>
    }
}

Upload.propTypes = {
    uploadUrl: PropTypes.func,
    tooltipPlacement: PropTypes.string
}
