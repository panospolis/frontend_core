import React, {Component} from "react";
import WizardTopMenu from "../menus/topMenu";
import {withRouter} from "react-router";

class InnerSection extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return <div className="container">
            <WizardTopMenu></WizardTopMenu>
            <div className="row">
                <div className="col"></div>
            </div>
            {this.props.children}
        </div>
    }
}

export default withRouter(InnerSection)