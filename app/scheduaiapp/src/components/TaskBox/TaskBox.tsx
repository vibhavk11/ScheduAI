import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

interface TaskBoxProps {
  width?: number | string
  height?: number | string
  date: Date
}

const TaskBox: React.FC<TaskBoxProps> = ({
  width = 200,
  height = 200,
  date,
}) => {
  const [percentOfDay, setPercentOfDay] = useState(0)
  // check if date is today
  useEffect(() => {
    const today = new Date()
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      console.log('Today')
      setPercentOfDay(
        ((date.getHours() * 60 + date.getMinutes()) / (24 * 60)) * 100,
      )
    }
  }, [date])

  return (
    <Box
      sx={{
        width: width,
        height: height,
        border: '1px solid #ddd',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        backgroundImage: `linear-gradient(90deg, #d9d9d9 ${percentOfDay}%, #f0f0f0 ${percentOfDay}%)`,
        boxShadow: 1,
        position: 'relative',
      }}
    >
      <Grid container>
        {[...Array(24)].map((_, i) => (
          <Grid
            item
            xs
            key={i}
            sx={{
              height: '100%',
              borderRight: '1px solid #888',
              boxSizing: 'border-box',
            }}
          />
        ))}
      </Grid>
      <Typography variant="body1" sx={{ position: 'absolute' }}>
        Task
      </Typography>
    </Box>
  )
}

export default TaskBox
