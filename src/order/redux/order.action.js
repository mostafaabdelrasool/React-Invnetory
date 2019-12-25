export const newItemAcion = orderItem => {
    return {
        type: 'ADD_NEW_ORDER_ITEM',
        payload: orderItem
    }
}
export const updateItemAction = orderItem => {
    return {
        type: 'UPDATE_ORDER_ITEM',
        payload: orderItem
    }
}
export const orderUpdate = order => {
    return {
        type: 'UDATE_ORDER',
        payload: order
    }
}
export const clearOrder = order => {
    return {
        type: 'CLEAR_ORDER',
        payload: {}
    }
}
export const removeOrderItem = orderItem => {
    return {
        type: 'REMOVE_ORDER_ITEM',
        payload: orderItem
    }
}
export const addOrderItem = orderItem => {
    return {
        type: 'ADD_ORDER_ITEM',
        payload: orderItem
    }
}
export const createNewOrderNumber = orderNumber => {
    return {
        type: 'CREATE_NEW_ORDER_NUMBER',
        payload: orderNumber
    }
}
export const changeProductSize = size => {
    return {
        type: 'CHANGE_PRODUCT_SIZE',
        payload: size
    }
}
export const setCustomer = customer => {
    return {
        type: 'SET_CUSTOMER',
        payload: customer
    }
}
export default newItemAcion | updateItemAction | orderUpdate | clearOrder |
    removeOrderItem | addOrderItem | createNewOrderNumber | changeProductSize | setCustomer;