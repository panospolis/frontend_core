import React, {Component} from "react";
import Print from "./print";
import PropTypes from "prop-types";

export default class PageActions extends Component {
    render() {
        return <div className={"row mt-1"}>
            <div className={"col mr-3"}>
                {this.props.print && <Print></Print>}
                {this.props.children}
            </div>
        </div>


    }
}

PageActions.defaultProps ={
    print: true
}

PageActions.propTypes = {
    print: PropTypes.bool
}