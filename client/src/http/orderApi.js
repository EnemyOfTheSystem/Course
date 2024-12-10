import { $authHost, $host } from "./index";

export const createOrder = async (order) => {
    const { data } = await $authHost.post('api/order', order)
    return data
}

export const updateOrder = async (order) => {
    const { data } = await $authHost.put('api/order', order)
    return data
}

export const getUserOrders = async (userId) => {
    const { data } = await $host.get('api/order', { params: { userId } })
    return data
}

export const getSpecificOrder = async (userId, propertyId) => {
    const { data } = await $host.get('api/order', { params: { userId, propertyId } })
    return data
}

export const getAllOrders = async () => {
    const { data } = await $authHost.get('api/order')
    return data
}

export const deleteOrder = async (id) => {
    const { data } = await $authHost.delete('api/order/' + id)
    return data
}
