import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import PropertyStore from './store/PropertyStore';
import OrderStore from './store/OrderStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      property: new PropertyStore(),
      order: new OrderStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
