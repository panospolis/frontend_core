import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

export default class SmallInformationBox extends Component {

    render() {
        return <div className="bg-info">
            <div className="info-question  text-white">
                <div className={"info-left"}><i className={""}><FontAwesomeIcon
                    icon={faInfoCircle}></FontAwesomeIcon>
                </i>
                </div>
                <div className={"info-right"}>
                    <div
                        className={"col"}>{this.props.message}</div>
                </div>
            </div>

        </div>
    }
}


