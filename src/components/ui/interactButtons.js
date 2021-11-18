import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default class InteractButton extends Component {

    constructor(props) {
        super(props);
        this.action = this.action.bind(this);
    }

    action() {
        if (this.props.id) {
            this.props.fn(this.props.id);
        } else {
            this.props.fn();
        }
    }

    render() {
        return <button className={this.props.css} onClick={() => this.action()}>
            <FontAwesomeIcon icon={this.props.icon}></FontAwesomeIcon> {this.props.label}</button>
    }
}

InteractButton.propTypes = {
    icon: PropTypes.object,
    css: PropTypes.string,
    fn: PropTypes.func,
    label: PropTypes.string,
    id: PropTypes.number
}