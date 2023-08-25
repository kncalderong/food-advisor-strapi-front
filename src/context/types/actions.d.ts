export enum ActionKind {
  TOGGLE_THEME = 'TOGGLE_THEME',
  SET_USER = 'SET_USER',
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
