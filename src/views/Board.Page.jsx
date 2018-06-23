import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { map, sortBy, prop, filter, throttle } from 'lodash/fp'
import { refetch, urls } from 'app/api'
import { compose, mapProps, withHandlers, withState, lifecycle, pure } from 'recompose'
import { from } from 'seamless-immutable'
import { Segment, Label, Breadcrumb, Button, Grid } from 'semantic-ui-react'
import { ListList, DroppableSortableCardList } from 'components/list'
import css from './Board.Page.scss'
import { CardForm } from './Card.Form'
import { ListForm } from './List.Form'

const Lists = (({ sort, boardId, lists, cards, draggingId, onCardMoving, onCardMovingToList, onBeginDrag, onEndDrag }) => {
  const cardsOfList = (listId) => filter(card => card.listId == listId)

  return map((list) => {
    const hrefNewCard = { pathname: `/board/${boardId}/cards/new`, query: { listId: list.id }}
    const filteredCards = sort(cardsOfList(list.id)(cards))
    return (
      <ListList key={list.id} {...list} hrefNewCard={hrefNewCard} loading={cards?.pending} >
        <DroppableSortableCardList 
          draggingId={draggingId}
          listId={list.id}
          cards={filteredCards}
          onBeginDrag={onBeginDrag}
          onEndDrag={onEndDrag}
          onCardMoving={onCardMoving}
          onCardMovingToList={onCardMovingToList}
        />
      </ListList>
    )
  })(lists.value?.data)
})


window.from = from

export const BoardPage = compose(
  withRouter,
  mapProps(({ match, location }) => ({
    location,
    boardId: match.params.boardId,
    listId: match.params.boardId,
    sortProperty: prop("position"),
  })),
  mapProps(({ sortProperty, ...rest }) => ({
    ...rest,
    sortProperty,
    sort: sortBy(sortProperty)
  })),

  refetch(({ boardId }) => ({
    board: urls.board(boardId),
    lists: urls.lists(boardId),
    cardsFetched: urls.cards(boardId),
    refreshLists: () => ({ lists: { url: urls.lists(boardId), force: true } }),
    refreshCards: () => ({ cards: { url: urls.cards(boardId), force: true } })
  })),
  
  withState('cards', 'setCards', from({ pending: true })),

  lifecycle({
    componentWillReceiveProps: ({ cards, cardsFetched, setCards }) => {
      if (cards.pending && !cardsFetched.pending) {
        setCards(from(cardsFetched.value.data))
      }
    }
  }),
  withState('draggingId', 'setDraggingId', 0),

  withHandlers({
    handleCardMoving: throttle(100, ({ cards, setCards, sortProperty }) => (source, target) => {
      const sourcePosition = sortProperty(source)
      const targetPosition = sortProperty(target)

      if (sourcePosition == targetPosition) {
        return
      }
  
      const op = sourcePosition < targetPosition ? -1 : 1
      const minPos = Math.min(sourcePosition, targetPosition)
      const maxPos = Math.max(sourcePosition, targetPosition)
  
      const cardsUpdated = cards.map(el => {
        if (el.listId == target.listId) {
          if (el.position == sourcePosition) {
            return el.set('position', targetPosition)
          } else if (el.position >= minPos && el.position <= maxPos) {
            return el.set('position', el.position + op)
          }
        }
        return el
      })
      setCards(cardsUpdated)
    }),
    handleCardMovingToList: throttle(100, ({ cards, setCards }) => (source, target) => {
      if (source.listId == target.listId) {
        return
      }
      const newCards = cards.map(card => {
        if (card.listId == source.listId && card.position > source.position) {
          return card.set('position', card.position - 1)
        }
        if (card.id == source.id) {
          return card
            .set('listId', target.listId)
            .set('position', target.cards.length + 1)
        }
        return card
      })
      setCards(newCards)
    }),
    handleBeginDrag: ({ setDraggingId }) => setDraggingId,
    handleEndDrag: ({ setDraggingId }) => () => setDraggingId(0)
  })
)(({ sort, boardId, board, lists, cards, draggingId, refreshLists, refreshCards, handleCardMoving, handleCardMovingToList, handleBeginDrag, handleEndDrag }) => (
  <>
    <Segment.Group raised className={css.root}>
      <Segment loading={board.pending}>
        <Grid>
          <Grid.Column width="12" verticalAlign="middle">
            <Label size="large" color={board.value?.color} ribbon basic>
            <Breadcrumb>
              <Breadcrumb.Section><Link to="/">Home</Link></Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section><Link to="/boards">Boards</Link></Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section active>{board.value?.title}</Breadcrumb.Section>
            </Breadcrumb>
            </Label>
          </Grid.Column>
          <Grid.Column  width="4" verticalAlign="middle" textAlign="right">
            <Link to={`/board/${boardId}/lists/new`} >
              <Button circular icon="add" color={board?.value?.color} floated="right" />
            </Link>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment raised loading={lists.pending} className={css.main_segment}>
        <div className={css.main_segment_scroller}>
          <Lists 
            sort={sort}
            boardId={boardId}
            lists={lists}
            cards={cards}
            draggingId={draggingId}
            onBeginDrag={handleBeginDrag}
            onEndDrag={handleEndDrag}
            onCardMoving={handleCardMoving}
            onCardMovingToList={handleCardMovingToList} />
        </div>
      </Segment>
    </Segment.Group>
    <Route path="/board/:boardId/lists/new" render={() => (
      <ListForm backTo={`/board/${boardId}`} boardId={boardId} onSaveSuccess={refreshLists} />
    )}/>
    <Route path="/board/:boardId/cards/new" render={({ location }) => (
      <CardForm backTo={`/board/${boardId}`} boardId={boardId} listId={location.query?.listId} onSaveSuccess={refreshCards} />
    )}/>
  </>
))
