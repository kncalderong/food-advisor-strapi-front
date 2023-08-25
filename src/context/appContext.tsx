'use client'

import reducer from './reducer'
import { createContext, useReducer, useContext, useEffect } from 'react'
import { ActionKind } from './types/actions.d'
import { GlobalStateType } from './types/globalState.d'
import Cookie from 'js-cookie'
import { gql } from '@apollo/client'
import { client } from './apolloClient'
import { UserType } from '@/types/data/User.d'

interface ContextValueType extends GlobalStateType {
  //type for values passed by context
  toggleTheme: () => void
  setupUser: (userData: UserType) => void
  logoutUser: () => void
}

const initialState: GlobalStateType = {
  darkTheme: false,
  user: null,
}

const AppContext = createContext<ContextValueType | undefined>(undefined)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser()
      console.log('userData: ', userData)
      if (userData) {
        setupUser(userData)
      }
    }
    fetchData()
  }, [])

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
