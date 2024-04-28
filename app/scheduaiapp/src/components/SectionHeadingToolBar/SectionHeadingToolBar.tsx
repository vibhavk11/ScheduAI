import React, { ReactNode } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

import {
  Plus as PlusIcon,
  ArrowClockwise as ArrowClockwiseIcon,
} from '@phosphor-icons/react'

interface SectionHeadingToolBarProps {
  title: string | ReactNode
  loading?: boolean
  hasAddButton?: boolean
  addButtonTitle?: string
  hasRefreshButton?: boolean
  middleComponent?: ReactNode
  onAddButtonClicked?: () => void
  onRefreshButtonClicked?: () => void
}

const SectionHeadingToolBar: React.FC<SectionHeadingToolBarProps> = ({
  title,
  loading = false,
  hasAddButton = false,
  addButtonTitle = 'Add',
  hasRefreshButton = false,
  middleComponent = null,
  onAddButtonClicked = () => {},
  onRefreshButtonClicked = () => {},
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        boxShadow: 0,
        paddingX: 0,
        paddingY: 0.8,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {typeof title === 'string' || title instanceof String ? (
        <Typography
          variant="h5"
          fontWeight={'bold'}
          noWrap
          component="div"
          color="text.primary"
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {title}
        </Typography>
      ) : (
        <Box width="100%">{title}</Box>
      )}
      {loading && (
        <Box sx={{ paddingX: 2 }}>
          <CircularProgress size={18} />
        </Box>
      )}
      {middleComponent}
      {hasAddButton && (
        <>
          <div>
            <Button
              variant="outlined"
              onClick={onAddButtonClicked ?? undefined}
              startIcon={<PlusIcon size={16} />}
            >
              {addButtonTitle}
            </Button>
          </div>
          <Divider
            sx={{ height: 28, m: 0.5, paddingLeft: 2 }}
            orientation="vertical"
          />
        </>
      )}
      {hasRefreshButton && (
        <div>
          <IconButton onClick={onRefreshButtonClicked ?? undefined}>
            <ArrowClockwiseIcon size={16} />
          </IconButton>
        </div>
      )}
    </Stack>
  )
}

export default SectionHeadingToolBar
