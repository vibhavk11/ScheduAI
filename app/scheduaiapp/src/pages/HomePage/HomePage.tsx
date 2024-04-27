import { Button, Container, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoginButton from '../../login'
import { useQuery } from '@apollo/client'
import { TestQueryDocument } from '../../graphql/generated/graphql'

const HomePage = () => {
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(TestQueryDocument)

  return (
    <Stack direction={'column'}>
      <Container>
        <h1>{data?.test}</h1>
        <p>Click the button below to log in</p>
        <LoginButton />
        <Button onClick={() => navigate('/loggedout')}>Logout</Button>
      </Container>
    </Stack>
  )
}

export default HomePage
