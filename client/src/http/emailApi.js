import { $host } from "./index";

export const sendEmail = async (email) => {
    const { data } = await $host.post('api/email', email)
    return data
}