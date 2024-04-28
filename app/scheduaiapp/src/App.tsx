import { Box, Stack } from '@mui/material'
import './App.css'
import AuthenticatedApp from './components/AuthenticatedApp/AuthenticatedApp.tsx'
import TopBar from './components/TopBar/TopBar.tsx'

function App() {
  return (
    <Stack direction={'column'} spacing={10}>
      <TopBar />
      <AuthenticatedApp />
    </Stack>
  )
}

export default App
