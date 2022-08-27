import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import {StoreContext} from "../../../context/store";
import {observer} from "mobx-react";
import {action, makeObservable, observable} from "mobx";
import {ErrorMessage} from "formik";

@observer
export default class DatePickerField extends React.Component {
    static contextType = StoreContext

    date = null;

    constructor(props) {
        super(props);

        makeObservable(this, {
            date: observable
        });

        this.setDate = this.setDate.bind(this);
    }

    @action
    setDate(date) {
        this.date = date;
        this.context.rootStore.UIStore.formik.setFieldValue(this.props.name, `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
    }

    render() {
        let fieldValue = this.props.startDate ? new Date(this.props.startDate) : null;
        if(this.date){
            fieldValue = this.date;
        }
        return <div className="row d-flex">
            <div className="col-4">
                <DatePicker placeholderText="DD/MM/YYYY" className={"col-12"} wrapperClassName="datePicker" dateFormat="dd/MM/yyyy" onSelect={this.setDate} onChange={this.setDate}
                            selected={fieldValue}/>
                <ErrorMessage name={this.props.name} className="bg-danger form-control text-center text-light"
                              component="div"/>
            </div>
        </div>

    }

}

DatePickerField.propTypes =
    {
        startDate: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        showErrors: PropTypes.bool,
        touched: PropTypes.bool
    }