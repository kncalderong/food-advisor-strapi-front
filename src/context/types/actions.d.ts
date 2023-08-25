import { UserType } from '@/types/data/User.d'

export enum ActionKind {
  TOGGLE_THEME = 'TOGGLE_THEME',
  SET_USER = 'SET_USER',
  LOGOUT_USER = 'LOGOUT_USER',
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
