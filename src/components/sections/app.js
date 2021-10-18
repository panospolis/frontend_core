import React from "react";
import {withRouter} from "react-router";
import List from "../list/list";
import {NavLink} from "react-router-dom";
import {runInAction} from "mobx";
import {observer} from "mobx-react";

/**
 * Class of Main section where you can see the list of all records, order them, delete them and proceed to next section
 */

export default class Maim extends List {
    progressButton = [];

    async getData(parameters) {
        throw new Error('Implement getData function');
    }

    /**
     * todo: to be deleted?
     * @param data
     * @returns {Promise<void>}
     */
    async createExtraActionNextStep(data) {
        const progressItems = [];
        for (const item of data.results) {
            const { ProgressStore} = this.context.rootStore;
            await ProgressStore.retrieveProgress(item.id);
        }

        if (progressItems.length > 0) {
            runInAction(() => {
                this.list = data;
            })
        }

    }

    /**
     * delete requested record
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        throw new Error('Implement delete function');
    }

    /**
     * proceed to next section and recorded to db
     * @param id
     * @param url
     * @param step
     * @returns {Promise<void>}
     */
    async nextStep(id, url, step = 1) {
        const progress = await this.context.rootStore.ProgressStore.lastProgressStep(id);

        if (!progress) {
            await this.context.rootStore.ProgressStore.setProgressSection(id,  step)
        }
        this.props.history.push(url);
    }


    /**
     * add extra action for each record in a datatable list items
     * the current one show the button when the user can proceed to the next section
     * @param record
     */
    actions(record) {
        const {config, ProgressStore, UIStore} = this.context.rootStore;
        const last = ProgressStore.lastProgressStep(record.id);
        //const last = progress.shift();
        let currentStep = config.Sections["PhaseOne"].filter(section => section.id === last);

        if (currentStep.length === 0) {
            currentStep = config.Sections["PhaseTwo"].filter(section => section.id === last);
        }
        if (currentStep.length === 0) {
            currentStep = config.Sections["PhaseOne"].filter(section => section.id === 1);
        }
        UIStore.setAppIdFromRecord(record);

        if (currentStep.length > 0 && currentStep[0]['id'] === 11) {
            currentStep = config.Sections["Assessment"];
        }

        return <div>
            {currentStep.length && <button className="btn btn-info" onClick={() => {
                this.nextStep(record.id, currentStep[0].url.replace('id', record.id), 1)
            }}>
                {gettext('Proceed to')} {currentStep[0]['label']}
            </button>}
        </div>
    }


    /**
     * header for the current section
     * @returns {JSX.Element}
     */
    header() {
        return <>
            <div className="row height-sections">
                <div className="col-10 mt-5">
                    <h2></h2>
                </div>
                <div className="col-2 mt-5">
                    <NavLink activeClassName="selected" to="/main/create">
                        <button className="btn btn-success">{gettext('Create new')}</button>
                    </NavLink>
                </div>
            </div>
        </>
    }

    /**
     * retrieve config for the current section
     * @returns {AppNAme|{datatable: {PageSize: number, fields: [{name: string, width: string, type: string}, {name: string, width: string, type: string}, {name: string, width: string, type: string}, {name: string, width: string, type: string}], labels: string[]}}|{datatable: {PageSize: number, fields: [{name: string, width: string, type: string}, {name: string, width: string, type: string}, {name: string, width: string, type: string}, {name: string, width: string, type: string}], labels: string[]}}|*}
     */
    getConfig() {
        const {app_name} = this.context.rootStore.config;
        return super.getConfig()[app_name];
    }
}