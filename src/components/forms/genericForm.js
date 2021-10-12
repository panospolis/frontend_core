import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import {NavLink} from "react-router-dom";

import {StoreContext} from "../../context/Store";
import {Spinner} from "../ui/spinner"

export default class GenericForm extends Component {
    static contextType = StoreContext

    initialValues = {};

    constructor(props) {
        super(props);

        this.afterSubmit = this.afterSubmit.bind(this);
        this.form = this.form.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        this.initialValues = this.props.initialValues;
    }

    stylesPerQuestion(component) {
        return <div className="card mt-2">
            <div className="card-body  bg-light">
                <div className="row mt-5 m-3">
                    <div className="col">
                        {component}
                    </div>
                </div>
            </div>
        </div>
    }

    /**
     * actions after a successful submission
     * @param valid
     * @returns {Promise<void>}
     */
    async afterSubmit(valid) {
        if (valid) {
            if (this.props.afterSubmission) {
                await this.props.afterSubmission?.();
            }
        }
    }

    returnToList(url) {
        return <NavLink to={url}>
            {gettext('Return to List')}
        </NavLink>
    }

    /**
     *
     * @param msg
     * @returns {JSX.Element}
     */
    successMessage(msg = 'Success') {
        return <div key={"message-success"} className="row d-flex justify-content-center mt-5  no-print">
            <div className="col-7 mb-3 text-center">
                <div className="alert alert-success" role="alert">
                    {msg}
                </div>
            </div>
        </div>;
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async submitForm(values, actions) {
        throw new Error('Implement submit function');
    }


    /**
     * pass through all the fields and if anyone is empty then
     * throw an error
     */
    validateForm(values) {
        const errors = {};
        for (const value in values) {

            if (values[value] === '') {
                errors[value] = gettext('Field is required')
            }
        }
        return errors;
    }


    /**
     *
     * @returns {JSX.Element}
     */
    actionForms(isSubmitting) {
        return <div key={"submitting-form"} className="row d-flex justify-content-center mt-5 no-print">
            <div className="col-7 mb-3 text-center">
                <button className="btn btn-success col-3" type="submit">
                    {isSubmitting ? <Spinner/> : 'Save'}
                </button>
            </div>
        </div>;
    }

    /**
     *
     * @param msg
     * @returns {JSX.Element}
     */
    errorMessage(msg = '') {
        return <div key={msg} className="row d-flex justify-content-center mt-5  no-print">
            <div className="col-7 mb-3 text-center">
                <div className="alert form alert-danger" role="alert">
                    {msg}
                </div>
            </div>
        </div>
    }

    header() {
        throw new Error('Implement header function');
    }

    showError() {
        return null;
    }

    formBottomArea(isValid, isSubmitting, errors, status) {
        const elements = []
        if (!isValid) {
            elements.push(this.showError(errors));
        }
        if (status?.success) {
            elements.push(this.successMessage(status.success))
        }

        elements.push(this.actionForms(isSubmitting))

        return elements;
    }

    /**
     *
     * @param errors
     * @param touched
     * @param handleBlur
     * @param isSubmitting
     * @param isValid
     * @param dirty
     * @returns {JSX.Element}
     */
    form(values, errors, touched, handleBlur, isSubmitting, isValid, dirty, status) {
        return <Form>
            {(this.props.showForms.map((field, i) => {
                    return (
                        field
                    )
                })
            )}
            {this.formBottomArea(isValid, isSubmitting, errors, status)}
        </Form>;
    }

    getInitialValues() {
        return this.props.initialValues
    }

    /**
     *
     * @returns {JSX.Element|null}
     */
    render() {
        if (this.getInitialValues() && !Object.entries(this.getInitialValues()).length) {
            return null;
        }

        return <div className="container">
            {this.header()}
            <Formik className={"bg-light"} innerRef={(p) => (this.context.rootStore.UIStore.formik = p)}
                    initialValues={{...this.getInitialValues()}}
                    validate={(values) => this.validateForm(values)}
                    onSubmit={(values, actions) => this.submitForm(values, actions)
                    }
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      isSubmitting,
                      isValid,
                      dirty,
                      status

                  }) => this.form(values, errors, touched, handleBlur, isSubmitting, isValid, dirty, status)}
            </Formik>
        </div>
    }
}

GenericForm.propTypes = {
    afterSubmission: PropTypes.func,
    showForms: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    initialValues: PropTypes.object,
    sectionId: PropTypes.number
}