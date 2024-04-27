import React from 'react'
import { Chip, SxProps, Theme, Typography } from '@mui/material'
import { TAG_COLORS } from '../../constants'

type Props =
  | {
      colorIndex: number
      name: string
      onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
      sx?: SxProps<Theme>
    }
  | {
      colorIndex: number
      name: string
      onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
      icon?: React.ReactElement<any, any>
      deleteIcon?: React.ReactElement<any, any>
      onDelete?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
      sx?: SxProps<Theme>
    }

const TagChip = (props: Props) => {
  const { colorIndex, name, onClick, sx, ...rest } = props

  if (colorIndex >= 0 && colorIndex < TAG_COLORS.length) {
    return (
      <Chip
        size="small"
        label={<Typography variant="body1">{name}</Typography>}
        onClick={onClick}
        sx={{
          ...sx,
          backgroundColor: TAG_COLORS[colorIndex % TAG_COLORS.length].light,
          borderRadius: 2,
          padding: '0px',
          height: '24px',
          // minWidth: '80px',
        }}
        onMouseDown={event => {
          event.stopPropagation()
        }}
        {...rest}
      />
    )
  }

  return (
    <Typography>
      Invalid color index. Name: {name} index: {colorIndex}
    </Typography>
  )
}

export default TagChip
