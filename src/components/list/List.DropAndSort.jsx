import React from 'react'
import { CardItemDraggable, CardItemPreview } from 'components/card/Card.Item.Drag'
import { DropTarget } from 'react-dnd'
import { throttle } from 'lodash/fp'

@DropTarget('CARD', {
  hover: throttle(100, (target, monitor, component) => {
    const source = monitor.getItem()

    if (source == null) {
      return //prevent bug
    }

    if (source.listId !== target.listId) {
      target.movingCardToList(source, target)
      source.listId = target.listId
      source.position = target.cards.length + 1
    }
  })
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
export class DroppableSortableCardList extends React.Component {

  renderCards() {
    const { cards, onMoving, onBeginDrag, onEndDrag, isOver, dragging } = this.props
    const elements = cards?.map(card => (
      <CardItemDraggable 
        {...card}
        isDragging={isOver && card.id == dragging}
        style={{ width: '100%' }}
        key={card.id} 
        moving={onMoving} 
        onBeginDrag={onBeginDrag}
        onEndDrag={onEndDrag}
      />
    ))
    return [...elements, <CardItemPreview key="__preview" name="CARD" />]
  }

  render() {
    const { connectDropTarget, ...props } = this.props
    return connectDropTarget(
      <div style={{ flex: "1 1 auto" }}>
        {this.renderCards()}
      </div>
    )
  }
}