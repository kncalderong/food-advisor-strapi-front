import { CartDataType } from '@/types/data/Restaurant.d'
import { UserType } from '@/types/data/User.d'

export interface GlobalStateType {
  //type of globalState
  darkTheme: boolean
  user: UserType | null
  cart: CartDataType
  showCart: boolean
}
