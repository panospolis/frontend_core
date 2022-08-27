import React, {Component} from "react";
import {observer} from "mobx-react";
import {StoreContext} from "../../../context/store";
import PropTypes from "prop-types";
import SuccessMessage from "../formMessages/successMessage";

@observer
export default class UploadedFiles extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.files.length) {
            return null;
        }
        const files = this.props.files.map(file => (
            <div key={file.name} className={"row"}>
                <div className={"col"}>
                    {gettext('File')} "{file.name}" - {file.size} bytes {gettext('uploaded')}
                </div>
            </div>
        ));
        return <div className={"row mt-5"}>
            <div className={"col"}>
                <SuccessMessage message={files}/>
            </div>
        </div>
    }
}

UploadedFiles.propTypes = {
    files: PropTypes.array,
}
