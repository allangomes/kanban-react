import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapValues } from 'lib/ramda'
import { Segment, Label, Card, Button, Modal } from 'semantic-ui-react'
import { BoardItem } from 'components/board'
import { BoardForm } from './Board.Form'
import { context } from 'app/db'
import * as selectors from 'store/board/selector'
import css from './Boards.Page.scss'

const BoardList = mapValues((board) => (
  <BoardItem {...board} key={board.id} href={`#/board/${board.id}`} />
))

@connect(
  (state) => ({
    loading: context.loading(state),
    boards: selectors.all(state)
  })
)
export class BoardsPage extends React.PureComponent {

  render() {
    const { boards, loading, match, location } = this.props
    return (
      <>
        <Segment.Group raised className={css.root}>
          <Segment>
            <Label as="a" size="large" ribbon>Quadros</Label>
            <Link to={{ pathname: '/boards/new', query: { backTo: match.path} }}>
              <Button circular icon="add" />
            </Link>
          </Segment>
          <Segment raised className={css.main_segment} loading={loading}>
            <Card.Group className={css.card_group}>
              {BoardList(boards)}
            </Card.Group>
          </Segment>
        </Segment.Group>
        <Route path="/boards/new" component={BoardForm} />
      </>
    )
  }
}
