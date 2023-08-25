import { UserType } from '@/types/data/User.d'

export interface GlobalStateType {
  //type of globalState
  darkTheme: boolean
  user: UserType | null
}
