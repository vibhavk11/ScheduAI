import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const LoggedOutPage = () => {
  const { logout } = useAuth0()

  // Log out the user
  useEffect(() => {
    logout()
  }, [logout])
  return (
    <div>
      <h1>Logged Out</h1>
      <p>You have been logged out.</p>
    </div>
  )
}

export default LoggedOutPage
