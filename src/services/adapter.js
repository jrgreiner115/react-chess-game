const GAME = `http://localhost:3001/games`
const MOVES = `http://localhost:3001/moves`
const USER = `http://localhost:3001/users`
let gameId = 1
const headers = {
  Accepts: 'application/json',
  'Content-Type': 'application/json'
}

const updateBoard = (game_Id, boardObj) => {
  return fetch(`${GAME}/${game_Id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({current_game_board: boardObj})
  }).then(resp => resp.json()).then(json => console.log('PATCH',json))
}

const fetchBoard = gameId => {
  return fetch(`${GAME}/${gameId}`).then(resp => resp.json())
}

const createMove = (state) => {
  return fetch(`${MOVES}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({game_id: gameId, previous_position: state.previousPosition, new_position: state.newPosition})
  })
}

const createGame = (id) => {
  return fetch(`${GAME}/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({player_id_white: id})
  }).then(resp => resp.json())
}

const getGame = () => {
  return fetch(`${GAME}/${gameId}`).then(resp => resp.json()).then(json => console.log(json))
}
const getGames = () => {
  return fetch(`${GAME}/`).then(resp => resp.json())
}

const createUser = (state) => {
  return fetch(`${USER}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({name: state.name})
  }).then(resp => resp.json())
}

const joinGame = (gameId, userId) => {
  return fetch(`${GAME}/${gameId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({player_id_black: userId})
  }).then(resp => resp.json())
}



export default {updateBoard, fetchBoard, createGame, createMove, gameId, getGame, getGames, joinGame, createUser};
