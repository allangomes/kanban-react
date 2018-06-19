import React from 'react'
import { Card } from 'semantic-ui-react'
import css from './Board.Item.scss'

export const BoardItem = ({ id, color, title, description, href }) => (
  <Card key={id} color={color} className={css.root} href={href} >
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
)
