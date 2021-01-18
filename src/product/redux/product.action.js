import * as actionType from './action.type';
export const AddProductAction = product => {
    return {
        type: actionType.ADD_PRODUCT,
        payload: product
    }
}
export const AddProductSizeAction = productSize => {
    return {
        type: actionType.ADD_PRODUCT_SIZE,
        payload: productSize
    }
}
export const UpdateProductAction = product => {
    return {
        type: actionType.UPDATE_PRODUCT,
        payload: product
    }
}
export const DeleteProductAction = product => {
    return {
        type: actionType.DELETE_PRODUCT,
        payload: product
    }
}
export const UpdateProductSizeAction = product => {
    return {
        type: actionType.Update_PRODUCT_SIZE,
        payload: product
    }
}
export const DeleteProductSizeAction = product => {
    return {
        type: actionType.DELETE_PRODUCT_SIZE,
        payload: product
    }
}
export const ListProductActions = products => {
    return {
        type: actionType.LIST_PRODUCTS,
        payload: products
    }
}
export default AddProductAction | AddProductSizeAction | UpdateProductAction | DeleteProductAction | UpdateProductSizeAction | DeleteProductSizeAction | ListProductActions