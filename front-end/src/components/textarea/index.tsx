import React, { ChangeEvent, useState } from 'react'
import './style.scss'

type Props = {
  onAction: (value: string) => void,
  initalCmt?: string
}

const CustomText: React.FC<Props> = ({
  onAction,
  initalCmt
}) => {
  const minRows = 1
  const maxRows = 50
  const [rows, setRows] = useState<number>(1)
  const [value, setValue] = useState(initalCmt ? initalCmt : '')
  const textareaLineHeight = 24

  const handleChange = (event: any) => {
    const previousRows = event.target.rows
  	event.target.rows = minRows

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight)

    if (currentRows === previousRows) {
    	event.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows
      event.target.scrollTop = event.target.scrollHeight
    }
    setValue(event.target.value)

    if (!event.shiftKey) {
      let enter = (currentRows < maxRows ? currentRows : maxRows)
      setRows(enter-1)
    } else {
      setRows(currentRows < maxRows ? currentRows : maxRows)
    }

  }

  const handleInput = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey ) {
      onAction(value)
    }
  }

  const keyPress = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  return (
    <textarea
      rows={rows}
      value={value}
      placeholder={'Enter your comment'}
      className={'textarea boxsizingBorder'}
      onChange={(e) => handleChange(e)}
      onKeyUp={(e) => handleInput(e)}
      onKeyPress={(e) => keyPress(e)}
    />
  )
}

export default CustomText