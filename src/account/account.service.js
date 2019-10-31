import DataService from "../common/data/data.api";
import axios from "axios";

export default class AccountDataService extends DataService {
    login(credentials) {
        return this.createPromise(axios.post(this.url + `Account/Login`,credentials));
    }
}