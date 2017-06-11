import Store from "middle-core/lib/store";
import {project} from "../constants/config";

export default class StoreBase extends Store {
    static meta = {
        ...Store.meta,
        namespace: project.name
    }
}