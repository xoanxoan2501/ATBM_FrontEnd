import React, { useState } from 'react';
const MyContext = React.createContext();
import { useContext } from 'react';
function MyProvider(props) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const globalData = {
    user,
    setUser,
    cart,
    setCart,
  };

  return (
    <MyContext.Provider value={globalData}>{props.children}</MyContext.Provider>
  );
}

export default function useGlobalVariableContext() {
  return useContext(MyContext);
}

export { MyContext, MyProvider };
