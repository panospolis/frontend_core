import {makeObservable, observable, runInAction} from "mobx";
import React from "react";
import ErrorModal from "../components/ui/modals/errorModal";

export default class UIStore {
    language = null;
    closeModalTimeout = null;
    app = {
        id: null,
        language: null
    };
    triggerModal = false;
    modal = {
        body: null,
        type: null,
        onClose: () => {
        }
    };
    formik = {};
    months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }


    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this, {
            triggerModal: observable
        })

        this.toggleModal = this.toggleModal.bind(this);
    }

    clearModalTimeout() {
        clearTimeout(this.closeModalTimeout)
    }

    setModalTimeout() {
        this.closeModalTimeout = setTimeout(() => {
            if (this.modalIsActive()) {
                this.closeModal();
                this.sModal(<ErrorModal
                    message={gettext('Something went wrong!\nIt seems that the request takes so long.Please close the modal and try again.\nIf the problem persists please download the error logs and send them to email')}/>)
            }
        }, 60 * 10 * 100)
    }

    sModal(modal, type = '', styles = '', onClose = () => {}) {
        if(this.modal.type !== "error") {
            if (this.modal.body) {
                this.closeModal();
            }
            this.modal.body = modal;
            this.modal.type = type;
            this.modal.styles = styles;
            this.modal.onClose = onClose;
            runInAction(() => {
                this.triggerModal = true;
            });
        }
    }

    isModalForm(){
        return this.modal.type === 'form';
    }

    modalIsActive() {
        return this.triggerModal;
    }

    closeModal() {
        runInAction(() => {
            this.triggerModal = false;
        });

        this.modal.body = null;
        this.modal.type = null;
        this.clearModalTimeout();
    }

    toggleModal() {
        runInAction(() => {
            this.triggerModal = !this.triggerModal;
        });

        if (!this.triggerModal) {
            this.modal.body = null;
            this.modal.type = null;
        }
    }

    async init() {
        const language = await this.rootStore.CsStore.getLanguage();
        if (language) {
            this.setLanguage(language.language);
        }
    }

    setLanguage(lang) {
        this.language = lang;
    }

    getLanguage() {
        return this.language;
    }

    setAppIdFromRecord(record) {
        this.app.id = record.id;
        this.app.language = record.language;
    }

    async setAppId(id) {
        if (this.app.id === null || (this.app.id && this.app.id !== id)) {
            const model = await this.rootStore.CsStore.getAppDataById(id)
            if (model) {
                this.app.id = model.id;
                this.app.language = model.language;
                return this.app.id
            }
        } else {
            return this.getAppId();
        }
    }

    getAppId() {
        return this.app.id;
    }

    getAppLanguageId() {
        return this.app.language;
    }


    roundByTwo(value){
        return Math.round(value * 100) / 100;
    }


    dev(arr) {
        // Creating the mean with Array.reduce
        let mean = arr.reduce((acc, curr) => {
            return acc + curr
        }, 0) / arr.length;

        // Assigning (value - mean) ^ 2 to every array item
        arr = arr.map((k) => {
            return (k - mean) ** 2
        })

        // Calculating the sum of updated array
        let sum = arr.reduce((acc, curr) => acc + curr, 0);

        // Calculating the variance
        let variance = sum / arr.length

        // Returning the Standered deviation
        return Math.sqrt(sum / arr.length)
    }

    goToNextSection(path, history){
        history.push(path[0].url.replace('id',this.app.id))
    }



}