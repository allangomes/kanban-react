import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Button } from 'semantic-ui-react'
import css from './List.List.scss'

export const ListList = ({ loading, children, title, color, hrefNewCard }) => (
  <Segment.Group raised className={css.list} >
    <Segment color={color} className={css.list_header} inverted>
      <h4>{title}</h4>
      {hrefNewCard && (<Link to={hrefNewCard}><Button circular compact icon="add" /></Link>)}
    </Segment>
    <Segment className={css.list_content} loading={loading}>
      {children}
    </Segment>
  </Segment.Group>
)