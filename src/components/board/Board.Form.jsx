import React from 'react'
import { Prompt } from 'react-router-dom'
import { Form, Dropdown, Button } from 'semantic-ui-react'
import { COLORS } from 'semantic-ui-react/src/lib/SUI'

const colorOptions = COLORS.map(color => ({
  key: color,
  text: color,
  value: color,
  label: { color: color, empty: true, circular: true },
}))

export class BoardForm extends React.PureComponent {

  handleColorChange = (ev, el) => {
    const { handleChange } = this.props
    ev.target.name = "color"
    ev.target.value = el.value
    handleChange(ev)
  }

  render() {
    const { dirty, handleSubmit, handleChange, values, ...props } = this.props
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
              <Form.Input name="title" fluid label="Title" placeholder="Title" value={values.title} onChange={handleChange} />
              <Form.Field width="3">
                <label>Color</label>
                <Button.Group fluid color={values.color}>
                  <Dropdown name="color" value={values.color} button fluid onChange={this.handleColorChange} options={colorOptions} />
                </Button.Group>
              </Form.Field>
          </Form.Group>
          <Form.TextArea name="description" label="Description" placeholder="Description..." value={values.description} onChange={handleChange} />
        </Form>
        <p style={{ color: 'red' }}>{props?.errors?.message}</p>
        <Prompt when={dirty} message="Are you sure you want to leave?"/>
      </>
    )
  }
}