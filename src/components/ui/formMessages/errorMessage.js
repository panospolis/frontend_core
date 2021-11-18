import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

export default class ErrorMessage extends Component {

    constructor(props) {
        super(props);
        this.action = this.action.bind(this);
    }

    action() {
        this.props.fn();
    }

    render() {
        return <div className="alert alert-danger" role="alert">
            <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>{this.props.message}
        </div>
    }
}

ErrorMessage.propTypes = {
    message: PropTypes.string
}