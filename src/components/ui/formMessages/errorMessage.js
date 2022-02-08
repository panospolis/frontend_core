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

    showMessage() {
        if (!Array.isArray(this.props.message)) {
            return <div><FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon> {this.props.message}</div>;
        }

        return <div><FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon> {gettext('Errors :')}
            <ul>{this.props.message.map(m => <li key={m}>{m}</li>)}</ul>
        </div>
    }

    render() {
        return <div className="alert alert-danger" role="alert">
            {this.showMessage()}
        </div>
    }
}

ErrorMessage.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
}