import { $authHost, $host } from "./index";

// Property
export const createProperty = async (property) => {
    const { data } = await $authHost.post('api/property', property)
    return data
}

export const getProperties = async (propertyTypeId, propertyPaymentTermId, page, limit, costMin, costMax, searchWord) => {
    const { data } = await $host.get('api/property', { params: { propertyTypeId, propertyPaymentTermId, page, limit, costMin, costMax, searchWord } })
    return data
}

export const getProperty = async (id) => {
    const { data } = await $host.get('api/property/' + id)
    return data
}

export const updateProperty = async (property) => {
    const { data } = await $authHost.put('api/property', property)
    return data
}

export const deleteProperty = async (id) => {
    const { data } = await $authHost.delete('api/property/' + id)
    return data
}

export const downloadPropertyReport = async (startDate, endDate, name) => {
    const { data } = await $host.get('api/property/report', { params: { startDate, endDate, name } })
    return data
}

// Property Type
export const createPropertyType = async (propertyType) => {
    const { data } = await $authHost.post('api/propertyType', propertyType)
    return data
}

export const getPropertyTypes = async () => {
    const { data } = await $authHost.get('api/propertyType')
    return data
}

// Property Payment Term
export const createPropertyPaymentTerm = async (propertyPaymentTerm) => {
    const { data } = await $authHost.post('api/propertyPaymentTerm', propertyPaymentTerm)
    return data
}

export const getPropertyPaymentTerms = async () => {
    const { data } = await $authHost.get('api/propertyPaymentTerm')
    return data
}

