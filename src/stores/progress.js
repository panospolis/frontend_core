import {action, makeObservable, observable, runInAction} from "mobx";

export default class ProgressStore {
    progress = {};
    current = {};

    constructor(rootStore) {
        this.rootStore = rootStore;

        this.updateModalProgress = this.updateModalProgress.bind(this);
        makeObservable(this, {
            progress: observable
        });
    }

    async init() {
        await this.getAllProgressData();
    }

    /**
     * get sage id progress records
     * @param id
     * @returns {*}
     */
    getProgressPerSection(id) {
        return this.progress[id];
    }

    setEnabledProgress(id, section) {
        const progress = this.progress[id].filter(pro => parseInt(pro.section) === parseInt(section))
        this.current = progress?.[0];
    }

    getEnabledProgress() {
        return this.current;
    }


    /**
     *
     * @returns {*}
     */
    retrieveLastProgressSection(id, section) {
        const progress = this.getProgressPerSection(id)
        return parseInt(progress[progress.length - 1]?.section) === parseInt(section);
    }

    /**
     * check if current section can be shown
     * @param id
     * @param section
     * @returns {*}
     */
    permissionForCurrentSection(id, section) {
        const progress = this.getProgressPerSection(id)
        return progress?.some(pro => ((pro.section === section) || (pro.section > 8 && section > 8)));
    }

    /**
     * store next section and update the list of progress steps to use it in the app
     * @param sage
     * @param section
     * @param sub_section
     * @returns {Promise<*>}
     */
    async setProgressSection(item, section, sub_section = null) {
        const progress = this.getProgressPerSection(item);

        const some = progress?.some(pro => {
                let exist = false;
                if (parseInt(pro.section) === parseInt(section)) {
                    exist = true;
                }

                if (sub_section && exist) {
                    exist = false;
                    if (sub_section == parseInt(pro.sub_section)) {
                        exist = true;
                    }
                }
                return exist;
            }
        ) || false;

        if (!progress || (progress && !some)) {
            const result = await this.rootStore.CsStore.addProgressStep({
                'app': item,
                'section': section,
                'sub_section': sub_section
            })

            if (result && result.data.app == item) {
                if (result && result.data.app == item) {
                    const {section, sub_section, id, modal} = result.data;
                    runInAction(() => {
                        if (!this.progress[item]) {
                            this.progress[item] = [];
                        }
                        this.progress[item].push({
                            section: parseInt(section),
                            sub_section,
                            modal
                        });
                    })
                }
            }
        }
        return this.progress[item];
    }

    removeProgressSection(id) {
        runInAction(() => {
            this.progress[id] = null;
        })
    }

    /**
     * get progress
     * @param id
     * @returns {Promise<{}|null|*>}
     */
    async retrieveProgress(id) {
        const progressPerSection = this.getProgressPerSection(id);
        if (!progressPerSection) {
            const progress = await this.rootStore.CsStore.getProgress(id)
            if (progress.results.length > 0) {
                return this.setProgressToArray(progress.results)
            } else {
                return null;
            }
        }
        return progressPerSection;
    }

    /**
     * convert progress records to array
     * @param progress
     * @returns {{}}
     */
    @action
    setProgressToArray(progress) {
        for (const pro of progress) {
            const section = parseInt(pro.section);
            const id = parseInt(pro.app);
            const sub_section = pro.sub_section;
            const {modal} = pro;

            if (this.progress[id]) {
                this.progress[id].push({section: section, sub_section, modal})
            } else {
                this.progress[id] = [{section: section, sub_section, modal}]
            }
        }

        return this.progress;
    }

    async deleteProgress(progress_id) {
        const appId = this.rootStore.UIStore.getAppId();
        const last = this.lastProgressStep(appId)
        if (last > progress_id) {
            await this.rootStore.CsStore.deleteProgress(appId, this.sectionId);
            console.log('stop')
        }
    }

    /**
     * get all progress records
     * @returns Array
     */
    async getAllProgressData() {
        const progress = await this.rootStore.CsStore.getAllProgress();
        if (progress.count > 0) {
            if (progress.results.length > 0) {
                return this.setProgressToArray(progress.results)
            }
        }
        return null;
    }

    async updateModalProgress(value) {
        const progress = this.getEnabledProgress()
        const response = await this.rootStore.CsStore.updateProgressStep(progress.id, {"modal": value});
        this.progress[response.data.app] = this.progress[response.data.app].map(pro => {
            if (pro.section === parseInt(response.data.section)) {
                pro.modal = response.data.modal;
            }

            return pro;
        });
        this.setEnabledProgress(parseInt(response.data.app), parseInt(response.data.section))
    }

    async updateProgress(id, section) {
        await this.rootStore.CsStore.updateProgress(id, section)
    }

    /**
     * get last progress by sage id
     * @param id
     * @returns {number}
     */
    lastProgressStep(id) {
        const data = this.getProgressPerSection(id);
        if (data) {
            const maxStep = data.reduce((prev, current) => (prev.section > current.section) ? prev : current);
            return parseInt(maxStep.section);
        }
        return 0;
    }

    async progressNextStep(id, parameters, history) {
        const progress = this.rootStore.ProgressStore.getProgressPerSection(id);
        if (!progress || (progress && !progress.some(pro => parseInt(pro.section) === parseInt(parameters.id)))) {
            const success = await this.setProgressSection(id, parameters.id, parameters?.subSection);
            if (success) {
                history.push(parameters.url.replace('id', id));
            }
        } else {
            history.push(parameters.url.replace('id', id));
        }
    }
}