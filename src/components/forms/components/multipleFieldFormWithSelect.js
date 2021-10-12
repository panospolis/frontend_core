import React from "react";
import PropTypes from "prop-types";

import TextFieldWithSelector from "./textFieldWithSelector";

export default class MultipleFieldFormWithSelect extends React.Component {
    render() {
        return <div className="row d-flex">
            <div className="col-3">
                <strong><label className="form-label">{gettext(this.props.label)}</label></strong>
            </div>
            <div className="col-9">
                <TextFieldWithSelector {...this.props}></TextFieldWithSelector>
            </div>
        </div>

    }

}

MultipleFieldFormWithSelect.defaultProps =
    {

        showRemoveButton: true,
        showAddButton: true
    }

MultipleFieldFormWithSelect.propTypes =
    {
        label: PropTypes.string,
        name: PropTypes.string,
        field: PropTypes.object,
        select: PropTypes.object,
        showRemoveButton: PropTypes.bool,
        showAddButton: PropTypes.bool,
        values: PropTypes.object
    }