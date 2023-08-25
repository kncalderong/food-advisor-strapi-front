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
      payload: any
    }
  | {
      type: ActionKind.LOGOUT_USER
    }
