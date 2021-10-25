import React, {Component} from "react";
import PropTypes from 'prop-types';
import {action, makeObservable, observable, runInAction} from "mobx"
import {observer} from 'mobx-react';
import Elements from "./components/Elements";
import Columns from "./components/Columns";
import Filters from "./components/Filters";
import Pagination from './components/Pagination'


export default @observer
class DataTable extends Component {

    list = [];
    elements = {};
    filterFields = {};
    checkBoxes = [];


    parameters = {
        orderBy: 'name',
        order: false,
        searchFilters: [],
        page: 1
    }

    constructor(props) {
        super(props);

        makeObservable(this, {
            parameters: observable,
            elements: observable
        });

        this.filterBy = this.filterBy.bind(this);
        this.setOrderBy = this.setOrderBy.bind(this);
        this.search = this.search.bind(this);
        this.createFilterQuery = this.createFilterQuery.bind(this);
        this.createPageRecords = this.createPageRecords.bind(this);
        this.setPage = this.setPage.bind(this);
        this.getPage = this.getPage.bind(this);
        this.extraActions = this.extraActions.bind(this);
        this.delete = this.delete.bind(this);

    }

    @action
    async componentDidMount() {
        this.parameters.orderBy = this.props.config.fields[1].name;
        await this.sendRequest();
        this.list = this.props.list
        this.labels = this.props.labels;
        this.records = this.props.list.count;

    }

    @action
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(prevProps.list.count !== this.props.list.count){
        //    this.list =  this.props.list;
        // }
    }

    @action
    filterBy(e) {
        this.filterFields[e.target.name] = e.target.value;
    }

    createPageRecords() {
        return Math.ceil(parseInt(this.records) / this.props.config.PageSize);
    }

    createFilterQuery() {
        const parameters = {
            ...this.parameters.searchFilters, order_by: this.getOrderBy(),
            order: this.getOrder(), page: this.getPage()
        };

        return parameters;
    }

    async sendRequest() {
        const parameters = this.createFilterQuery();

        const data = await this.props.refresh_data(parameters)
        runInAction(() => {
            this.list = data;
            this.records = data?.count ?? 0;
        });
    }

    async search() {
        runInAction(() => {
            this.parameters.page = 1;
        });
        this.parameters.filterFields = [];
        Object.entries(this.filterFields).forEach((value, key) => {

            runInAction(() => {
                this.parameters.searchFilters[`filter_by_${value[0]}`] = value[1];
            });

        });

        await this.sendRequest();
    }

    getPage() {
        return parseInt(this.parameters.page);
    }

    async setPage(page = 1) {
        runInAction(() => {
            this.parameters.page = page;
        });

        await this.sendRequest();
    }

    async delete(id) {
        await this.props.delete(id);
        await this.sendRequest();
    }

    getOrder() {
        return this.parameters.order;
    }

    async setOrderBy(e) {
        runInAction(() => {
            this.parameters.orderBy = e.target.id;
            this.parameters.order = !this.parameters.order
        })

        await this.sendRequest();
    }

    getOrderBy() {
        return this.parameters.orderBy;
    }

    checkAllItems() {

    }

    extraActions(record) {
        return this.props.extraActions(record);
    }

    render() {
        if (!this.props.list?.results) {
            return null;
        }

        const totalPages = this.createPageRecords();
        return <div className="mt-3 col ">
            {this.props.showFilters && <Filters config={this.props.config} search={this.search} filterBy={this.filterBy}
                     elements={this.elements}></Filters>}
            <div className="">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr className=" table-active">
                        <Columns config={this.props.config} parameters={this.parameters} setOrderBy={this.setOrderBy}></Columns>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Elements records={this.props.list.results} config={this.props.config}
                              extraActions={this.extraActions} actionDelete={this.delete}></Elements>
                    </tbody>
                </table>
            </div>
            {this.props.showPaging && <Pagination totalPages={totalPages} setPage={this.setPage} currentPage={this.getPage}></Pagination>}
        </div>
    }
}

DataTable.defaultProps = {
    showFilters: true,
    showPaging: false
}

DataTable.propTypes = {
    list: PropTypes.object,
    extraActions: PropTypes.func,
    delete: PropTypes.func,
    showFilters: PropTypes.bool,
    showPaging: PropTypes.bool
}
