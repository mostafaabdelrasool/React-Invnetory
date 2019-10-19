import DataService from "../common/data/data.api";
import axios from "axios";

export default class OrderDataService extends DataService {
    static order = {
        shipAddress: "",
        shipCity: "",
        phone: ""
    };
    searchCustomers(query) {
        return this.createPromise(axios.post(this.url + `Customer/Search?q=${query}`));
    }
    searchProduct(query) {
        return this.createPromise(axios.post(this.url + `Product/Search?q=${query}`));
    }
    static updateOrder(order) {
        OrderDataService.order = order;
    }
    static getOrder(){
        return OrderDataService.order;
    }
}
