import { Component } from 'react'
import { connect } from 'react-redux';
import * as productActions from "./redux/product.action";
import RenderProductSize from "./jsx/product.sizes.ui"
class ProductSizesComponent extends Component {
    state = { data: [] }
    addItem() {
        let data = [...this.state.data];
        if (data) {
            data.push({
                productId: this.props.productId,
                size: '',
                dimensions: '',
                unitInStock: 0,
                barcode: this.generateBarcode(),
            });
            this.setState({ data });
        }
    }
    handleChange(event, item, index) {
        const { name, value } = event.target;
        let data = [...this.state.data];
        data[index][name] = value;
        this.setState({ data });
    }
    deleteItem(id) {
        let model = [...this.state.data];
        const index = model.findIndex(m => m.id === id);
        model.splice(index, 1);
        this.setState({ data: model });
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    generateBarcode() {
        return Math.floor(10000 + Math.random() * 99999);
    }
    getData(){
       return this.state.data
    }
    render() {
       return RenderProductSize.call(this)
    }
}
const mapDispatchToProps = {
    AddProductSizeAction: productActions.AddProductSizeAction,
    UpdateProductSizeAction: productActions.UpdateProductSizeAction,
    DeleteProductSizeAction: productActions.DeleteProductSizeAction,
}
const mapStateToProps = (state) => {
    return { data: state.product }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductSizesComponent)
