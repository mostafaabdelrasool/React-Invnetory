import DataService from "../common/data/data.api";
import axios from "axios";

export default class OrderDataService extends DataService {
    searchCustomers(query) {
        return this.createPromise(axios.post(this.url + `Customer/Search?q=${query}`));
    }
    searchProduct(query) {
        return this.createPromise(axios.post(this.url + `Product/Search?q=${query}`));
    }
    updateOrderStatus(order) {
        return this.createPromise(axios.put(this.url + `Order/PartialUpdate?properties=ShipStatus`, order));
    }
    deleteItem(item) {
        return this.createPromise(axios.put(this.url + `Order/DeleteOrderItem`, item));
    }
    getNewOrderNumber() {
        let now = Date.now().toString() // '1492341545873'
        // pad with extra random digit
        now += now + Math.floor(Math.random() * 10)
        // format
        const newNumber = [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-');
        let data = { ...this.state.data }
        data.orderNumber = newNumber;

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
