import { Route, Routes } from 'react-router-dom'
import LoggedOutPage from '../../pages/LoggedOutPage/LoggedOutPage'
import HomePage from '../../pages/HomePage/HomePage'

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/loggedout" element={<LoggedOutPage />} />

      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default AuthenticatedApp
