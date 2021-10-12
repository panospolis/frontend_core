import React, {Component} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import RootStore from "./root";
import {loader, principles, baseSections, topPrinciples} from "../decorators/ui"
import ErrorModal from "../components/ui/modals/errorModal";
import qs from 'qs';

/**
 * class that is doing the communication to backend
 * alla data actions are send from here to backend
 */

export default class CsStore {
    url = null;
    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    async init() {
        this.url = this.rootStore.config.url;
        const config = await this.getConfig();
        if (config) {
            this.rootStore.config = {...this.rootStore.config, ...config};
        }
    }

    formHeaders() {
        const cookies = new Cookies();
        return {
            "X-CSRFToken": cookies.get("csrftoken")
        }
    }

    async onErrorThrowModal(e) {
        const {Logger, UIStore} = this.rootStore;
        UIStore.sModal(<ErrorModal message={'Something went wrong while retrieving data'}></ErrorModal>, "error");
        Logger.error({message: e.message, stack: e.stack});

        return null;
    }

    async getLanguage(lang = 'en') {
        const options = {
            method: 'POST',
            headers: {...this.formHeaders()},
            url: `${this.rootStore.config.app_name}/current/language/`
        };
        const language = await axios(options);

        return language.data;
    }

    async changeLanguage(lang = 'en') {
        let language = null;

        try {
            const options = {
                method: 'POST',
                headers: {...this.formHeaders()},
                data: qs.stringify({'language': lang}),
                url: `${this.rootStore.config.app_name}/i18n/setlang/`
            };
            language = await axios(options);

            if ([200, 201].includes(language.status)) {
                window.location.href = `/${this.rootStore.config.app_name}`;
            }
        } catch (e) {
            return this.onErrorThrowModal(e);
        }
        return language.data.results;
    }

    async openApp() {
        let data = null;

        try {
            const options = {
                method: 'GET',
                headers: {...this.formHeaders()},
                url: `/${this.rootStore.config.app_name}/open_app/`
            };
            data = await axios(options);

        } catch (e) {

        }
        return data;
    }

    async downloadErrorLoggerFile() {
        let logFile = null;

        try {
            const options = {
                method: 'POST',
                headers: {...this.formHeaders()},
                url: `/${this.rootStore.config.app_name}/api/logger/download/`
            };
            logFile = await axios(options);

        } catch (e) {

        }
        return logFile;
    }

    async errorLogger(parameters) {
        let errors = null;
        try {
            const options = {
                method: 'POST',
                headers: {...this.formHeaders()},
                data: qs.stringify(parameters),
                url: `${this.url}/logger/`
            };
            errors = await axios(options);

        } catch (e) {

        }
        return errors;
    }

    async getConfig() {
        let config = null;

        try {
            config = await axios.get(`${this.url}/config/`, {}, {
                headers: {
                    ...this.formHeaders()
                },
            });

        } catch (e) {
            return this.onErrorThrowModal(e);
        }
        return config.data;
    }

    /**
     *
     * @param parameters
     * @returns {Promise<null>}
     */
    @loader
    async addProgressStep(parameters = null) {
        let data = null;
        try {
            data = await axios.post(`${this.url}/progress/save/`, parameters, {

                headers: {
                    ...this.formHeaders(),
                },

            });
        } catch (e) {
            return this.onErrorThrowModal(e);
        }
        return data
    }

    /**
     *
     * @param id
     * @param progress_id
     * @returns {Promise<null>}
     */
    @loader
    async deleteProgress(id, progress_id) {
        let data = null;
        try {
            data = await axios.post(`${this.url}/${id}/progress/${progress_id}/delete/`, {},{
                headers: {
                    ...this.formHeaders(),
                },

            });
        } catch (e) {
            return this.onErrorThrowModal(e);
        }
        return data
    }

    /**
     *
     * @param id
     * @returns {Promise<null|null>}
     */
    @loader
    async getProgress(id) {
        let data = {data: null};
        try {
            data = await axios.get(`${this.url}/${id}/progress/`, {
                headers: {
                    ...this.formHeaders(),
                },
            });
        } catch (e) {
            return this.onErrorThrowModal(e);
        }

        return data.data
    }

    /**
     *
     * @returns {Promise<null|null>}
     */
    @loader
    async getAllProgress() {
        let data = {data: null};
        try {
            data = await axios.get(`${this.url}/progress/`, {
                headers: {
                    ...this.formHeaders(),
                },
            });
        } catch (e) {
            return this.onErrorThrowModal(e);
        }

        return data.data
    }
}