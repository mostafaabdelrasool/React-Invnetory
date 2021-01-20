import  { Component } from "react";
import OrderDataService from "./order.data.service";
import castAllDates from "../common/data/cast.all.dates";
import debounce from "../common/data/debounce";
import { connect } from 'react-redux';
import * as orderAtions from './redux/order.action'
import RenderOrderEdit from "./jsx/order.edit.ui";
  
class OrderEdit extends Component {
  state = {
    isLoading: false,
    customers: [],
    showPay: false,
    showCustomer: false
  };

  dataServ = new OrderDataService("Order");
  componentDidMount() {
    this.setState({ initialData: { ...this.props.order } });
    var urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      this.dataServ.getById(id).then(x => {
        castAllDates(x)
        x.customer = this.mapCustomer(x.customer);
        x.orderDetails.forEach(x => {
          x.product = OrderDataService.mapProduct(x.product);
        })
        this.props.orderUpdate(x);
      })
    } else {
      const newOrderNo = this.dataServ.getNewOrderNumber();
      this.props.createNewOrderNumber(newOrderNo);
    }
  }
  searchCustomerDebounce = debounce((inputValue, callBack) => {
    this.dataServ.searchCustomers(inputValue).then((data) => {
      if (callBack) {
        callBack(data);
      }
    });
  }, 300)
  promiseOptions = inputValue => {
    if (!inputValue) {
      return
    }
   return new Promise(resolve => {
      this.searchCustomerDebounce(inputValue, (data) => {
        resolve(
          data.map(v => this.mapCustomer(v))
        );
      })
    })
  };
  mapCustomer(customer) {
    return {
      value: customer.id,
      label: customer.companyName,
      address: customer.address,
      city: customer.city,
      phone: customer.phone,
      id: customer.id
    };
  }
  handleChange(event) {
    const { name, value } = event.target;
    let data = { ...this.props.order, [name]: value };
    this.props.orderUpdate(data);
  }
  handleDateChane(value, model) {
    let data = { ...this.props.order, [model]: value };
    this.props.orderUpdate(data);
  }
  handleCustomerChange(value) {
    let data = { ...this.props.order };
    data.shipAddress = value.address;
    data.shipCity = value.city;
    data.phone = value.phone;
    data.customerId = value.value;
    data.customer = value;
    this.props.orderUpdate(data);
  }
  save() {
    let data = { ...this.props.order };
    data.shipStatus = 2;
    if (!data.id) {
      this.dataServ.saveOrder(data).then(c => {
        this.props.clearOrder();
      });
    } else {
      this.dataServ.updateOrder(data);
    }
  }
  handleFreightChange(event) {
    const { value } = event.target;
    let data = { ...this.props.order, freight: +value };
    data.overallTotal = data.total + data.freight
    this.props.orderUpdate(data);
  }
  pay() {
    let { showPay } = { ...this.state }
    showPay = !showPay;
    this.setState({ showPay: showPay });
  }
  closeModal = () => {
    this.setState({ showPay: false, showCustomer: false });
  };
  openCustomerPopup() {
    this.setState({ showCustomer: true });
  }
  getSavedCutomer = (customer) => {
    const mapped = this.mapCustomer(customer);
    this.props.setCustomer(mapped);
    this.setState({ showCustomer: false });
  }
  render() {
    return RenderOrderEdit.call(this);
  }
}
const mapStateToProps = (state) => {
  return { order: state.order }
}

const mapDispatchToProps = {
  updateItemAction: orderAtions.updateItemAction,
  newItemAcion: orderAtions.newItemAcion,
  orderUpdate: orderAtions.orderUpdate,
  clearOrder: orderAtions.clearOrder,
  createNewOrderNumber: orderAtions.createNewOrderNumber,
  setCustomer: orderAtions.setCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEdit)
