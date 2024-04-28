import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Drawer, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ScheduaiTasksByIdDocument } from '../../graphql/generated/graphql'
import { v4 as uuidv4 } from 'uuid'
import ViewTaskPanel from '../ViewTaskPanel/ViewTaskPanel'

interface TaskBoxProps {
  width?: number | string
  height?: number | string
  refetchBoolean: boolean
  date: Date
}

export interface ScheduaiTaskItem {
  uuid: string
  index: number
  id: number
  title: string
  description: string
  priority: string
  estimatedHours: number
  dueTime: number
  startTime: number
  endTime: number
  aiRecommendation: string
}

const TaskBox: React.FC<TaskBoxProps> = ({
  width = 200,
  height = 200,
  refetchBoolean,
  date,
}) => {
  const [percentOfDay, setPercentOfDay] = useState(0)
  const [showDrawer, setShowDrawer] = useState(false)

  const [scheduaiTasks, setScheduaiTasks] = useState<ScheduaiTaskItem[]>([])

  const [selectedTask, setSelectedTask] = useState<ScheduaiTaskItem | null>(
    null,
  )

  const handleCloseDrawer = () => {
    setShowDrawer(false)
  }

  const { user } = useAuth0()

  const { data, refetch } = useQuery(ScheduaiTasksByIdDocument, {
    variables: {
      input: user?.sub ?? '',
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    refetch()
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetchBoolean])

  const calculateFontSize = () => {
    const fontSizePercentage =
      height === '100%' ? 6 : parseInt(height as string) / 30
    return fontSizePercentage + 'px'
  }

  useEffect(() => {
    console.log('DATA', data)
    setScheduaiTasks([])

    data?.scheduaiTasksById?.map((task, index) => {
      const taskWithAdditionalProps = {
        uuid: uuidv4(),
        index: index,
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        estimatedHours: task.estimatedTimeInHours,
        dueTime: task.dueTime,
        startTime: task.startTime,
        endTime: task.endTime,
        aiRecommendation: task.aiRecommendation ?? '',
      }

      setScheduaiTasks(prev => [...prev, taskWithAdditionalProps])
    })
  }, [data])

  // check if date is today
  useEffect(() => {
    const today = new Date()
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
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
        backgroundImage: `linear-gradient(90deg, #d9d9d9 ${percentOfDay + 0.5}%, #f0f0f0 ${percentOfDay}%)`,
        boxShadow: 1,
        position: 'relative',
      }}
    >
      <Grid container spacing={0} direction="column" sx={{ height: '100%' }}>
        {[...Array(24)].map((_, i) => {
          const currentTime = new Date()
          const currentHour = currentTime.getHours()
          const currentMinute = currentTime.getMinutes()
          let isPastTime =
            currentHour > i || (currentHour === i && currentMinute >= 30)
          isPastTime = false

          return (
            <Grid
              item
              key={i}
              sx={{
                height: '100%',
                boxSizing: 'border-box',
                borderRight: '1.5px solid',
                borderColor:
                  (i + 1) * (100 / 23) * 0 > percentOfDay
                    ? 'transparent'
                    : '#ddd', // Subtract 10% for the left margin
                position: 'relative',
                left: `${-1.5 * (i / 23 + 10)}px`, // Adjust the position based on the width of the task box
              }}
            >
              {/* Conditionally render text if it's not a past time */}
              {!isPastTime && (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: -15,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: calculateFontSize(),
                  }}
                >
                  {/* Place your text here */}
                  {`${i <= 12 ? i : i - 12}` /*:${i < 12 ? '00AM' : '00PM'}`*/}
                </Typography>
              )}
            </Grid>
          )
        })}

        {scheduaiTasks?.map(task => (
          <Box
            key={task.uuid}
            alignItems={'center'}
            alignContent={'center'}
            sx={{
              position: 'absolute',
              top: `${task.index * 10 + 20}%`, // Adjust these values based on your task data
              left: `${(task.startTime / 24) * 100 + 1.3}%`,
              width: `${(task.estimatedHours / 24) * 100}%`,
              height: '10%', // Adjust these values based on your task data
              // Add other styles as needed
              borderRadius: '8px', // This adds rounded corners
              backgroundColor: '#C0C0C0', // This sets the fill color
              '&:hover': {
                backgroundColor: 'darkgray', // This changes the fill color on hover
              },
            }}
            onClick={() => {
              setShowDrawer(true)
              setSelectedTask(task)
            }}
          >
            {task.title}
          </Box>
        ))}
      </Grid>

      <Drawer anchor="right" open={showDrawer} onClose={handleCloseDrawer}>
        <ViewTaskPanel task={selectedTask ?? ({} as ScheduaiTaskItem)} />
      </Drawer>
    </Box>
  )
}

export default TaskBox
