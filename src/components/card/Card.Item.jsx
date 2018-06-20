import React from 'react'
import cls from 'classnames'
import { Card, Label } from 'semantic-ui-react'
import css from './Card.Item.scss'

export const CardItem = ({ className, title, description, color, style }) => (
  <Card color={color} className={cls(css.card, className)} style={style}>
    <Card.Content>
      <Card.Header className={css.card_header}>
        <h4 className={css.card_title}>{title}</h4>
        <div className={css.card_labels}>
          <Label circular empty color="red" />
          <Label circular empty color="green" />
          <Label circular empty color="orange" />
        </div>
      </Card.Header>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
)
