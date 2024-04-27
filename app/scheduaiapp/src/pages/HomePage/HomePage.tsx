import {
  Box,
  Button,
  Container,
  Drawer,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { GetUserByIdDocument } from '../../graphql/generated/graphql'
import { useLazyQuery } from '@apollo/client'
import SectionHeadingToolBar from '../../components/SectionHeadingToolBar/SectionHeadingToolBar'
import TaskBox from '../../components/TaskBox/TaskBox'
import { Plus as PlusIcon } from '@phosphor-icons/react'
import CreateTaskPanel from '../../components/CreateTaskPanel/CreateTaskPanel'

const HomePage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const [showDrawer, setShowDrawer] = useState(false)

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000) // Update time every second

    return () => {
      clearInterval(timer) // Clean up on component unmount
    }
  }, [])

  const handleOpenDrawer = () => {
    setShowDrawer(true)
  }

  const handleCloseDrawer = () => {
    setShowDrawer(false)
  }

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
        <Box>
          <Stack direction="column" spacing={2}>
            <SectionHeadingToolBar
              title={`${getDayIconBasedOnTime()} ${getGreeting()}, ${data.userById.username}`}
              middleComponent={
                <Stack
                  direction={'row'}
                  spacing={2}
                  alignItems={'center'}
                  display={'flex'}
                  width={'50%'}
                  alignContent={'center'}
                  justifyContent={'flex-end'}
                  justifyItems={'flex-end'}
                >
                  <Button startIcon={<PlusIcon />} onClick={handleOpenDrawer}>
                    Create Task
                  </Button>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    // h1
                    fontSize={16}
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {time.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
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
                </Stack>
              }
            />
            <TaskBox width={'100%'} height={600} date={new Date()} />
          </Stack>

          <Drawer anchor="right" open={showDrawer} onClose={handleCloseDrawer}>
            <CreateTaskPanel
              handleSave={() => {
                setShowDrawer(false)
              }}
            />
          </Drawer>
        </Box>
      ) : (
        <div>Please wait... you are being redirected.</div>
      )}
    </div>
  )
}
export default HomePage
