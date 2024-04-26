import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'

const root = createRoot(document.getElementById('root')!)

root.render(
  <Auth0Provider
    domain="dev-rdrecx1yiezpxvgs.us.auth0.com"
    clientId="djeB9ic2ntMuCepze322IilTdMKYOORm"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>,
)
