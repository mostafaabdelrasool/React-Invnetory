const initialState = {
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
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UDATE_ORDER':
            return action.payload;
        case 'CLEAR_ORDER':
            return initialState
        case 'UPDATE_ORDER_ITEM':
            return calculateTotal(action.payload);
        case 'REMOVE_ORDER_ITEM':
            return removeOrderItem({ ...state }, action.payload);
        default:
            break;
    }
    return state;
};
export default orderReducer;