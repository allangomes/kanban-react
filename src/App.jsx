import './App.scss'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { DragDropContextProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import { ConnectedRouter } from 'react-router-redux'
import { Redux } from 'app/redux'
import { history } from 'app/redux/store'
import { BoardsPage } from './views/Boards.Page'
import { BoardPage } from './views/Board.Page'

export const App = () => (
  <Redux>
    <DragDropContextProvider backend={TouchBackend({ enableMouseEvents: true, enableKeyboardEvents: true })}>
      <ConnectedRouter history={history}>
        <Switch>
          <Redirect from="/" exact to="/boards" />
          <Route path="/boards" component={BoardsPage} />
          <Route path="/board/:boardId" component={BoardPage} />
        </Switch>
      </ConnectedRouter>
    </DragDropContextProvider>
  </Redux>
)
