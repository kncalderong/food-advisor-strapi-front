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
  return state
}

export default reducer
