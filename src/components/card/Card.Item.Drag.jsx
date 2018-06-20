import React from 'react'
import cls from 'classnames'
import { findDOMNode } from 'react-dom'
import { throttle } from 'lodash/fp'
import { DropTarget, DragSource, DragLayer } from 'react-dnd'
import { compose } from "recompose"
import { CardItem } from './Card.Item'
import css from './Card.Item.scss'

const CardDragName = "CARD"

@DropTarget(CardDragName, {
  //throttle for prevent call in exceeed.
  hover: throttle(100, (target, monitor, component) => {
    const source = monitor.getItem()
    if (source == null) {
      return //prevent bug
    }
    if (source.listId !== target.listId) {
      return
    }
    // Prevent change position unnecessarily
    if (source.position == target.position) {
      return
    }

    // Determine mouse position
    const mouseOffset = monitor.getClientOffset()

    // Determine rectangle on screen
    const targetBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const targetMiddleY = (targetBoundingRect.bottom - targetBoundingRect.top) / 2

    // Pegar a posição Y do [Card Alvo]
    // Get pixels to the top
    const targetClientY = mouseOffset.y - targetBoundingRect.top

    
    // Quando o [Card de Drag] está acima e tambem está acima do centro do [Card Alvo].
    // When [source card] is above and also is above the center [Target Card].
    if (source.position < target.position && targetClientY < targetMiddleY) {
      return
    }

    // Quando o [Card de Drag] está abaixo e tambem está abaixo do centro do [Card Alvo].
    // When [Source Card] is below and also is below the center of the [Target Card]
    if (source.position > target.position && targetClientY > targetMiddleY) {
      return
    }

    target.moving(source, target)

    // to prevent calling the setState() of the component multiple times, I make the mutation passing the new position to the source element
    source.position = target.position
  }),
  drop(props) {
    props.onEndDrag && props.onEndDrag(props.id)
  }
}, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)
@DragSource(CardDragName, {
  beginDrag(props, _, component) {
    const boundingRect = findDOMNode(component).getBoundingClientRect()
    props.onBeginDrag && props.onBeginDrag(props.id)
    return { 
      ...props,
      boundingRect
    }
  },
  endDrag(props) {
    props.onEndDrag && props.onEndDrag(props.id)
  }
}, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  })
)
export class CardItemDraggable extends React.PureComponent {

  render() {
    const { connectDragSource, connectDropTarget, connectDragPreview, isDragging, className, ...props } = this.props
    const classes = cls(className, { [css.dragging]: isDragging } )
    return compose(
      connectDropTarget,
      connectDragSource
    )(
      <div style={{ width: '100%' }}>
        <CardItem className={classes} {...props} />
      </div>
    )
  }
}

function getItemStyles(currentOffset) {
  if (!currentOffset) {
      return {
          display: 'none'
      };
  }

  var x = currentOffset.x;
  var y = currentOffset.y;
  var transform = `translate(${x}px, ${y}px) rotate(0.01turn)`;

  return {
    pointerEvents: 'none',
    transform: transform,
    WebkitTransform: transform
  };
}

@DragLayer((monitor) => {
  var item = monitor.getItem();
  return {
      ...item,
      currentOffset: monitor.getSourceClientOffset()
  }
})
export class CardItemPreview extends React.Component {

  render() {
    const { currentOffset, boundingRect, ...props } = this.props
    return (
      <div className={css.card_preview} style={getItemStyles(currentOffset)}>
        <CardItem {...props} style={{ width: boundingRect?.width }} />
      </div>
    )
  }

}
