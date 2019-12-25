const calculateTotal = (state) => {
    state.total = 0;
    state.orderDetails.forEach(x => {
        calulateItem(x);
        state.total += x.total;
    })
    state.overallTotal = state.total + state.freight;
    return state;
}
const calulateItem = (item) => {
    item.total = (+item.quantity * item.unitPrice);
    if (+item.discount > 0) {
        item.total = item.total - (item.total * (+item.discount / 100))
    }
}
const removeOrderItem = (state, item) => {
    const index = state.orderDetails.indexOf(item);
    state.orderDetails.splice(index, 1);
    return calculateTotal(state);
}
const addOrderItem = (state, item) => {
    let orderDetail = {};
    orderDetail.productId = item.value;
    orderDetail.unitPrice = item.unitPrice;
    orderDetail.quantity = 1;
    orderDetail.unitsInStock = item.unitsInStock;
    orderDetail.image = item.image;
    orderDetail.discount = 0;
    orderDetail.product = item;
    orderDetail.discount = item.discount;
    orderDetail.total = (+orderDetail.quantity * orderDetail.unitPrice);
    if (+orderDetail.discount > 0) {
        orderDetail.total = orderDetail.total - (orderDetail.total * (+orderDetail.discount / 100))
    }
    state.orderDetails[item.index] = orderDetail;
    return calculateTotal(state);
}
const createOrderNumber = (state, orderNumber) => {
    state.orderNumber = orderNumber;
    return state;
}
const changeProductSize = (state, size) => {
    state.orderDetails[size.orderDetailIndex].productSizeId = size.id;
    state.orderDetails[size.orderDetailIndex].productSize = size;
    return state;
}
const setCutomerToOrder = (state, customer) => {
    state.customerId = customer.id;
    state.customer = customer;
    state.phone = customer.phone;
    return state;
}
const orderReducer = (state, action) => {
    switch (action.type) {
        case 'UDATE_ORDER':
            return action.payload;
        case 'CLEAR_ORDER':
            return {
                shipAddress: "",
                shipCity: "",
                phone: "",
                orderDetails: [],
                customerId: null,
                total: 0,
                freight: 0,
                overallTotal: 0,
                orderDate: new Date()
            }
        case 'UPDATE_ORDER_ITEM':
            return calculateTotal(action.payload);
        case 'REMOVE_ORDER_ITEM':
            return removeOrderItem({ ...state }, action.payload);
        case 'ADD_ORDER_ITEM':
            return addOrderItem({ ...state }, action.payload);
        case 'CREATE_NEW_ORDER_NUMBER':
            return createOrderNumber({ ...state }, action.payload);
        case 'CHANGE_PRODUCT_SIZE':
            return changeProductSize({ ...state }, action.payload);
        case 'SET_CUSTOMER':
            return setCutomerToOrder({ ...state }, action.payload);
        default:
            return {
                shipAddress: "",
                shipCity: "",
                phone: "",
                orderDetails: [],
                customerId: null,
                total: 0,
                freight: 0,
                overallTotal: 0,
                orderDate: new Date()
            }
    }
};
export default orderReducer;