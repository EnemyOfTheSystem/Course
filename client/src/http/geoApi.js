import { $host } from "./index";

export const getGeo = async (address) => {
    const { data } = await $host.get('https://geocode.maps.co/search?q=' + address + '&api_key=6644fc6d396ee434404871zxc7bb656')
    return data
}