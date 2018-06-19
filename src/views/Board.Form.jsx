import React from 'react'
import { withFormik } from 'formik'
import { Link, withRouter } from 'react-router-dom'
import { Modal, Button, Icon } from 'semantic-ui-react'
import { BoardForm as Form } from 'components/board'
import { api, urls } from 'app/api'

async function saveBoard(board, { setSubmitting, setErrors, resetForm, props }) {
  const { history, backTo, onSaveSuccess } = props
  console.log(props)
  try {
    const { data } = await api.post(urls.boards, board)
    resetForm()
    history.goBack(backTo)
    onSaveSuccess && onSaveSuccess(data)
  } catch (error) {
    setSubmitting(false)
    setErrors(error)
  }
}

@withRouter
@withFormik({
  mapPropsToValues: () => ({ color: 'grey' }),
  handleSubmit: saveBoard
})
export class BoardForm extends React.PureComponent {

  render() {
    const { location, handleSubmit, isSubmitting, ...props } = this.props
    return (
      <Modal open style={{ top: 30 }}>
        <Modal.Header icon='browser' content="New Board" />
        <Modal.Content>
          <Form {...props} />
        </Modal.Content>
        <Modal.Actions>
          <Link to={location?.query?.backTo || '..'}>
            <Button><Icon name='close' /> Cancel</Button>
          </Link>
          <Button type="submit" onClick={handleSubmit} positive disabled={isSubmitting}>
            <Icon name='checkmark' /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}