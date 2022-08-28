import {Charts, ConnectivityStore, CsStore, DataStore, Logger, ProgressStore, UIStore} from './stores'
import RootStore from './stores/root';
import {coreConfig} from "./config/config";


const bootStrap = new RootStore(coreConfig);
bootStrap.setStores({CsStore, UIStore, Logger, ProgressStore, DataStore, Charts, ConnectivityStore});
window.stores = bootStrap;
export {bootStrap}