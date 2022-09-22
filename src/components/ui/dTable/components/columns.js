import React, {Component} from "react";
import PropTypes from 'prop-types';
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Columns extends Component {

    showOrdering(name){
        if(this.props.parameters.orderBy == name){
            if(this.props.parameters.order){
                return <FontAwesomeIcon icon={faArrowUp}/>
            }else{
                return <FontAwesomeIcon icon={faArrowDown}/>
            }
        }
    }

    renderColumns() {
        let labels = [];
        const {config} = this.props;
        config.labels.forEach((label, idx) => {
            labels.push(<th style={{width: config.fields[idx].width}} className="text-center" scope="col" key={'label' + idx}  data-testid={config.fields[idx].name} id={config.fields[idx].name}
                            onClick={this.props.setOrderBy}>{label} {this.showOrdering(config.fields[idx].name)} </th>)
        });

        return labels;
    }

    render() {
        return this.renderColumns()
    }
}

Columns.propTypes = {
    setOrderBy: PropTypes.func,
    config: PropTypes.object
}