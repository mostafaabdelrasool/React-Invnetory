import DataService from "../common/data/data.api";
import axios from "axios";

export default class AccountDataService extends DataService {
    constructor(controller){
        super(controller);
        this.url+="Order/"
    }
    login(credentials) {
        return this.createPromise(axios.post(this.url + `Account/Login`,credentials));
    }
    register(credentials) {
        return this.createPromise(axios.post(this.url + `Account/Register`,credentials));
    }
}