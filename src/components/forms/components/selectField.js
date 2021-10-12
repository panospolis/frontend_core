import React from "react";
import PropTypes from "prop-types";

export const SelectField = function (props) {

    const options = [];
    props.options.forEach(option => {
        options.push(<option key={option.value} value={option.value}>{option.label}</option>)
    });

    const field = <select value={props.value} className={`form-control ${props.selectClass}`}
                          name={props.id}
                          id={props.id}
                          onChange={props.onChange}>{options}</select>


    return <div className={`form-group ${props.bodyClass}`}>
        {field}
    </div>


}
SelectField.defaultProps = {
    selectClass: 'form-control',
    bodyClass: 'col-11'

}

SelectField.propTypes =
    {
        id: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        options: PropTypes.array,
        selectClass: PropTypes.string,
        bodyClass: PropTypes.string
    }