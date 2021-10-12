export default class RootStore {
    stores = null;
    config = null;

    constructor(config) {
        this.config = config;
    }

    setStores(stores){
        this.stores = stores;
        window.rootStore = this;
    }

    async init() {
        for (const store of Object.entries(this.stores)) {
            this[store[0]] = new store[1](this);
            await this[store[0]].init();
        }
    }

}