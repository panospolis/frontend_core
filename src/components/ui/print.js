import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";

export default class Print extends Component {

    print() {
        window.print();
    }

    render() {
        return <button className={"btn btn-info m-1 float-right"} onClick={this.print}>
            <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></button>
    }
}
