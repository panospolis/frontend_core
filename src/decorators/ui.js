import React from "react";
import {Spinner} from "../components/ui/spinner";

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
             if(this.rootStore.UIStore.modalIsActive()) {
                 this.rootStore.UIStore.closeModal();
             }
            clearTimeout(modal)
        }
        return result;
    }
    return descriptor;
}
