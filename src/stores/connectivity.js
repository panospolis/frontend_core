import InformationModal from "../components/ui/modals/informationModal";
import React from "react";

export default class ConnectivityStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.isConnected = this.isConnected.bind(this)
    }

    isConnected() {
        return window.navigator.onLine;
    }

    checkConnectivity() {
        const messageOffline = gettext("Please check your connection! No connection to the internet found. <br/><div style=\"color: red\"><strong>You are offline</strong></div>");
        const messageOnline = gettext("Connection to the internet found. <br/><div style=\"color: green\"><strong>You are online</strong></div>");

        window.addEventListener('offline', () => {
            this.rootStore.UIStore.sModal(<InformationModal title={gettext('Connectivity Status')} data={<div
                dangerouslySetInnerHTML={{__html: messageOffline}}/>}/>);
        });

        window.addEventListener('online', (e) => {
            this.rootStore.UIStore.sModal(<InformationModal title={gettext('Connectivity Status')} data={<div
                dangerouslySetInnerHTML={{__html: messageOnline}}/>}/>);
        });
    }

    async init() {
        this.checkConnectivity();
    }
}