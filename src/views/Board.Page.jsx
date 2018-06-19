import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapValues } from 'lib/ramda'
import { api } from 'app/api'
import { sortBy, prop } from 'ramda'
import { from } from 'seamless-immutable'
import { Segment, Label, Breadcrumb } from 'semantic-ui-react'
import { ListList, DroppableSortableCardList } from 'components/list'
import { connect as refetch } from 'react-refetch'
import css from './Board.Page.scss'

@connect(
  (_, { match }) => ({
    boardId: match.params.boardId
  })
)
@refetch(({ boardId }) => ({
  board: `${api.defaults.baseURL}/board/${boardId}`,
  lists: `${api.defaults.baseURL}/board/${boardId}/list`,
  cards: `${api.defaults.baseURL}/board/${boardId}/card`
}))
export class BoardPage extends React.PureComponent {

  sortProperty = prop("position")
  sort = sortBy(this.sortProperty)

  state = {
    dragging: 0,
    cards: from([])
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.cards.length !== nextProps.cards?.value?.data?.length) {
      return {
        cards: from(nextProps.cards?.value?.data || [])
      }
    }
    return prevState
  }

  handleBeginDrag = (id) => {
    this.setState({ dragging: id })
  }

  handleEndDrag = (id) => {
    this.setState({ dragging: 0 })
  }

  movingCard = (source, target) => {
    const sourcePosition = this.sortProperty(source)
    const targetPosition = this.sortProperty(target)

    const op = sourcePosition < targetPosition ? -1 : 1
    const minPos = Math.min(sourcePosition, targetPosition)
    const maxPos = Math.max(sourcePosition, targetPosition)

    const cardsUpdated = this.state.cards.map(el => {
      if (el.listId == target.listId) {
        if (el.position == sourcePosition) {
          return el.set('position', targetPosition)
        } else if (el.position >= minPos && el.position <= maxPos) {
          return el.set('position', el.position + op)
        }
      }
      return el
    })

    this.setState({
      cards: cardsUpdated
    })
	}

  movingCardToList = (source, target) => {
    if (source.listId == target.listId) {
      return
    }
    const { cards } = this.state
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

    this.setState({
      cards: newCards
    })
  }

  renderLists() {
    const { lists } = this.props
    const { cards, dragging } = this.state

    const cardsOfList = (listId) => this.sort(cards.filter(card => card.listId == listId))

    return mapValues((list) => {
      const filteredCards = cardsOfList(list.id)
      return (
        <ListList key={list.id} {...list} cards={filteredCards} loading={this.props.cards.pending} >
          <DroppableSortableCardList 
            dragging={dragging}
            listId={list.id} 
            cards={filteredCards} 
            onMoving={this.movingCard} 
            onBeginDrag={this.handleBeginDrag} 
            onEndDrag={this.handleEndDrag} 
            movingCardToList={this.movingCardToList} 
          />
        </ListList>
      )
    })(lists.value?.data || [])
  }

  render() {
    const { board, lists } = this.props
    return (
      <>
        <Segment.Group raised className={css.root}>
          <Segment loading={board.pending}>
            <Label as="a" size="large" color={board.value?.color} ribbon>Quadro</Label>
              <Breadcrumb>
                <Breadcrumb.Section link><Link to="/">Home</Link></Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section link><Link to="/boards">Boards</Link></Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>{board.value?.title}</Breadcrumb.Section>
              </Breadcrumb>
          </Segment>
          <Segment raised loading={lists.pending} className={css.main_segment}>
            <div className={css.main_segment_scroller}>
              {this.renderLists()}
            </div>
          </Segment>
        </Segment.Group>
      </>
    )
  }
}
