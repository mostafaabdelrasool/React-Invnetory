import DataService from "../common/data/data.api";
import axios from "axios";

export default class OrderDataService extends DataService {
    searchCustomers(query) {
        var filter = [{ columnName: "CompanyName", Operator: "=", value: query },
        { columnName: "CompanyName", Operator: "=", value: query }];
        return this.createPromise(axios.post(this.url + `Customer/Search`, filter));
    }
    searchProduct(query) {
        return this.createPromise(axios.get(this.url + `Product/SearchProduct?q=${query}`));
    }
    updateOrderStatus(order) {
        return this.createPromise(axios.put(this.url + `Order/PartialUpdate?properties=ShipStatus`, order));
    }
    deleteItem(item) {
        return this.createPromise(axios.put(this.url + `Order/DeleteOrderItem`, item));
    }
    saveOrder(item) {
        return this.createPromise(axios.post(this.url + `Order/Post`, item));
    }
    updateOrder(item) {
        return this.createPromise(axios.put(this.url + `Order/Put `, item));
    }
    getNewOrderNumber() {
        let now = Date.now().toString() // '1492341545873'
        // pad with extra random digit
        now += now + Math.floor(Math.random() * 10)
        // format
        const newNumber = [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-');
        return newNumber;

    }
    validateStock(productId, amount) {
        return this.createPromise(axios.get(this.urlCopy + this.productUrl + `Product/ValidateStock?productId=${productId}&amount=${amount}`));
    }
    static mapProduct(product) {
        return {
            value: product.id,
            label: product.productCode,
            name: product.productName,
            unitPrice: product.unitPrice,
            unitsInStock: product.unitsInStock,
            productSizeId: product.productSizeId,
            discount: product.discount,
            id: product.id,
            productName: product.productName,
            size: product.size,
            productCode: product.productCode
        };
    }
}
