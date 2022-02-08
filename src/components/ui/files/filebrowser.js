import React, {Component} from "react";
import {observer} from "mobx-react";
import {makeObservable, observable, runInAction} from "mobx";
import {StoreContext} from "../../../context/Store";
import PropTypes from "prop-types";
import {
    faDownload,
    faFile,
    faFileArchive,
    faFileExcel,
    faFilePdf,
    faFilePowerpoint,
    faFileWord,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage} from "@fortawesome/free-solid-svg-icons/faFileImage";

@observer
export default class FileBrowser extends Component {
    static contextType = StoreContext

    files = [];
    loader = false;

    constructor(props) {
        super(props);

        makeObservable(this, {
            files: observable
        });

        this.delete = this.delete.bind(this);
    }

    async componentDidMount() {
        await this.loadFiles();
    }

    async loadFiles() {
        const {CsStore} = this.context.rootStore;
        const data = await CsStore.getAttachments(this.props.id)

        if (data) {
            runInAction(() => {
                this.files = data.results;
            })
        }
    }

    async delete(id, section_id) {
        const {CsStore} = this.context.rootStore;
        const result = await CsStore.deleteAttachment(id, section_id);
        if (result) {
            await this.loadFiles();
        }
    }

    fileIcon(ext) {
        if (ext === "pdf") {
            return <FontAwesomeIcon size={"3x"} icon={faFilePdf}></FontAwesomeIcon>
        } else if (["jpg", "png", "jpg"].includes(ext)) {
            return <FontAwesomeIcon size={"3x"} icon={faFileImage}></FontAwesomeIcon>
        } else if (ext === "vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return <FontAwesomeIcon size={"3x"} icon={faFileWord}></FontAwesomeIcon>
        } else if (ext === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            return <FontAwesomeIcon size={"3x"} icon={faFileExcel}></FontAwesomeIcon>
        } else if (ext === "vnd.openxmlformats-officedocument.presentationml.presentation") {
            return <FontAwesomeIcon size={"3x"} icon={faFilePowerpoint}></FontAwesomeIcon>
        } else if (["zip", "rar", "x-rar"].includes(ext)) {
            return <FontAwesomeIcon size={"3x"} icon={faFileArchive}></FontAwesomeIcon>
        } else {
            return <FontAwesomeIcon size={"3x"} icon={faFile}></FontAwesomeIcon>
        }
    }

    actions(file) {
        if (this.props.selections) {
            return <div className="row">
                <div className={"col m-1"}>
                    <button className={'btn btn-danger no-print'} type={"button"}
                            id={file.id}
                            data-id={file.section}
                            onClick={() => this.props.selected(file)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            </div>
        }

        return <div className="row">
            <div className={"col m-1"}>
                <button className={'btn btn-danger no-print'} type={"button"}
                        id={file.id}
                        data-id={file.section}
                        onClick={() => this.delete(file.id, file.section)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
            <div className={"col m-1"}>
                <a className="btn btn-info" target={"_blank"}
                   href={`${file.file_upload}`}
                   target={'_blank'}
                   id={file.id}
                >
                    <FontAwesomeIcon icon={faDownload}/>
                </a>
            </div>
        </div>
    }

    render() {
        if (!this.files.length) {
            return <div className="container mb-2">{gettext('No file(s) found')}</div>;
        }

        return <div className="">
            <table className="table table-striped table-bordered">
                <thead>
                <tr className=" table-active">
                    <th scope="col" className={"no-print"}>{gettext("Name")}</th>
                    <th scope="col" className={"no-print"}>{gettext("File type")}</th>
                    <th scope="col" className={"no-print"}>{gettext("Actions")}</th>
                </tr>
                </thead>
                <tbody>
                {this.files.map((file, idx) => {
                    return <tr key={`file-${idx}`} className="tr-shadow ">
                        <td className={"col  mb-2 mr-2"} style={{width: "80%"}}>{file.name}</td>
                        <td className={"col  mb-2 mr-2 text-center"}
                            style={{width: "10%"}}>{this.fileIcon(file.file_type)}</td>
                        <td className={"no-print"}>
                            <div className='container no-print'>
                                {this.actions(file)}
                            </div>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    }
}

FileBrowser.defaultProps = {
    selections: false
}

FileBrowser.propTypes = {
    files: PropTypes.array,
    id: PropTypes.number,
    selections: PropTypes.bool,
    selected: PropTypes.func
}
