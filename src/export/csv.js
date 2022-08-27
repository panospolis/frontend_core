import React, {Component} from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from '@fortawesome/free-solid-svg-icons'
import {StoreContext} from "../../context/store";
import CsvDownloader from 'react-csv-downloader';

export default class Csv extends Component {
    static contextType = StoreContext
    columns = [];

    /**
     *
     * @returns {JSX.Element|null}
     */
    render() {
        return <CsvDownloader className={this.props.className} columns={this.props.columns}
                              filename={this.props.filename}
                              extension=".csv"
                              separator=";" datas={this.props.data}>
            <FontAwesomeIcon
                icon={faDownload}></FontAwesomeIcon>

        </CsvDownloader>
    }
}

Csv.propTypes = {
    filename: PropTypes.string,
    data: PropTypes.array,
    className: PropTypes.string
}