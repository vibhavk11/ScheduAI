import {
  Box,
  Button,
  Container,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import SingleLineTextBox, {
  EditableItemContainer,
} from '../SingleLineTextBox/SingleLineTextBox'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers'
import {
  CreateScheduaiTaskDocument,
  GetPrioritiesDocument,
  Priority,
} from '../../graphql/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import TagChip from '../TagChip/TagChip'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { callSnackBar } from '../CallSnackBar/CallSnackBar'

interface CreateTaskPanelProps {
  handleSave: () => void
  refetch: () => void
}

const CreateTaskPanel: React.FC<CreateTaskPanelProps> = ({
  handleSave,
  refetch,
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null,
  )
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const hoverBoxRef = useRef<HTMLDivElement | null>(null)
  const [hoverBoxWidth, setHoverBoxWidth] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)
  const [estimatedHours, setEstimatedHours] = useState<number | null>(null)
  const [taskDescription, setTaskDescription] = useState<string | null>('')
  const [taskName, setTaskName] = useState<string | null>('')

  const { data } = useQuery(GetPrioritiesDocument)

  const { user } = useAuth0()

  const [createTask] = useMutation(CreateScheduaiTaskDocument)

  const handleCreateTask = async () => {
    await createTask({
      variables: {
        input: {
          title: taskName ?? '',
          userId: user?.sub ?? '',
          description: taskDescription ?? '',
          estimatedTimeInHours: estimatedHours ?? 0,
          dueTime: selectedDate.hour() + selectedDate.minute() / 60
            ,
          startTime: startDate ? (startDate.hour() + startDate.minute() / 60) : null,
          priority: selectedPriority ?? Priority.Low,
        },
      },
    }).then(() => {
      callSnackBar('Task Created Successfully', 'success')
      refetch()
    })
  }

  useEffect(() => {
    if (hoverBoxRef.current) {
      setHoverBoxWidth(hoverBoxRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (hoverBoxRef.current) {
        setHoverBoxWidth(hoverBoxRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleEditStart = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)

    setEditing(true)
  }

  useEffect(() => {
    if (editing) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 0)
    }
  }, [editing])

  return (
    <div>
      <Container
        sx={{
          width: 600,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Stack direction="column" spacing={1}>
          <Typography
            variant="h5"
            fontSize={35}
            fontWeight={1000}
            paddingTop={2}
          >
            Create Task
          </Typography>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography
              variant="body1"
              width={'40%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              Task Name
            </Typography>
            <SingleLineTextBox
              hintText={'Empty'}
              value={taskName ?? ''}
              textAlign={'left'}
              onChange={newValue => {
                setTaskName(newValue)
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography
              variant="body1"
              width={'40%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              Task Description
            </Typography>
            <SingleLineTextBox
              hintText={'Empty'}
              value={taskDescription ?? ''}
              textAlign={'left'}
              onChange={newValue => {
                setTaskDescription(newValue)
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography
              variant="body1"
              width={'40%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              Estimated Hours
            </Typography>
            <SingleLineTextBox
              type="number"
              hintText={'Empty'}
              value={estimatedHours?.toString() ?? ''}
              textAlign={'left'}
              onChange={newValue => {
                setEstimatedHours(parseInt(newValue))
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography
              variant="body1"
              width={'40%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              Due By 
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={selectedDate}
                onChange={newValue => {
                  if (newValue) {
                    setSelectedDate(newValue)
                  }
                }}
              />
            </LocalizationProvider>
          </Stack>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography
              variant="body1"
              width={'40%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              Start Time (if left blank, AI will predict it for you)
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={startDate}
                onChange={newValue => {
                  if (newValue) {
                    setStartDate(newValue)
                  }
                }}
              />
            </LocalizationProvider>
          </Stack>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography
              variant="body1"
              width={'40%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              Priority
            </Typography>
            {/* use the getPriorities query to create a picker that consists of tagchips for each priority */}
            <EditableItemContainer
              sx={{ width: '100%' }}
              padding={0.5}
              ref={hoverBoxRef}
              onClick={handleEditStart}
            >
              <Stack
                width={'100%'}
                direction={'row'}
                flexGrow={1}
                justifyContent={'space-between'}
                justifyItems={'flex-end'}
                alignItems={'center'}
              >
                <Box
                  width="100%"
                  sx={{
                    display: 'flex', // Flex container
                    flexWrap: 'nowrap', // Prevent wrapping
                    overflowX: 'hidden', // Horizontal scroll
                    overflowY: 'hidden', // Prevent positioner from overflowing
                  }}
                >
                  <TagChip colorIndex={3} name={selectedPriority ?? ''} />
                </Box>
              </Stack>
            </EditableItemContainer>
          </Stack>
        </Stack>

        <Box padding={1} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 1,
            backgroundColor: theme => theme.palette.action.hover,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              handleCreateTask()
              handleSave()
            }}
          >
            SAVE
          </Button>
        </Box>
      </Container>

      <Popover
        anchorEl={anchorEl}
        open={editing}
        onClose={() => {
          setAnchorEl(null)
          setEditing(false)
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          padding: 0,
          border: '1px solid green',
          width: 100,
        }}
        slotProps={{
          paper: {
            sx: {
              elevation: 3,
              padding: 0,
              width: hoverBoxWidth ? `${hoverBoxWidth}px` : 'auto',
              minWidth: 100,
            },
          },
        }}
      >
        <Stack direction="column">
          {data?.priorities.length === 0
            ? 'Empty'
            : data?.priorities.map((key, value) => {
                const enumItem = key

                return (
                  <TagChip
                    sx={{ margin: 0.5 }}
                    key={value}
                    colorIndex={value ?? 0}
                    name={enumItem?.key ?? ''}
                    onClick={() => {
                      setSelectedPriority(enumItem.key)
                      setAnchorEl(null)
                      setEditing(false)
                    }}
                  />
                )
              })}
        </Stack>
      </Popover>
    </div>
  )
}

export default CreateTaskPanel
