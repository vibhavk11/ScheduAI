import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import ApolloClientComponent from './components/ApolloClient/ApolloClient'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloClientComponent>
    <Router>
      <Auth0Provider
        domain="dev-rdrecx1yiezpxvgs.us.auth0.com"
        clientId="djeB9ic2ntMuCepze322IilTdMKYOORm"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Router>
  </ApolloClientComponent>,
)
