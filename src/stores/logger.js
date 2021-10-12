export default class Logger {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.error = this.error.bind(this);
    }

    async init() {
    }

    async error(error) {
        await this.rootStore.CsStore.errorLogger(error)
    }

    info(info) {
        console.log({info})
    }

    warning(warning) {
        console.log({warning})
    }


}