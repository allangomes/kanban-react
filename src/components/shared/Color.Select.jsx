import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import { withHandlers } from 'recompose'
import { COLORS } from 'semantic-ui-react/dist/es/lib/SUI'

const colorOptions = COLORS.map(color => ({
  key: color,
  text: color,
  value: color,
  label: { color: color, empty: true, circular: true },
}))

export const ColorSelect = withHandlers({
  handleChange: ({ onChange }) => (ev, el) => {
    ev.target.name = "color"
    ev.target.value = el.value
    onChange && onChange(ev)
  }
})(({ handleChange, value }) => (
  <Button.Group fluid color={value}>
    <Dropdown name="color" value={value} button fluid onChange={handleChange} options={colorOptions} />
  </Button.Group>
))