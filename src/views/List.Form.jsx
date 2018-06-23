import React from 'react'
import { withFormik } from 'formik'
import { compose } from 'recompose'
import { Link, withRouter } from 'react-router-dom'
import { Modal, Button, Icon } from 'semantic-ui-react'
import { ListForm as Form } from 'components/list'
import { api, urls } from 'app/api'

async function saveList(list, { setSubmitting, setErrors, resetForm, props }) {
  const { history, backTo, onSaveSuccess } = props
  try {
    const { data } = await api.post(urls.lists(list.boardId), list)
    resetForm()
    history.goBack(backTo)
    onSaveSuccess && onSaveSuccess(data)
  } catch (error) {
    setSubmitting(false)
    setErrors(error)
  }
}

export const ListForm = compose(
  withRouter,
  withFormik({
    mapPropsToValues: ({ boardId }) => ({ color: 'grey', boardId }),
    handleSubmit: saveList
  })
)(({ backTo, handleSubmit, isSubmitting, ...props }) => 
  <Modal open style={{ top: 30 }}>
    <Modal.Header icon='browser' content="New List" />
    <Modal.Content>
      <Form {...props} />
    </Modal.Content>
    <Modal.Actions>
      <Link to={backTo || '..'}>
        <Button><Icon name='close' /> Cancel</Button>
      </Link>
      <Button type="submit" onClick={handleSubmit} positive disabled={isSubmitting}>
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>
)
