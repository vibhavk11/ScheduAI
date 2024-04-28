import {
  Box,
  Checkbox,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { ScheduaiTaskItem } from '../TaskBox/TaskBox'
import SingleLineTextBox, {
  EditableItemContainer,
} from '../SingleLineTextBox/SingleLineTextBox'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TagChip from '../TagChip/TagChip'
import dayjs from 'dayjs'
import { useMutation } from '@apollo/client'
import { MarkTaskAsCompletedDocument } from '../../graphql/generated/graphql'

interface ViewTaskPanelProps {
  task: ScheduaiTaskItem
  refetch: () => void
}

const ViewTaskPanel: React.FC<ViewTaskPanelProps> = ({ task, refetch }) => {
  const getHtmlString = (html: string) => {
    // strip ```html\n from the beginning and ``` from the end and return

    return html.replace(/```html\n/, '').replace(/```/, '')
  }

  const [markTaskAsCompleted] = useMutation(MarkTaskAsCompletedDocument)

  const handleCompleteTask = (isCompleted: boolean) => {
    markTaskAsCompleted({
      variables: {
        input: {
          taskId: task.id,
          status: isCompleted,
        },
      },
    }).then(() => {
      refetch()
    })
  }

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
            View Task
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
              value={task.title ?? ''}
              textAlign={'left'}
              enabled={false}
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
              value={task.description ?? ''}
              textAlign={'left'}
              enabled={false}
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
              value={task.estimatedHours.toString() ?? ''}
              textAlign={'left'}
              enabled={false}
            />
          </Stack>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography
              variant="body1"
              width={'40%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              AI Recommended Start Time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={dayjs().startOf('day').add(task.startTime, 'hours')}
              />
            </LocalizationProvider>
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
                value={dayjs().startOf('day').add(task.dueTime, 'hours')}
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
                <TagChip colorIndex={3} name={task.priority ?? ''} />
              </Box>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography
              variant="body1"
              width={'40%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              Completed
            </Typography>
            <Checkbox
              checked={task.isCompleted}
              onClick={() => {
                handleCompleteTask(!task.isCompleted)
              }}
            />
          </Stack>
          <Divider />

          <Stack direction="column" spacing={2} alignItems={'center'}>
            <Typography
              variant="h2"
              width={'100%'}
              sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              AI Recommendation
            </Typography>
            {/* use the getPriorities query to create a picker that consists of tagchips for each priority */}

            <div
              dangerouslySetInnerHTML={{
                __html: getHtmlString(task.aiRecommendation),
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}

export default ViewTaskPanel
