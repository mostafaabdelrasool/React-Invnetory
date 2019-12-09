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
export default newItemAcion | updateItemAction | orderUpdate | clearOrder | removeOrderItem;