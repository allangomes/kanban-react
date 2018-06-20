import React from 'react'
import { Route, Link } from 'react-router-dom'
import { map } from 'lodash/fp'
import { Segment, Label, Card, Button, Grid, Breadcrumb } from 'semantic-ui-react'
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

  render() {
    const { boards, match, refreshBoards } = this.props
    return (
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
              {BoardList(boards.value?.data)}
            </Card.Group>
          </Segment>
        </Segment.Group>
        <Route path="/boards/new" render={() => 
          <BoardForm backTo={match.path} onSaveSuccess={refreshBoards} />
        }/>
      </>
    )
  }
}
