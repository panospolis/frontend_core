import React, {Component} from "react";
import {StoreContext} from "../../context/store";
import PropTypes from "prop-types";
import {observer} from "mobx-react";

@observer
export default class AutoComplete extends Component {
    static contextType = StoreContext

    constructor(props) {
        super(props);

        this.setSuggestion = this.setSuggestion.bind(this);
    }

    setSuggestion(e) {
        this.context.rootStore.UIStore.formik.setFieldValue(this.props.textField, e.currentTarget.innerText);
        this.context.rootStore.UIStore.formik.setFieldValue(this.props.idField, e.currentTarget.dataset.id);
        this.props.resetSearch();
    }

    render() {
        return <div className="autocomplete-items">{this.props.suggestions.map((suggestion, id) => {
            return <div key={`suggestion_${id}`} className={"list-group-item"}
                        data-id={suggestion[this.props.idField]}
                        onClick={this.setSuggestion}>{suggestion[this.props.textField]}</div>
        })}</div>
    }
}

AutoComplete.propTypes =
    {
        suggestions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        formProps: PropTypes.object,
        textField: PropTypes.string,
        idField: PropTypes.string,
        resetSearch: PropTypes.func
    }