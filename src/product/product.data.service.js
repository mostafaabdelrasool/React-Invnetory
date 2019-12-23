import DataService from "../common/data/data.api";
import axios from "axios";

export default class ProductDataService extends DataService {
    constructor(controller){
        super(controller);
        this.url+="Product/"
    }
    getProductSizes(productId) {
        return this.createPromise(axios.get(this.url + `ProductSizes/GetProductSizes?id=${productId}`));
    }
}
