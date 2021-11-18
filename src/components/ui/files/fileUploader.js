import React, {Component} from "react";
import {observer} from "mobx-react";
import {makeObservable, observable, runInAction} from "mobx";
import Dropzone from "react-dropzone";
import {StoreContext} from "../../../context/Store";
import UploadedFiles from "./uploadedFiles";
import PropTypes from "prop-types";
import ErrorMessage from "../formMessages/errorMessage";

@observer
export default class FileUploader extends Component {
    static contextType = StoreContext

    files = [];
    errorMessage = null;

    constructor(props) {
        super(props);

        makeObservable(this, {
            files: observable,
            errorMessage: observable
        });

        this.onDrop = this.onDrop.bind(this);
    }

    async onDrop(files) {
        try {
            const response = await this.props.uploadUrl(files[0])
            if (response) {
                runInAction(() => {
                    this.files = files;
                    this.errorMessage = null;
                })
            }
        }catch (e){
            runInAction(() => {
                this.errorMessage = e.response.data;
            })
        }
    }

    render() {

        return <div className="container">
            <Dropzone onDropAccepted={this.onDrop}
                      maxFiles={1} noKeyboard={true}
                      accept={this.context.rootStore.config.files}>
                {({getRootProps, getInputProps}) => (
                    <section className="container">
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <p>{gettext("Drag 'n' drop a file here, or click to select file")}</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            <div className={"row mt-5"}>
                <div className={"col text-danger text-center"}>
                    {this.errorMessage && <ErrorMessage message={this.errorMessage}/>}
                </div>
            </div>
            {this.files && <UploadedFiles files={this.files}/>}
        </div>
    }
}

FileUploader.defaultProps = {}

FileUploader.propTypes = {
    uploadUrl: PropTypes.func
}
