import React, {Component} from "react";
import Print from "./print";
import PropTypes from "prop-types";
import Upload from "./upload";

export default class PageActions extends Component {
    render() {
        return <div className={"row mt-1 buttons-actions"}>
            <div className={"col mr-3"}>
                {this.props.print && <Print></Print>}
                {this.props.upload && <Upload></Upload>}
                {this.props.children}
            </div>
        </div>


    }
}

PageActions.defaultProps ={
    print: true,
    upload: false
}

PageActions.propTypes = {
    print: PropTypes.bool,
    upload: PropTypes.bool
}