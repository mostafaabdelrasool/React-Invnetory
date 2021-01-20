import  { Component } from 'react'
import DataService from "../common/data/data.api";
import { connect } from 'react-redux';
import * as productActions from "./redux/product.action";
import ProductDataService from "./product.data.service";
import store from "../redux/store";
import RenderProductEdit from './jsx/product.edit.ui';

class ProductEdit extends Component {

    state = {
        categories: [],
        data: {},
    }
    dataService = {};
    constructor(props) {
        super(props);
        this.dataService = new ProductDataService("Product");
    }
    getCurrentStateProduct() {
        if (this.props.id) {
            const storeState = store.getState();
            const currentProduct = storeState.product.find(x => x.id === this.props.id);
            this.setState({ data: currentProduct })
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        let data = { ...this.state.data, [name]: value };
        this.setState({ data });
    }
    handleSubmit() {
        let data = { ...this.state.data };
        data.productSizes = this.psComponent.getData();
        this.setState({ data })
        if (this.state.data.id) {
            this.updateItem(data);
        }
        else {
            this.addItem(data);
        };
    }
    updateItem = (data) => {
        this.dataService.update(data).then(res => {
            this.props.UpdateProductAction(data)
        });
    };
    addItem = (data) => {
        this.dataService.add(data).then(res => {
            this.props.AddProductAction(res)
        });
    };
    getCategories() {
        const dataServ = new DataService("Category");
        dataServ.get().then(d => {
            if (d && d.length > 0) {
                let data = { ...this.state.data };
                data.categoryId = d[0].id;
                this.setState({ categories: d, data: data });
            }
        });
    }
    componentDidMount() {
        this.getCategories();
        this.getCurrentStateProduct();
    }
    render() {
      return RenderProductEdit.call(this);
    }
}
const mapDispatchToProps = {
    AddProductAction: productActions.AddProductAction,
    UpdateProductAction: productActions.UpdateProductAction,
    DeleteProductAction: productActions.DeleteProductAction,
}
const mapStateToProps = (state) => {
    return { data: state.product }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)

