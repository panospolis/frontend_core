import React, {Component} from "react";
import Print from "./print";

export default class PageActions extends Component {
    render() {
        return <div className={"row mt-1"}>
            <div className={"col mr-3"}>
                <Print></Print>
                {this.props.children}
            </div>
        </div>


    }
}
