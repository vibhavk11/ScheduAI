import './App.css'
import './login.tsx'
import LoginButton from './login.tsx'
import LogoutButton from './assets/logout.tsx'
import { Stack } from '@mui/material'

function App() {
  return (
    <Stack direction={'column'}>
      <LoginButton /> <LogoutButton />
    </Stack>
  )
}

export default App
