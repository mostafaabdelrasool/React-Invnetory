import DataService from "../common/data/data.api";
import axios from "axios";

export default class OrderDataService extends DataService {
    static order = {};
    searchCustomers(query) {
        return this.createPromise(axios.post(this.url + `Customer/Search?q=${query}`));
    }
    searchProduct(query) {
        return this.createPromise(axios.post(this.url + `Product/Search?q=${query}`));
    }
    static updateOrder(order) {
        OrderDataService.order = order;
    }
    static getOrder() {
        return OrderDataService.order;
    }
    updateOrderStatus(order) {
        return this.createPromise(axios.put(this.url + `Order/PartialUpdate?properties=ShipStatus`, order));
    }
    deleteItem(item) {
        return this.createPromise(axios.put(this.url + `Order/DeleteOrderItem`, item));
    }
    static mapProduct(product) {
        return {
            value: product.id,
            label: product.productName,
            unitPrice: product.unitPrice,
            unitsInStock: product.unitsInStock,
            image: product.image,
            productSizes: product.productSizes,
            discount: product.discount
        };
    }
}
