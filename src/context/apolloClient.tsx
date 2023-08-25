'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const API_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337'

export const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

//<ApolloProvider client={client}>

const AppApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export { AppApolloProvider }
