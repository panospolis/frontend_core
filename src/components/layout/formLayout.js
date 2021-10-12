import React, {Component} from "react";
import {withRouter} from "react-router";

class FormLayout extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col"></div>
            </div>
            {this.props.children}
        </div>
    }
}

export default withRouter(FormLayout)