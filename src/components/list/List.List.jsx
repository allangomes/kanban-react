import React from 'react'
import { Segment, Button } from 'semantic-ui-react'
import css from './List.List.scss'

export const ListList = ({ loading, children, title, color, cards }) => (
  <Segment.Group raised className={css.list} >
    <Segment color={color} className={css.list_header} inverted>
      <h4>{title}</h4>
      <Button circular icon="add" onClick={() => console.log(cards)} /> 
    </Segment>
    <Segment className={css.list_content} loading={loading}>
      {children}
    </Segment>
  </Segment.Group>
)