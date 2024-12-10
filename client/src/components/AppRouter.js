import React, { useContext } from 'react';
import Shop from '../pages/Shop';
import Auth from '../pages/Auth';
import Order from '../pages/Order';
import Admin from '../pages/Admin';
import Property from '../pages/Property';
import Manager from '../pages/Manager';
import { observer } from "mobx-react-lite";
import { Context } from '../index';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ORDER_ROUTE, PROPERTY_ROUTE, MANAGER_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    return (
        <Routes>
            <Route path={SHOP_ROUTE} element={<Shop />} />
            <Route path={LOGIN_ROUTE} element={<Auth />} />
            <Route path={REGISTRATION_ROUTE} element={<Auth />} />
            <Route path={PROPERTY_ROUTE + '/:id'} element={<Property />} />
            <Route path={MANAGER_ROUTE} element={<Manager />} />
            {user.isAuth && <Route path={ORDER_ROUTE} element={<Order />} />}
            {user.isAuth && user.isAdmin && <Route path={ADMIN_ROUTE} element={<Admin />} />}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;