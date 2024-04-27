import { Button, Container, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoginButton from '../../login'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Stack direction={'column'}>
      <Container>
        <h1>Welcome to ScheduAI</h1>
        <p>Click the button below to log in</p>
        <LoginButton />
        <Button onClick={() => navigate('/loggedout')}>Logout</Button>
      </Container>
    </Stack>
  )
}

export default HomePage
