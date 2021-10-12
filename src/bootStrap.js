import {CsStore, UIStore, Logger, ProgressStore, DataStore, Charts} from './stores'
import RootStore from './stores/root';
import {config} from "./config/config";


const bootStrap = new RootStore(config);
bootStrap.setStores({CsStore, UIStore, Logger, ProgressStore, DataStore, Charts});
window.stores = bootStrap;
export {bootStrap}