import React from 'react'
import { Form } from 'semantic-ui-react'

export const ListForm = ({  }) => (
  <Form>
    <input type="hidden" name="boardId" />
    <Form.Group widths='equal'>
      <Form.Input name="title" fluid label='Titulo' placeholder='Titulo' />
      <Form.Input name="color" fluid label='Cor' placeholder='Cor' />
    </Form.Group>
    <Form.TextArea name="description" label='Description' placeholder='Description...' />
  </Form>
)