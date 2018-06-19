import React from 'react'
import { Card, Label } from 'semantic-ui-react'
import css from './Card.Item.scss'

export const CardItem = ({ title, description, color }) => (
  <Card color={color} className={css.card} style={{ width: '100%' }}>
    <Card.Content>
      <Card.Header className={css.card_header}>
        <h3 className={css.card_title}>{title}</h3>
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
