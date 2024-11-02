import React, { useState } from 'react';

import { useContext } from 'react';
import { useEffect } from 'react';
import { saveToLocalStorage, getFormLocalStorage } from '@/utils/algorithms';
const MyContext = React.createContext();

function MyProvider(props) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const setUserToLocalStorage = (user) => {
    saveToLocalStorage('user', user);
    setUser(user);
  };
  const setCartToLocalStorage = (cart) => {
    saveToLocalStorage('cart', cart);
    setCart(cart);
  };
  // Cập nhật giỏ hàng
  const updateCart = (newCart) => {
    setCart(newCart);
    setCartToLocalStorage(newCart);
  };

  const globalData = {
    user,
    setUserToLocalStorage,
    cart,
    setCartToLocalStorage,
    setCart,
    updateCart,
  };

  useEffect(() => {
    const user = getFormLocalStorage('user');
    const cart = getFormLocalStorage('cart');
    if (user) {
      setUser(user);
    }
    if (cart) {
      setCart(cart);
    }
  }, []);
  return (
    <MyContext.Provider value={globalData}>{props.children}</MyContext.Provider>
  );
}

export default function useGlobalVariableContext() {
  return useContext(MyContext);
}

export { MyContext, MyProvider };
