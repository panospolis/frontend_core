import React from "react";
import {withRouter} from "react-router";
import {
    NavLink
} from "react-router-dom";

@withRouter
export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div className="col pl-0">
                <NavLink to={'/sage'}>
                    <button className={"btn btn-success"}>
                        List
                    </button>
                </NavLink>
            </div>
        </div>
    }
}