import React from "react";
import {observer} from "mobx-react";
import PropTypes from "prop-types";

import MultipleFields from "./multipleFields";
import {StoreContext} from "../../../context/store";
import ContainerWithInfoPopup from "../../ui/containerWithInfoPopup";

@observer
export default class MultipleFieldsFormField extends React.Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);
    }


    render() {

        return <div className="row d-flex">
            <div className="col-3 ">
                <ContainerWithInfoPopup id={this.props.id}>
                <strong><label className="form-label">{gettext(this.props.name)}</label></strong>
                </ContainerWithInfoPopup>
            </div>
            <div className="col-9 ">
                <MultipleFields values={this.props.values} name={this.props.id}></MultipleFields>
            </div>
        </div>

    }

}

MultipleFieldsFormField.propTypes =
    {
        name: PropTypes.string,
        id: PropTypes.string,
        values: PropTypes.object,
        infoBodyMessage: PropTypes.string,
        infoTitleMessage: PropTypes.string
    }