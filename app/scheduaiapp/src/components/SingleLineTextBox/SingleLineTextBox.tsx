import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Popover,
  Stack,
  Typography,
  TextField,
  styled,
  SxProps,
  Theme,
} from '@mui/material'
import { WarningOctagon as WarningOctagonIcon } from '@phosphor-icons/react'

type SingleLineTextBoxProps = {
  value: string | null
  error?: boolean
  errorMessage?: string
  type?: 'string' | 'number' | 'currency' | 'percentage'
  textAlign: 'left' | 'center' | 'right'
  onChange?: (updatedText: string) => void
  width?: string | number
  enabled?: boolean
  hintText?: string
  required?: boolean
  suppressZero?: boolean
  tabIndex?: number
  thousandSeparator?: boolean
  showNegativeValueInRed?: boolean
  decimalPlaces?: number
}

interface EditableItemContainerProps {
  disabled?: boolean
}

export const EditableItemContainer = styled(Box)<EditableItemContainerProps>(
  ({ disabled }) => ({
    display: 'flex', // use flexbox
    alignItems: 'center', // vertical centering
    flexGrow: 1,
    cursor: disabled ? 'default' : 'pointer',
    minWidth: 50,
    minHeight: 38,
    border: '1px solid transparent',
    borderRadius: 4,
    padding: 4,
    ...(!disabled && {
      '&:hover': {
        backgroundColor: '#0000000A',
      },
    }),
  }),
)

interface TextOverflowPopoverProps {
  text: string
  sx?: SxProps<Theme>
  width?: string | number
}

const TextOverflowPopover: React.FC<TextOverflowPopoverProps> = ({
  text,
  // children,
  width = '100%',
  sx,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    // Update the state when the component mounts or the text changes
    const checkTruncation = () => {
      const element = textRef.current
      // Check if the text is truncated
      const truncated = element
        ? element.scrollWidth > element.clientWidth
        : false
      setIsTruncated(truncated)
    }

    checkTruncation()

    // You may want to check truncation on window resize as well
    window.addEventListener('resize', checkTruncation)
    return () => window.removeEventListener('resize', checkTruncation)
  }, [])

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    // Only open the popover if the text is truncated
    if (isTruncated) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Typography
        ref={textRef}
        width={'100%'}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        noWrap
        sx={{ ...sx, color: 'rgba(0, 0, 0, 0.6)' }}
      >
        {text}
      </Typography>
      <Popover
        id="mouse-over-popover"
        elevation={1}
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 0.5 }}>{text}</Typography>
      </Popover>
    </>
  )
}

const SingleLineTextBox: React.FC<SingleLineTextBoxProps> = ({
  value,
  error = false,
  errorMessage = '',
  type = 'string',
  textAlign = 'left',
  onChange,
  width = '100%',
  enabled = true,
  hintText = '',
  required = false,
  suppressZero = false,
  tabIndex = 0,
  thousandSeparator = false,
  showNegativeValueInRed = false,
  decimalPlaces = 2,
}) => {
  const [internalValue, setInternalValue] = useState<string | null>(value)
  const [editing, setEditing] = useState(false)

  const [hoverBoxWidth, setHoverBoxWidth] = useState<number | null>(null)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hoverBoxRef = useRef<HTMLDivElement | null>(null)

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })

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

  useEffect(() => {
    if (type === 'percentage' || type === 'currency' || type === 'number') {
      if (!value) {
        setInternalValue('')
        return
      }

      const floatValue = parseFloat(value as string)

      if (isNaN(floatValue)) {
        setInternalValue('')
        return
      }
    }

    setInternalValue(value)
  }, [value])

  useEffect(() => {
    if (editing) {
      if (hoverBoxRef.current) {
        setHoverBoxWidth(hoverBoxRef.current.offsetWidth)
      }

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 0)
    }
  }, [editing])

  const handleEditStart = (event: React.MouseEvent<HTMLElement>) => {
    if (!enabled) {
      return
    }

    setAnchorEl(event.currentTarget)

    setEditing(true)
  }

  const handleEditSave = () => {
    setAnchorEl(null)

    setEditing(false)
    if (internalValue !== value) {
      onChange?.(internalValue?.toString() ?? '')
    }
  }

  const handleMenuItemClick = (value: string) => {
    // Regular expression to match only numbers and decimal points
    const regex = /^-?[0-9]*\.?[0-9]*$/

    // Directly handle the case where the input is empty
    if (!value) {
      console.log('Empty value')
      setInternalValue('')
      return // Exit the function early
    }

    if (type === 'percentage' || type === 'currency' || type === 'number') {
      // Check if the current value matches the regular expression
      if (regex.test(value)) {
        const floatValue = parseFloat(value)

        // You might not need this check anymore since '' case is handled above
        if (isNaN(floatValue)) {
          setInternalValue('')
          return
        }

        if (type === 'percentage' && (floatValue > 100 || floatValue < 0)) {
          console.log('Percentage value out of bounds:', floatValue)
          // setInternalValue('')
          return
        }

        // For numeric values, directly setting the value is appropriate
        // Note: This might need formatting based on your requirements
        setInternalValue(value) // Consider setting to `value` instead of `floatValue` to preserve the input format
      } else {
        setInternalValue('')
      }
    }
    {
      setInternalValue(value)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (editing) {
        handleEditSave()
      }
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent) => {
    console.log('handleKeyDown', event)
    if ((event.key === 'Enter' || event.key === 'Tab') && !editing && enabled) {
      event.stopPropagation()
      // event.preventDefault()
      handleEditStart(event as any)
    }
  }

  const getPercentageValue = (value: string | number | null): string => {
    const floatValue = Math.min(
      100,
      Math.max(0, parseFloat(value as string) || 0),
    )
    if (suppressZero && floatValue === 0) {
      return ''
    }
    return (
      floatValue.toLocaleString(undefined, {
        minimumFractionDigits: floatValue % 1 === 0 ? 0 : decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }) + '%'
    )
  }

  const getCurrencyValue = (value: string | number | null): string => {
    const numValue = parseFloat(value as string) || 0
    if (suppressZero && numValue === 0) {
      return ''
    }
    return '$ ' + formatter.format(numValue)
  }

  const getHintText = () => {
    if (required && enabled) {
      return `${hintText} *`
    }

    return hintText
  }

  const getDisplayValue = () => {
    let displayValue = ''

    if (type === 'percentage') {
      displayValue = getPercentageValue(internalValue)
    } else if (type === 'currency') {
      displayValue = getCurrencyValue(internalValue)
    } else {
      displayValue = String(internalValue) ?? getHintText()
    }

    if (displayValue === 'NaN') {
      displayValue = ''
    }

    if (
      suppressZero &&
      displayValue &&
      parseFloat(displayValue as string) === 0
    ) {
      displayValue = ''
    }

    if (thousandSeparator && displayValue) {
      displayValue = displayValue.replace(/,/g, '')
      displayValue = displayValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return displayValue
  }

  const getColor = () => {
    // if displayValue is negative & showNegativeValueInParentheses is true then return red color
    if (showNegativeValueInRed && parseFloat(internalValue ?? '') < 0) {
      return 'error.main'
    }
    return 'text.primary'
  }

  return (
    <>
      <EditableItemContainer
        tabIndex={enabled ? tabIndex : undefined}
        width={'100%'}
        padding={0.5}
        ref={hoverBoxRef}
        disabled={!enabled}
        onClick={enabled ? handleEditStart : undefined}
        onKeyUp={handleKeyUp}
      >
        {getDisplayValue() && (
          <TextOverflowPopover
            width={width}
            sx={{
              textAlign: textAlign,
              color: getColor(),
            }}
            text={getDisplayValue()}
          />
        )}
        {!getDisplayValue() && enabled && hintText && (
          <Typography
            variant="caption"
            color="text.secondary"
            width={width}
            noWrap
            textAlign={
              type === 'currency' || type === 'percentage' ? 'right' : textAlign
            }
          >
            {getHintText()}
          </Typography>
        )}
        <Stack
          direction="row"
          display={'flex'}
          flexGrow={1}
          alignItems={'center'}
          justifyItems={'space-evenly'}
        >
          {!internalValue && hintText && (
            <Box flexGrow={1}>
              {enabled && required && (
                <Typography variant="caption" color="error.main" width={width}>
                  {' '}
                  *
                </Typography>
              )}
            </Box>
          )}
        </Stack>
      </EditableItemContainer>

      <Popover
        anchorEl={anchorEl}
        open={editing}
        onClose={handleEditSave}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          padding: 0,
        }}
        slotProps={{
          paper: {
            sx: {
              elevation: 3,
              padding: 0,
              width: hoverBoxWidth ? `${hoverBoxWidth}px` : 'auto',
              minWidth: type === 'string' ? 200 : 'auto',
            },
          },
        }}
      >
        <Stack direction="column">
          <Box sx={{ overflow: 'auto' }}>
            <TextField
              autoComplete="off"
              inputRef={inputRef}
              type="text"
              // type={
              //   type === 'currency' || type === 'percentage' ? 'number' : type
              // }
              inputProps={{
                style: { textAlign: textAlign },
              }}
              fullWidth
              size="small"
              variant="outlined"
              value={internalValue}
              onKeyUp={handleKeyPress}
              onChange={event => handleMenuItemClick(event.target.value)}
            />
          </Box>
        </Stack>
      </Popover>
    </>
  )
}

export default SingleLineTextBox
