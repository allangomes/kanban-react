import './App.scss'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { DragDropContextProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import { BoardsPage } from './views/Boards.Page'
import { BoardPage } from './views/Board.Page'

export const App = () => (
  <DragDropContextProvider backend={TouchBackend({ enableMouseEvents: true })}>
    <HashRouter>
      <Switch>
        <Redirect from="/" exact to="/boards" />
        <Route path="/boards" component={BoardsPage} />
        <Route path="/board/:boardId" component={BoardPage} />
      </Switch>
    </HashRouter>
  </DragDropContextProvider>
)
