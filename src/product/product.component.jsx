import { Component } from "react";
import ProductDataService from "./product.data.service";
import { connect } from 'react-redux';
import * as productActions from "./redux/product.action";
import store from "../redux/store";
import RenderProduct from './jsx/product.ui'

class ProductComponent extends Component {
  state = {
    data: [],
    showEditPopup: false,
    currentModel: {}
  };
  constructor(props) {
    super(props)
    // subscribe to our store
    store.subscribe(() => {
      // set the result to component state
      const storeState = store.getState();
      this.setState({ data: storeState.product, showEditPopup: false })
    })
  }
  dataService = new ProductDataService("Product");
  componentDidMount() {
    this.dataService.get().then(res => {
      this.props.ListProductActions(res)
      //this.setState({ data: res });
    });
  }
  showEditPopup(model) {
    this.setState({ showEditPopup: true, currentModel: model });
  }
  saveData = data => {
    this.dataService.update(data).then(res => {
      let models = [...this.state.data];
      const index = models.findIndex(x => {
        return data.id === x.id;
      });
      models[index] = data;
      this.setState({ data: models, showEditPopup: false });
    });
  };
  addItem = data => {
    this.dataService.add(data).then(res => {
      let model = [...this.state.data];
      model.push(res);
      this.setState({ data: model, showEditPopup: false });
    });
  };
  closeModal = () => {
    this.setState({ showEditPopup: false });
  };
  deleteItem(id) {
    this.dataService.delete(id).then(res => {
      let model = [...this.state.data];
      const index = model.findIndex(m => m.id === id);
      model.splice(index, 1);
      this.setState({ data: model, showEditPopup: false });
    });
  }
  showChildItems(index) {
    let products = [...this.state.data]
    if (!products[index].showChild) {
      products[index].showChild = true;
      this.dataService.getProductSizes(products[index].id).then(x => {
        products[index].productSizes = x;
        this.setState({ data: products });
      });
    } else {
      products[index].showChild = false;
      this.setState({ data: products });
    }
  }

  render() {
    return RenderProduct.call(this)
  }
}
const mapDispatchToProps = {
  ListProductActions: productActions.ListProductActions,
}
const mapStateToProps = (state) => {
  return { data: state.product }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent)
