import { CartDataType, ItemDataType } from '@/types/data/Restaurant.d'
import { UserType } from '@/types/data/User.d'

export enum ActionKind {
  TOGGLE_THEME = 'TOGGLE_THEME',
  SET_USER = 'SET_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  SET_CART = 'SET_CART',
  ADD_ITEM_CART = 'ADD_ITEM_CART',
  UPDATE_ITEM_CART = 'UPDATE_ITEM_CART',
  DELETE_ITEM_CART = 'DELETE_ITEM_CART',
  RESET_CART = 'RESET_CART',
  TOGGLE_CART = 'TOGGLE_CART',
}

export type GlobalStateActions =
  | {
      type: ActionKind.TOGGLE_THEME
      payload: {
        darkTheme: boolean
      }
    }
  | {
      type: ActionKind.SET_USER
      payload: {
        user: UserType
      }
    }
  | {
      type: ActionKind.LOGOUT_USER
    }
  | {
      type: ActionKind.SET_CART
      payload: {
        cartData: CartDataType
      }
    }
  | {
      type: ActionKind.ADD_ITEM_CART
      payload: {
        itemData: ItemDataType
      }
    }
  | {
      type: ActionKind.UPDATE_ITEM_CART
      payload: {
        method: 'add' | 'remove'
        itemData: ItemDataType
      }
    }
  | {
      type: ActionKind.DELETE_ITEM_CART
      payload: {
        itemData: ItemDataType
      }
    }
  | {
      type: ActionKind.RESET_CART
    }
  | {
      type: ActionKind.TOGGLE_CART
      payload: {
        showCartData: boolean
      }
    }
