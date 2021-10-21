import React, {Component} from "react";
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {makeObservable, observable} from "mobx";

export default @observer
class Filters extends Component {

    showFilters = true;

    constructor(props) {
        super(props);
        makeObservable(this, {
            showFilters: observable
        })
        this.renderSearchInputs = this.renderSearchInputs.bind(this);
    }

    renderSearchInputs() {
        let inputs = [];
        const {config} = this.props;
        config.fields.forEach((field, idx) => {

            inputs.push(<div className="col" key={'input' + idx}>
                <input type="text"
                       className="form-control"
                       placeholder={config.labels[idx]} name={field.name}
                       value={this.props.elements[field]}
                       onChange={this.props.filterBy}/>
            </div>)
        });

        inputs.push(<div className="col" key="button">
            <button className="btn btn-success" onClick={this.props.search}> search</button>
        </div>);

        return inputs;
    }

    render() {
        return <div className="row m-5 no-print">
            {this.showFilters && this.renderSearchInputs()}</div>
    }
}

Filters.propTypes =
    {
        filterBy: PropTypes.func,
        search: PropTypes.func,
        elements: PropTypes.object,
        config: PropTypes.object
    }