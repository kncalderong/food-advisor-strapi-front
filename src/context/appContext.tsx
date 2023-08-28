'use client'

import reducer from './reducer'
import { createContext, useReducer, useContext, useEffect } from 'react'
import { ActionKind } from './types/actions.d'
import { GlobalStateType } from './types/globalState.d'
import Cookie from 'js-cookie'
import { gql } from '@apollo/client'
import { client } from './apolloClient'
import { UserType } from '@/types/data/User.d'
import { ItemDataType } from '@/types/data/Restaurant'

interface ContextValueType extends GlobalStateType {
  //type for values passed by context
  toggleTheme: () => void
  setupUser: (userData: UserType) => void
  logoutUser: () => void
  addItem: (item: any) => void
  removeItem: (item: any) => void
  resetCart: () => void
  toggleShowCart: (showCart: boolean) => void
}

const initialState: GlobalStateType = {
  darkTheme: false,
  user: null,
  cart: { items: [], total: 0 },
  showCart: false,
}

const AppContext = createContext<ContextValueType | undefined>(undefined)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //to get User info when page reloaded
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser()
      if (userData) {
        setupUser(userData)
      }
    }
    fetchData()
  }, [])

  //to get Cart info when page reloaded based on cookie stored data
  useEffect(() => {
    const cartCookie =
      Cookie.get('cart') !== 'undefined' ? Cookie.get('cart') : null
    if (cartCookie) {
      dispatch({
        type: ActionKind.SET_CART,
        payload: { cartData: JSON.parse(cartCookie) },
      })
    }
  }, [])

  const addItem = (item: any) => {
    let newItem: ItemDataType | undefined = state.cart.items.find(
      (i: ItemDataType) => i.id === item.id
    )
    if (!newItem) {
      newItem = {
        quantity: 1,
        ...item,
      }
      dispatch({
        type: ActionKind.ADD_ITEM_CART,
        payload: { itemData: newItem! },
      })
    } else {
      dispatch({
        type: ActionKind.UPDATE_ITEM_CART,
        payload: {
          method: 'add',
          itemData: item,
        },
      })
    }
  }

  const removeItem = (item: any) => {
    let newItem: ItemDataType | undefined = state.cart.items.find(
      (i: ItemDataType) => i.id === item.id
    )
    if (newItem && newItem.quantity > 1) {
      dispatch({
        type: ActionKind.UPDATE_ITEM_CART,
        payload: {
          method: 'remove',
          itemData: item,
        },
      })
    } else {
      dispatch({
        type: ActionKind.DELETE_ITEM_CART,
        payload: {
          itemData: item,
        },
      })
    }
  }

  const resetCart = () => {
    dispatch({
      type: ActionKind.RESET_CART,
    })
  }

  const toggleShowCart = (showCart: boolean) => {
    dispatch({
      type: ActionKind.TOGGLE_CART,
      payload: {
        showCartData: showCart,
      },
    })
  }

  const setupUser = (userData: UserType) => {
    dispatch({
      type: ActionKind.SET_USER,
      payload: { user: userData },
    })
  }

  const logoutUser = () => {
    Cookie.remove('token')
    dispatch({
      type: ActionKind.LOGOUT_USER,
    })
  }

  const toggleTheme = () => {
    const { darkTheme } = state
    dispatch({
      type: ActionKind.TOGGLE_THEME,
      payload: {
        darkTheme: !darkTheme,
      },
    })
  }

  //"me" is to query with a JWT if a user is already logged in
  const getUser = async () => {
    const token = Cookie.get('token')
    if (!token) return null
    const { data } = await client.query({
      query: gql`
        query {
          me {
            id
            email
            username
          }
        }
      `,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
    return data.me
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleTheme,
        setupUser,
        logoutUser,
        addItem,
        removeItem,
        resetCart,
        toggleShowCart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext) as ContextValueType
}

export { AppProvider, initialState, useAppContext }
