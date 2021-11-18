import React from "react";
import {Spinner} from "../components/ui/spinner";
import {runInAction} from "mobx";

export const permissionToAction = (target, key, descriptor) => {

    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        // const {ProgressStore, UIStore} = this.context.rootStore;
        // const valid = ProgressStore.retrieveLastProgressSection(UIStore.getSageId(), this.props?.sectionId || this.sectionId)
        // if(valid) {

        // }else{
        //     setTimeout(() => {
        //         UIStore.sModal(<ErrorModal message={"SHALL NOT PASS"} downloadLogs={false}/>)
        //     }, 500)
        //
        // }

        return await originalMethod.apply(this, args);
    }
    return descriptor;
}


export const loader = (target, key, descriptor) => {

    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        const modal = setTimeout(() => {
            this.rootStore.UIStore.sModal(<div className={"loader"}><Spinner/></div>)
            this.rootStore.UIStore.setModalTimeout();
        }, 500)

        const result = await originalMethod.apply(this, args);

        if (result) {
            if (this.rootStore.UIStore.modalIsActive()) {
                this.rootStore.UIStore.closeModal();
            }
            clearTimeout(modal)
        }
        return result;
    }
    return descriptor;
}

export const errorFormHandler = (target, key, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        let result = null;
        try {
            result = await originalMethod.apply(this, args);
        } catch (e) {
            const {Logger} = this.context.rootStore;
            let message = "";
            if (e.response.status === 400) {
                Object.entries(e.response.data).forEach((value) => {
                    message += this.labels[value[0]] + " : " + value[1] + "\n";
                });
            } else if ([500, 404].includes(e.response.status)) {
                message = gettext('Something went wrong please try again.');
            }
            runInAction(() => {
                this.errorMessageShow = message;
            })
            debugger;
            Logger.error({"message": message, "stack": `${e.response.status} statusText: ${e.response.statusText}`});
        }

        return result;
    }
    return descriptor;
}