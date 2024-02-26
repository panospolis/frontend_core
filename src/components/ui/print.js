import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import PropTypes from "prop-types";

export default class Print extends Component {

    print() {
        window.print();
    }

    render() {
        const toolTipElement = (
            <Tooltip id="tooltip">
                {gettext('Print')}
            </Tooltip>
        );

        return <OverlayTrigger placement={this.props.tooltipPlacement} overlay={toolTipElement}>
            <button className={"btn btn-info m-1 float-right"} onClick={this.print}>
                <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></button>
        </OverlayTrigger>
    }
}

Print.propTypes = {
    tooltipPlacement: PropTypes.string
}
