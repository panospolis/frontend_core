export default class DataStore {
    guidance = [];


    constructor(rootStore) {
        this.rootStore = rootStore;

    }

    async init() {
        for (const lang of this.rootStore.config.languages) {

            const getGuidance = await this.rootStore.CsStore.getGuidance(lang[0]);
            this.setDataGuidance(lang[0], getGuidance.results);
        }
    }

    getDataGuidance(lang) {
        return this.guidance[lang] ?? null;
    }

    setDataGuidance(lang, data) {
        this.guidance[lang] = data
    }
}