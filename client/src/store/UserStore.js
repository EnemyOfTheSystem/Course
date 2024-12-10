import { makeAutoObservable } from "mobx";


export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};

        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get isUser() {
        return this._user?.role === 'USER';
    }

    get isAdmin() {
        return this._user?.role === 'ADMIN';
    }

    get isManager() {
        return this._user?.role === 'MANAGER';
    }

    get firstName() {
        return this._user?.firstName;
    }

    get lastName() {
        return this._user?.lastName;
    }

}