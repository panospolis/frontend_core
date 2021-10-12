import React, {Component} from "react";
import {StoreContext} from "../../context/Store";
import {observer} from "mobx-react";
import InfoPopOver from "./infoPopOver";

@observer
export default class ContainerWithInfoPopup extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
    }

    render() {

        return <div className={"row"}>
            <div className={"col"}>{this.props.children}</div>
            <div className={"col-1"}><InfoPopOver id={this.props.id} body={this.props.body} title={this.props.title}/>
            </div>
        </div>


    }
}
