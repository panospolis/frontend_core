import React from "react";
import Datatable from "../datatable/Datatable";
import {makeObservable, observable, runInAction} from "mobx"
import Section from "../sections/section";

export default class List extends Section {

    list = null;
    parameters = null;

    constructor(props) {
        super(props);
        makeObservable(this, {
            list: observable
        });

        this.getData = this.getData.bind(this);
        this.getConfig = this.getConfig.bind(this);
        this.actions = this.actions.bind(this);
        this.delete = this.delete.bind(this);
    }

    header() {

        return super.header();
    }

    async delete() {

    }

    async refreshListAfterSubmission() {
        await this.getDataAndRender();
        if (this.list.count) {
            await this.completeTheStep();
        }
    }

    async getDataAndRender(){
        const data = await this.getData();
        runInAction(() => {
            this.list = data;
        })
    }

    async componentDidMount() {
        await this.getDataAndRender();
    }

    async getData(parameters) {
        return this.context.rootStore.CsStore.getAppData(parameters);
    }

    queryString(queryString = '') {
        return queryString;
    }

    getConfig() {
        if (this.context) {
            return this.context.rootStore.config;
        }
        return {};
    }

    actions() {
        return <div></div>;
    }

    render() {
        if (!this.list) {
            return <div>Loading</div>;
        }
        return <div className="container">
            {this.header()}
            <div className="row">
                <Datatable list={this.list} refresh_data={this.getData} config={this.getConfig().datatable}
                           extraActions={this.actions} delete={this.delete}></Datatable>
            </div>
        </div>
    }
}