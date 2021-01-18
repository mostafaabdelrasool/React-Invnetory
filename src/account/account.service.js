import DataService from "../common/data/data.api";
import axios from "axios";

export default class AccountDataService extends DataService {
    controllerUrl="Account";
    login(credentials) {
        return this.createPromise(axios.post(`${this.url}${this.controllerUrl}/Login`,credentials));
    }
    register(credentials) {
        return this.createPromise(axios.post(`${this.url}${this.controllerUrl}/Register`,credentials));
    }
}