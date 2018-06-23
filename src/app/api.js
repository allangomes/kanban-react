import axios from 'axios'
import urlJoin from 'url-join'
import { connect } from 'react-refetch'

export const api = axios.create({
  baseURL: "http://192.168.25.7:3000"
})

export const refetch = connect.defaults({
  buildRequest: function (mapping) {
    const options = {
      method: mapping.method,
      headers: mapping.headers,
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      mode: mapping.mode,
      body: mapping.body
    }

    return new Request(urlJoin(api.defaults.baseURL, mapping.url), options)
  }
})

export const urls = {
  boards: `/boards`,
  board: (boardId) => `/boards/${boardId}`,
  lists: (boardId) => `/boards/${boardId}/lists`,
  list: (boardId, id) => `/boards/${boardId}/lists/${id}`,
  cards: (boardId) => `/boards/${boardId}/cards`,
  card: (boardId, id) => `/boards/${boardId}/cards/${id}`
}