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
  return state
}

export default reducer
