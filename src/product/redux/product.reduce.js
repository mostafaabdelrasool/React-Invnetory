import * as actionType from './action.type';
const addProduct = (state, payload) => {
    return [...state, payload];
}
const addProductSize = (state, payload) => {
    let product = state.find(x=>x.id===payload.productId);
    if (product) {
        product.productSizes.push(payload);
    }
    return state;
}
const updateProduct = (state, payload) => {
    let product = state.find(payload);
    if (product !== null) {
        product = payload;
    }
    return state;
}
const deleteProduct = (state, payload) => {
    let index = state.indexOf(payload);
    if (index !== -1) {
        state.splice(index, 0)
    }
    return state;
}
const listProducts = (state, payload) => {
    state = payload;
    return state;
}
const productReducer = (state, action) => {
    switch (action.type) {
        case actionType.ADD_PRODUCT:
            return addProduct([...state], action.payload);
        case actionType.ADD_PRODUCT_SIZE:
            return addProductSize([ ...state], action.payload);
        case actionType.UPDATE_PRODUCT:
            return updateProduct({
                ...state
            }, action.payload);
        case actionType.DELETE_PRODUCT:
            return deleteProduct({
                ...state
            }, action.payload);
        case actionType.LIST_PRODUCTS:
            return listProducts({
                ...state
            }, action.payload);
        default:
            return [{
                productName: null,
                supplierId: null,
                categoryId: null,
                quantityPerUnit: null,
                unitPrice: null,
                unitsInStock: null,
                unitsOnOrder: null,
                reorderLevel: null,
                discontinued: false,
                id: null,
                productSizes: []
            }]
    }
};
export default productReducer;