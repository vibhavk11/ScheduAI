import './TopBar.css'
import LogoutButton from '../../assets/logout'
import { Log } from '@phosphor-icons/react'
import { Box } from '@mui/material'

function TopBar() {
  const barColor = '#345c42'

  return (
    <div className="bar" style={{ backgroundColor: barColor }}>
      <h1>scheduAI</h1>
      <div className="button">
        <LogoutButton />
      </div>
    </div>
  )
}

export default TopBar
