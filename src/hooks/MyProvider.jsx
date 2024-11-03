// import React, { useState } from 'react'

// import { useContext } from 'react'
// import { useEffect } from 'react'
// import { saveToLocalStorage, getFormLocalStorage } from '@/utils/algorithms'
// const MyContext = React.createContext()

// function MyProvider(props) {
//   const [user, setUser] = useState(null)
//   const [cart, setCart] = useState([])
//   const setUserToLocalStorage = (user) => {
//     saveToLocalStorage('user', user)
//   }
//   const setCartToLocalStorage = (newUsercart) => {
//     const allCart = getFormLocalStorage('rootCart')
//     if (!allCart) {
//       saveToLocalStorage('rootCart', [{ userId: user.id, cart: newUsercart }])
//       return
//     }

//     const userCart = allCart.find((userCart) => userCart.userId === user.id)
//     userCart.cart = newUsercart
//     saveToLocalStorage('rootCart', allCart)
//   }

//   const globalData = {
//     user,

//     setUserToLocalStorage,
//     cart,
//     setCartToLocalStorage,
//     setCart,
//     setUser
//   }

//   useEffect(() => {
//     const userLocalStorage = getFormLocalStorage('user')
//     const allCart = getFormLocalStorage('rootCart')
//     if (userLocalStorage) {
//       setUser(user)
//       if (allCart) {
//         const userCart = allCart.filter(
//           (userCart) => userCart.userId === userLocalStorage.id
//         )
//         setCart(userCart[0].cart)
//       }
//     }
//   }, [user])
//   return (
//     <MyContext.Provider value={globalData}>{props.children}</MyContext.Provider>
//   )
// }

// export default function useGlobalVariableContext() {
//   return useContext(MyContext)
// }

// export { MyContext, MyProvider }

import React, { useState, useEffect, useContext } from 'react'
import { saveToLocalStorage, getFormLocalStorage } from '@/utils/algorithms'

const MyContext = React.createContext()

function MyProvider(props) {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  const setUserToLocalStorage = (user) => {
    saveToLocalStorage('user', user)
    setUser(user) // Cập nhật user trong state sau khi lưu vào localStorage
  }

  const setCartToLocalStorage = (newUserCart) => {
    const allCart = getFormLocalStorage('rootCart') || []
    const userCartIndex = allCart.findIndex(
      (userCart) => userCart.userId === user?.id
    )

    if (userCartIndex === -1) {
      // Nếu người dùng chưa có giỏ hàng, thêm mới
      allCart.push({ userId: user.id, cart: newUserCart })
    } else {
      // Cập nhật giỏ hàng của người dùng
      allCart[userCartIndex].cart = newUserCart
    }

    saveToLocalStorage('rootCart', allCart)
  }

  useEffect(() => {
    const userLocalStorage = getFormLocalStorage('user')
    const allCart = getFormLocalStorage('rootCart') || []

    if (userLocalStorage) {
      setUser(userLocalStorage)
      const userCart = allCart.find(
        (cart) => cart.userId === userLocalStorage.id
      )

      if (userCart) {
        setCart(userCart.cart)
      } else {
        setCart([]) // Đặt giỏ hàng trống nếu không có giỏ hàng nào cho người dùng
      }
    }
  }, [])

  const globalData = {
    user,
    setUserToLocalStorage,
    cart,
    setCartToLocalStorage,
    setCart,
    setUser,
  }

  return (
    <MyContext.Provider value={globalData}>{props.children}</MyContext.Provider>
  )
}

export default function useGlobalVariableContext() {
  return useContext(MyContext)
}

export { MyContext, MyProvider }
