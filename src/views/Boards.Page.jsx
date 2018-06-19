import React from 'react'
import { Route, Link } from 'react-router-dom'
import { map } from 'lodash/fp'
import { Segment, Label, Card, Button } from 'semantic-ui-react'
import { BoardItem } from 'components/board'
import { refetch, urls } from 'app/api'
import { BoardForm } from './Board.Form'
import css from './Boards.Page.scss'
import { withHandlers, compose, withProps } from 'recompose'

const BoardList = map((board) => (
  <BoardItem {...board} key={board.id} href={`#/board/${board.id}`} />
))

@refetch(() => {
  return {
    boards: urls.boards,
    refreshBoards: () => ({
      boards: { url: urls.boards, force: true }
    })
  }
})
export class BoardsPage extends React.PureComponent {

  handleSaveSuccess = (data) => {
    const { refreshBoards } = this.props
    refreshBoards()
  }

  BoardForm = compose(
    withProps({
      backTo: this.props.match.path
    }),
    withHandlers(() => ({
      onSaveSuccess: () => this.handleSaveSuccess
    }))
  )(BoardForm)

  render() {
    const { boards } = this.props
    return (
      <>
        <Segment.Group raised className={css.root}>
          <Segment>
            <Label as="a" size="large" ribbon>Quadros</Label>
            <Link to="/boards/new">
              <Button circular icon="add" />
            </Link>
          </Segment>
          <Segment raised className={css.main_segment} loading={boards.pending}>
            <Card.Group className={css.card_group}>
              {BoardList(boards.value?.data)}
            </Card.Group>
          </Segment>
        </Segment.Group>
        <Route path="/boards/new" component={this.BoardForm} />
      </>
    )
  }
}
