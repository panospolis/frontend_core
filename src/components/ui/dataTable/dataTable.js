import React, {Component} from "react";
import PropTypes from 'prop-types';
import {action, makeObservable, observable, runInAction} from "mobx"
import {observer} from 'mobx-react';
import Elements from "./components/Elements";
import Columns from "./components/Columns";
import Filters from "./components/Filters";
import Pagination from './components/Pagination'
import InteractButton from "../interactButtons";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import ContentModal from "../modals/contentModal";
import {StoreContext} from "../../../context/Store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SuccessMessage from "../formMessages/successMessage";


export default @observer
class DataTable extends Component {
    static contextType = StoreContext

    list = [];
    elements = {};
    filterFields = {};
    checkBoxes = [];
    showMessage = false;
    closeModalTimeout = null;


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
            elements: observable,
            list: observable,
            showMessage: observable
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
        this.showModal = this.showModal.bind(this);
    }

    @action
    async componentDidMount() {
        this.parameters.orderBy = this.props.config.fields[0].name;
        await this.sendRequest();
        this.labels = this.props.labels;

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
        this.closeModalTimeout = null;
        const parameters = this.createFilterQuery();

        const data = await this.props.refresh_data(parameters);
        if (data) {
            runInAction(() => {
                this.list = data;
                this.records = data?.count ?? 0;
            });
            return true;
        }
        return false;
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
        return <div>
            {this.props.allowEdit && <div className={"col m-1 no-print"}>
                <button className={"btn btn-success mr-2"} type={"button"} id={`edit-${record.id}`}
                        onClick={() => this.showModal(record.id)}>
                    <FontAwesomeIcon icon={faEdit}/>
                </button>
            </div>}
            {this.props.extraActions(record)}
        </div>
    }

    resetMessage() {
        this.closeModalTimeout = setTimeout(() => {
            runInAction(() => {
                this.showMessage = false;
            })
        }, 3000)
    }

    showModal(id = null) {
        const CreateComponent = this.props.createComponent;
        this.context.rootStore.UIStore.sModal(<ContentModal><CreateComponent id={id} afterSubmission={async () => {
            const success = await this.sendRequest();
            if (success) {

                runInAction(() => {
                    this.showMessage = true;
                })
                this.resetMessage();
            }
            await this.props.afterCreateFunction?.()
        }}/></ContentModal>, 'form', 'modal-xl');
    }

    render() {
        if (!this.list?.results) {
            return null;
        }

        const totalPages = this.createPageRecords();
        return <div className="mt-3 col ">

            {this.props.showFilters && <Filters config={this.props.config} search={this.search} filterBy={this.filterBy}
                                                elements={this.elements}/>}
            {this.showMessage && <div className={"row"}>
                <div className={"col"}><SuccessMessage message={gettext('Record saved')}/></div>
            </div>}
            {this.props.createComponent && <div className={"row"}>
                <div className="col text-right mb-1">
                    <InteractButton css={"btn btn-success"} fn={this.showModal} icon={faPlus}
                                    label={this.props.newItemLabel}/>
                </div>
            </div>}
            <div className="">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr className=" table-active">
                        <Columns config={this.props.config} parameters={this.parameters}
                                 setOrderBy={this.setOrderBy}/>
                        <th scope="col" className={"no-print"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Elements allowDelete={this.props.allowDelete} records={this.list.results} config={this.props.config}
                              extraActions={this.extraActions} actionDelete={this.delete}/>
                    </tbody>
                </table>
            </div>
            {this.props.showPaging &&
            <Pagination totalPages={totalPages} setPage={this.setPage} currentPage={this.getPage}/>}
        </div>
    }

}

DataTable.defaultProps = {
    showFilters: true,
    showPaging: false,
    allowEdit: false,
    allowDelete: true
}

DataTable.propTypes =
    {
        extraActions: PropTypes.func,
        delete: PropTypes.func,
        showFilters: PropTypes.bool,
        showPaging: PropTypes.bool,
        createComponent: PropTypes.func,
        newItemLabel: PropTypes.string,
        allowEdit: PropTypes.bool,
        afterCreateFunction: PropTypes.func,
        allowDelete: PropTypes.bool
    }
