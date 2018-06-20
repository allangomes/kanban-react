import React from 'react'
import { withFormik } from 'formik'
import { Link, withRouter } from 'react-router-dom'
import { Modal, Button, Icon } from 'semantic-ui-react'
import { CardForm as Form } from 'components/card'
import { api, urls } from 'app/api'

async function saveCard(card, { setSubmitting, setErrors, resetForm, props }) {
  const { history, backTo, onSaveSuccess } = props
  try {
    const { data } = await api.post(urls.cards(card.boardId), card)
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
  mapPropsToValues: ({ boardId, listId }) => ({ color: 'grey', boardId, listId }),
  handleSubmit: saveCard
})
export class CardForm extends React.PureComponent {

  render() {
    const { location, handleSubmit, isSubmitting, ...props } = this.props
    return (
      <Modal open style={{ top: 30 }}>
        <Modal.Header icon='browser' content="New Card" />
        <Modal.Content>
          <Form {...props} />
        </Modal.Content>
        <Modal.Actions>
          <Link to={location?.query?.backTo || '../'}>
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