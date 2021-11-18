import React, {Component} from "react";
import PropTypes from "prop-types";

export default class SuccessMessage extends Component {

    constructor(props) {
        super(props);
        this.action = this.action.bind(this);
    }

    action() {
        this.props.fn();
    }

    render() {
        return <div className="alert alert-success" role="alert">
         {this.props.message}
        </div>

    }
}

SuccessMessage.propTypes = {
    message: PropTypes.string
}