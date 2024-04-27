import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { ReactNode } from 'react'

interface ApolloClientComponentProps {
  children: ReactNode
}

const ApolloClientComponent = ({ children }: ApolloClientComponentProps) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => {
        console.log(`Graphql error ${message}`)
      })
    }
    if (networkError) {
      console.log(`Network error ${networkError}`)
    }
  })

  const link = from([
    errorLink,
    new HttpLink({ uri: 'http://localhost:5062/graphql' }),
  ])

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientComponent
