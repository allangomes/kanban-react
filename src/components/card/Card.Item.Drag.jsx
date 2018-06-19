import React from 'react'
import { findDOMNode } from 'react-dom'
import { throttle } from 'lodash'
import { DropTarget, DragSource, DragLayer } from 'react-dnd'
import { compose } from "recompose"
import { CardItem } from './Card.Item'
import css from './Card.Item.scss'

const CardDragName = "CARD"

@DropTarget(CardDragName, {
  //throttle for prevent call in exceeed.
  hover: throttle((target, monitor: DropTargetMonitor, component) => {
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
  }, 100),
  drop(props) {
    props.onEndDrag && props.onEndDrag(props.id)
  }
}, (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  })
)
@DragSource(CardDragName, {
  beginDrag(props) {
    props.onBeginDrag && props.onBeginDrag(props.id)
    return {
      id: props.id,
      title: props.title,
      listId: props.listId,
      position: props.position
    }
  },
  isDragging(...props) {
    console.log("isDragging", ...props)
  },
  endDrag(props) {
    props.onEndDrag && props.onEndDrag(props.id)
  }
}, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource()
  })
)
export class CardItemDraggable extends React.PureComponent {

  render() {
    const { connectDragSource, connectDropTarget, connectDragPreview, isDragging, ...props } = this.props
    const opacity = isDragging ? 0 : 1
    return compose(
      connectDropTarget,
      connectDragSource
    )(
      <div style={{ width: '100%', opacity }}>
        <CardItem {...props} />
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
  // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
  var x = currentOffset.x;
  var y = currentOffset.y;
  var transform = `translate(${x}px, ${y}px)`;

  return {
    pointerEvents: 'none',
    transform: transform,
    WebkitTransform: transform
  };
}

@DragLayer((monitor) => {
  var item = monitor.getItem();
  return {
      id: item && item.id,
      title: item && item.title,
      listId: item && item.listId,
      position: item && item.position,
      currentOffset: monitor.getSourceClientOffset()
  }
})
export class CardItemPreview extends React.Component {

  render() {
    const { currentOffset, ...props } = this.props
    return (
      <div className={css.card_preview} style={getItemStyles(currentOffset)}>
        <CardItem {...props} />
      </div>
    )
  }

}
