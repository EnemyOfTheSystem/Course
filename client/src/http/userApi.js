import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password, firstName, lastName) => {
    console.log('registration')
    const { data } = await $host.post(
        'api/user/registration',
        { email, password, firstName, lastName, role: 'USER' });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    console.log('login')
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    console.log('check' + localStorage.getItem('token'))
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const createManager = async (email, password, firstName, lastName) => {
    console.log('createManager')
    const { data } = await $authHost.post(
        'api/user/registration',
        { email, password, firstName, lastName, role: 'MANAGER' });
    return data;
}