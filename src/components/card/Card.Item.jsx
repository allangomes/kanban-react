import React from 'react'
import cls from 'classnames'
import { Card } from 'lib/semantic'
import css from './Card.Item.scss'

export const CardItem = ({ className, title, description, color, style }) => (
  <Card color={color} className={cls(css.card, className)} style={style}>
    <Card.Content>
      <Card.Header className={css.card_header}>
        <h4 className={css.card_title}>{title}</h4>
        {/*<div className={css.card_labels}> implementar labels no backend
         <PureLabel circular empty color="red" />
         <PureLabel circular empty color="green" />
         <PureLabel circular empty color="orange" />
        </div>*/}
      </Card.Header>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
)
