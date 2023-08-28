import { GlobalStateType } from './types/globalState.d'
import { ActionKind, GlobalStateActions } from './types/actions.d'

const reducer = (state: GlobalStateType, action: GlobalStateActions) => {
  if (action.type === ActionKind.TOGGLE_THEME) {
    return {
      ...state,
      darkTheme: action.payload.darkTheme,
    }
  }
  if (action.type === ActionKind.SET_USER) {
    return {
      ...state,
      user: action.payload.user,
    }
  }
  if (action.type === ActionKind.LOGOUT_USER) {
    return {
      ...state,
      user: null,
    }
  }
  if (action.type === ActionKind.SET_CART) {
    return {
      ...state,
      cart: action.payload.cartData,
    }
  }
  if (action.type === ActionKind.ADD_ITEM_CART) {
    const newCart = {
      items: [...state.cart.items, action.payload.itemData],
      total: state.cart.total + action.payload.itemData.attributes.price,
    }
    return {
      ...state,
      cart: newCart,
    }
  }
  if (action.type === ActionKind.UPDATE_ITEM_CART) {
    if (action.payload.method === 'add') {
      const newCart = {
        items: state.cart.items.map((item) =>
          item.id === action.payload.itemData.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        total: state.cart.total + action.payload.itemData.attributes.price,
      }
      return {
        ...state,
        cart: newCart,
      }
    }
    if (action.payload.method === 'remove') {
      const newCart = {
        items: state.cart.items.map((item) =>
          item.id === action.payload.itemData.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        total: state.cart.total - action.payload.itemData.attributes.price,
      }
      return {
        ...state,
        cart: newCart,
      }
    }
  }
  if (action.type === ActionKind.DELETE_ITEM_CART) {
    const newCart = {
      items: state.cart.items.filter(
        (item) => item.id !== action.payload.itemData.id
      ),
      total: state.cart.total - action.payload.itemData.attributes.price,
    }
    return {
      ...state,
      cart: newCart,
    }
  }
  if (action.type === ActionKind.RESET_CART) {
    return {
      ...state,
      cart: {
        items: [],
        total: 0,
      },
    }
  }
  if (action.type === ActionKind.TOGGLE_CART) {
    return {
      ...state,
      showCart: action.payload.showCartData,
    }
  }
  return state
}

export default reducer
