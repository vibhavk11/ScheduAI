import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { GetUserByIdDocument } from '../../graphql/generated/graphql'
import { useLazyQuery } from '@apollo/client'
import SectionHeadingToolBar from '../../components/SectionHeadingToolBar/SectionHeadingToolBar'
import TaskBox from '../../components/TaskBox/TaskBox'

const HomePage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000) // Update time every second

    return () => {
      clearInterval(timer) // Clean up on component unmount
    }
  }, [])

  const getDayIconBasedOnTime = () => {
    const today = new Date()
    const curHr = today.getHours()

    if (curHr < 12) {
      return '☀️'
    } else if (curHr < 18) {
      return '🌤️'
    } else {
      return '🌙'
    }
  }

  const getGreeting = () => {
    const today = new Date()
    const curHr = today.getHours()

    if (curHr < 12) {
      return 'Good morning'
    } else if (curHr < 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }

  const [getUser, { data }] = useLazyQuery(GetUserByIdDocument)

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
        <Stack direction="column" spacing={2}>
          <SectionHeadingToolBar
            title={`${getDayIconBasedOnTime()} ${getGreeting()}, ${data.userById.username}`}
            middleComponent={
              <Box
                alignItems={'center'}
                display={'flex'}
                width={'50%'}
                alignContent={'center'}
                justifyContent={'flex-end'}
                justifyItems={'flex-end'}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  // h1
                  fontSize={16}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {time.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </Typography>
              </Box>
            }
          />
          <TaskBox width={'100%'} height={600} date={new Date()} />
        </Stack>
      ) : (
        <div>Please wait... you are being redirected.</div>
      )}
    </div>
  )
}
export default HomePage
