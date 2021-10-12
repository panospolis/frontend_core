import React from "react";
import {StoreContext} from "../../context/Store";


export default class Settings extends React.Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
    }

    render() {
        const url = `${this.context.rootStore.CsStore.url}/logger/download/`;
        return <>
            <div className="row">
                <div className="col m-3">
                    <ul className="list-group">
                        <li className="list-group-item border-0"><a className="btn btn-success"
                                                           href={url}
                        >Download Logs File</a></li>
                        <li className="list-group-item border-0">Version:</li>
                        <li className="list-group-item border-0">Contact email:</li>
                    </ul>
                </div>
            </div>

        </>;
    }
}