import React from 'react'
import { CardItemDraggable, CardItemPreview } from 'components/card/Card.Item.Drag'
import { compose, defaultProps } from 'recompose'
import { DropTarget } from 'react-dnd'

export const DroppableSortableCardList = compose(
  defaultProps({
    cardStyle: { width: '100%' }
  }),
  DropTarget('CARD', {
    hover: (target, monitor) => {
      const source = monitor.getItem()
  
      if (source == null) {
        return //prevent bug
      }
  
      if (source.listId !== target.listId) {
        target.onCardMovingToList && target.onCardMovingToList(source, target)
        source.listId = target.listId
        source.position = target.cards.length + 1
      }
    }
  }, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(class WrapperDroppableSortableCardList extends React.PureComponent {

  render() {
    const { connectDropTarget, cards, onCardMoving, onBeginDrag, cardStyle, onEndDrag, draggingId } = this.props
    return connectDropTarget(
      <div style={{ flex: "1 1 auto" }}>
        {cards?.map(card => (
          <CardItemDraggable 
            {...card}
            key={card.id}
            isDragging={card.id == draggingId}
            style={cardStyle}
            onCardMoving={onCardMoving} 
            onBeginDrag={onBeginDrag}
            onEndDrag={onEndDrag}
          />
        ))}
        <CardItemPreview key="__preview" name="CARD" />
      </div>
    )
  }
})
