import { makeAutoObservable } from "mobx";
import { getAllOrders } from '../http/orderApi'

export default class OrderStore {
    constructor() {
        this._orders = [];
        this._retrieveOrders();
        makeAutoObservable(this);
    }

    refreshOrderData() {
        this._retrieveOrders();
    }

    setOrders(orders) {
        this._orders = orders;
    }

    get orders() {
        return this._orders;
    }

    _retrieveOrders() {
        getAllOrders().then(data => this._orders = data);
    }

}