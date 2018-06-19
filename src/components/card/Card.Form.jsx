import React from "react"
import { Form } from "semantic-ui-react"

export const CardForm = ({ handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <input type="hidden" name="listId" onChange={handleChange} />
    <input type="hidden" name="boardId" onChange={handleChange} />
    <Form.Group widths='equal'>
      <Form.Input name="title" fluid label='Titulo' placeholder='Titulo' onChange={handleChange} />
      <Form.Input name="color" fluid label='Cor' placeholder='Cor' onchange={handleChange} />
    </Form.Group>
    <Form.TextArea name="description" label='Description' placeholder='Description...' onChange={handleChange} />
  </Form>
)
