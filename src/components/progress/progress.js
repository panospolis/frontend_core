import React, {Component} from "react";
import {withRouter} from "react-router";
import {StoreContext} from "../../context/Store";
import {observer} from "mobx-react";
import {makeObservable, observable, runInAction} from "mobx";
import PropTypes from "prop-types";
import WizardMenu from "../menus/wizardMenu";
import TopMenu from "../menus/topMenu";

/**
 * Class to wrap each section and check if the user have "permissions" to see it
 * the main purpose is to check if the previous steps are completed in order to open the requested one
 */
@withRouter
@observer
export default class Progress extends Component {
    static contextType = StoreContext
    show = false;
    sageId = null;

    constructor(props) {
        super(props);
        makeObservable(this, {
            show: observable,
            sageId: observable
        });
    }

    /**
     * check if sage id is setted to UIStore and if is now set it
     * and retrieve it
     * @returns {Promise<void>}
     */
    async retrieveSageId() {
        const {id} = this.props.match.params;
        const {UIStore} = this.context.rootStore;
        const sageId = await UIStore.setSageId(id);

        if (sageId) {
            runInAction(() => {
                this.show = true;
                this.sageId = sageId;
            })
        }
    }

    async componentDidMount() {
        await this.retrieveSageId();
    }

    /**
     * show section only if sage id exist and step is valid
     * @returns {Promise<boolean>}
     */
    showBody() {
        const {ProgressStore, UIStore} = this.context.rootStore;
        let id = UIStore.getSageId();

        const access = ProgressStore.permissionForCurrentSection(id, this.props.step);

        return access;
    }

    render() {
        if (!this.show || !this.sageId) {
            return null;
        }

        const stepTwo = this.props.step > 5;

        return <div className="container">
            <TopMenu></TopMenu>
            <WizardMenu step={this.props.step} phaseTwo={stepTwo}></WizardMenu>
            <div className="row">
                {this.showBody() && this.props.children}
            </div>
        </div>

    }
}

Progress.propTypes =
    {
        step: PropTypes.number
    }