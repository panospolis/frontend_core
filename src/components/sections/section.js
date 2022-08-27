import React from "react";
import {StoreContext} from "../../context/store";
import InformationBox from "../ui/informationBox";

export default class Section extends React.Component {
    static contextType = StoreContext
    sectionId = 0;
    nextSection = 0;
    // showNextSectionButton = false;

    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
        this.getSectionFromConfig = this.getSectionFromConfig.bind(this);
        this.completeTheStep = this.completeTheStep.bind(this);
        this.saveStep = this.saveStep.bind(this);
        this.checkProgress = this.checkProgress.bind(this);

        // makeObservable(this, {
        //     showNextSectionButton: observable
        // })
    }

    async componentDidMount() {
       // await this.completeTheStep()
    }

    getInfoText() {
        const language = this.context.rootStore.UIStore.getLanguage()
        return this.context.rootStore.config.sections.find(section => (section.section_id === this.sectionId && language === section.language))?.info ?? "";
    }

    async completeTheStep(params = {}) {
        const {UIStore} = this.context.rootStore;
        const progress = this.checkProgress();

        if (!progress) {
            const success = await this.saveStep();
            if(success){
                UIStore.proceedToNextSection(this.nextSection, this.props.history)
            }
            //UIStore.sModal(<ConfirmationModal message={gettext("Proceed to next section?")} action={this.saveStep}></ConfirmationModal> )
        }else{

            UIStore.proceedToNextSection(this.nextSection, this.props.history)
        }

    }

    async saveStep() {
        const id = this.context.rootStore.UIStore.getAppId();
        return await this.context.rootStore.ProgressStore.setProgressSection(id, this.nextSection, null);
    }


    checkProgress() {
        const id = this.context.rootStore.UIStore.getAppId();
        const progressRecords = this.context.rootStore.ProgressStore.getProgressPerSection(id);

        const allSectionsCompleted = progressRecords?.some(record => record.section === this.nextSection)
        return allSectionsCompleted;
    }

    async nextStep(id, parameters, history) {
        return await this.context.rootStore.ProgressStore.progressNextStep(id, parameters, history)
    }

    getSectionFromConfig() {
        const {Sections} = this.context.rootStore.config;
        return Sections[this.sectionId];
    }

    guidance(visible = false) {
        return <InformationBox visible={visible} content={this.getInfoText()}/>
    }

    header() {
        return <>

        </>
    }

    render() {
        return null;
    }
}