import axios from 'axios'
import urlJoin from 'url-join'
import { connect } from 'react-refetch'

export const api = axios.create({
  baseURL: "http://localhost:4000/api"
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
  boards: `/board`,
  board: (boardId) => `/board/${boardId}`,
  lists: (boardId) => `/board/${boardId}/list`,
  list: (boardId, id) => `/board/${boardId}/list/${id}`,
  cards: (boardId) => `/board/${boardId}/card`,
  card: (boardId, id) => `/board/${boardId}/card/${id}`
}