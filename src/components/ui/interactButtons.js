import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

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

    showToolTip(id, testid){
        const toolTipElement = (
            <Tooltip id="tooltip">
                {this.props.tooltip}
            </Tooltip>
        );

        return <OverlayTrigger placement={this.props.tooltipPlacement} overlay={toolTipElement}>
            <button className={this.props.css} data-testid={testid} id={id} onClick={() => this.action()}>
                <FontAwesomeIcon icon={this.props.icon}></FontAwesomeIcon> {this.props.label}</button>
        </OverlayTrigger>
    }

    render() {
        const id = this.props.label?.replaceAll(' ', '-') ?? this.props.id;
        const testid = this.props.label?.replaceAll(' ', '-') ?? this.props.testid;
        if (this.props.tooltip) {
            return this.showToolTip(id, testid);
        }

        return <button className={this.props.css} data-testid={testid} id={id} onClick={() => this.action()}>
            <FontAwesomeIcon icon={this.props.icon}></FontAwesomeIcon> {this.props.label}</button>
    }

}

InteractButton.propTypes = {
    icon: PropTypes.object,
    css: PropTypes.string,
    fn: PropTypes.func,
    label: PropTypes.string,
    id: PropTypes.number,
    testid: PropTypes.string,
    tooltip: PropTypes.string,
    tooltipPlacement: PropTypes.string
}