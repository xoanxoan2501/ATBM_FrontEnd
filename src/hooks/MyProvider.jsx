import React, { useState } from 'react'

import { useContext } from 'react'
import { useEffect } from 'react'
import { saveToLocalStorage, getFormLocalStorage } from '@/utils/algorithms'
const MyContext = React.createContext()

function MyProvider(props) {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const setUserToLocalStorage = (user) => {
    saveToLocalStorage('user', user)
  }
  const setCartToLocalStorage = (newUsercart) => {
    const allCart = getFormLocalStorage('rootCart')
    if (!allCart) {
      saveToLocalStorage('rootCart', [{ userId: user.id, cart: newUsercart }])
      return
    }

    const userCart = allCart.find((userCart) => userCart.userId === user.id)
    if (userCart) {
      userCart.cart = newUsercart
      saveToLocalStorage('rootCart', allCart)
    } else {
      saveToLocalStorage('rootCart', [
        ...allCart,
        { userId: user.id, cart: newUsercart },
      ])
    }
  }

  const globalData = {
    user,

    setUserToLocalStorage,
    cart,
    setCartToLocalStorage,
    setCart,
    setUser
  }

  useEffect(() => {
    const userLocalStorage = getFormLocalStorage('user')
    const allCart = getFormLocalStorage('rootCart')
    if (userLocalStorage) {
      setUser(userLocalStorage)
      if (allCart) {
        const userCart = allCart.filter(
          (userCart) => userCart.userId === userLocalStorage.id
        )
        if (userCart.length === 0) {
          setCart([])
        } else {
          setCart(userCart[0].cart)
        }
      }
    }
  }, [])
  return (
    <MyContext.Provider value={globalData}>{props.children}</MyContext.Provider>
  )
}

export default function useGlobalVariableContext() {
  return useContext(MyContext)
}

export { MyContext, MyProvider }
