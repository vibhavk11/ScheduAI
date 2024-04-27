import { Box, Button, Container, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { GetUserByIdDocument } from '../../graphql/generated/graphql'
import { useLazyQuery } from '@apollo/client'

const HomePage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  const [getUser, { data, error, loading }] = useLazyQuery(GetUserByIdDocument)

  // Effect for handling the automatic login redirect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect() // Automatically trigger login if not authenticated
    }
  }, [isLoading, isAuthenticated, loginWithRedirect])

  // Log user information
  useEffect(() => {
    console.log('user', user)
    if (user) {
      getUser({
        variables: {
          input: {
            id: user.sub ?? '',
            username: user.nickname ?? '',
            email: user.email ?? '',
          },
        },
      })
    }
  }, [user])

  if (isLoading) {
    return <div>Loading...</div> // Show a loading message while the authentication is still processing
  }

  return (
    <div>
      {isAuthenticated && data ? (
        <Box>
          <h1>Welcome {data.userById.username}</h1>
          <Button onClick={() => navigate('/loggedout')}>Logout</Button>
        </Box>
      ) : (
        <div>Please wait... you are being redirected to the login page.</div>
      )}
    </div>
  )
}
export default HomePage
