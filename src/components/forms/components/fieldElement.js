import React from "react";
import PropTypes from "prop-types";
import {Field} from "formik";

export const FieldElement = function (props) {
    return <div>
        <Field className="form-control" type="text" name={props.name}>
            {({
                  field,
                  form,
                  meta,
              }) => {
                if ([undefined, null].includes(field.value)) {
                    field.value = props.value;
                }

                let errorDiv = null;
                if (props.showErrors) {
                    if (meta.error && meta.touched) {
                        errorDiv =
                            <div className="error  form-control bg-danger text-center text-light">{meta.error}</div>
                    }
                }

                form.initialValues[props.name] = field.value;

                return <div className="row d-flex">
                    <div className={props.classValue}>
                        <input data-testid={props.name} type={props.type} name={props.name} autoComplete={"off"}
                               className={`form-control ${props.classValue}`} {...field} />
                        {errorDiv}
                    </div>
                    {props.children}
                </div>
            }}
        </Field>
    </div>

}

FieldElement.defaultProps = {
    type: 'text',
    showErrors: true,
    touched: true,
    classValue: ''
}

FieldElement.propTypes =
    {
        name: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
        showErrors: PropTypes.bool,
        touched: PropTypes.bool,
        classValue: PropTypes.string
    }