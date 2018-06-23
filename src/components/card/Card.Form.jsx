import React from 'react'
import { Prompt } from 'react-router-dom'
import { Form } from 'lib/semantic'
import { ColorSelect } from 'components/shared'

export const CardForm = ({ dirty, handleSubmit, handleChange, values, ...props }) => (
  <>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input name="title" tabIndex={0} fluid label="Title" placeholder="Title" value={values.title} onChange={handleChange} />
        <Form.Field width="3">
          <label>Color</label>
          <ColorSelect tabIndex={1} value={values.color} onChange={handleChange} />
        </Form.Field>
      </Form.Group>
      <Form.TextArea tabIndex={2} name="description" label="Description" placeholder="Description..." value={values.description} onChange={handleChange} />
    </Form>
    <p style={{ color: 'red' }}>{props?.errors?.message}</p>
    <Prompt when={dirty} message="Are you sure you want to leave?"/>
  </>
)