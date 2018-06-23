import React from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { map } from 'lodash/fp'
import { Segment, Label, Card, Button, Grid, Breadcrumb, BreadcrumbSection } from 'semantic-ui-react'
import { compose, withHandlers } from 'recompose'
import { BoardItem } from 'components/board'
import { refetch, urls } from 'app/api'
import { BoardForm } from './Board.Form'
import css from './Boards.Page.scss'

const BoardList = ({ boards }) => map(board =>
  <BoardItem {...board} key={board.id} href={`#/board/${board.id}`} />
)(boards)

export const BoardsPage = compose(
  refetch(() => ({
    boards: urls.boards,
    refreshBoards: () => ({
      boards: { url: urls.boards, force: true }
    })
  })),
  withHandlers({
    renderForm: ({ match, refreshBoards }) => () => (
      <BoardForm backTo={match.path} onSaveSuccess={refreshBoards} />
    )
  })
)(({ boards, renderForm }) =>
  <>
    <Segment.Group raised className={css.root}>
      <Segment>
        <Grid>
          <Grid.Column width="12" verticalAlign="middle">
            <Label size="large" ribbon basic>
              <Breadcrumb>
                <Breadcrumb.Section><Link to="/">Home</Link></Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section active>Boards</Breadcrumb.Section>
              </Breadcrumb>
            </Label>
          </Grid.Column>
          <Grid.Column  width="4" verticalAlign="middle" textAlign="right">
            <Link to="/boards/new">
              <Button circular icon="add" primary />
            </Link>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment raised className={css.main_segment} loading={boards.pending}>
        <Card.Group className={css.card_group}>
          <BoardList boards={boards.value?.data} /  >
        </Card.Group>
      </Segment>
    </Segment.Group>
    <Route path="/boards/new" render={renderForm} />
  </>
)