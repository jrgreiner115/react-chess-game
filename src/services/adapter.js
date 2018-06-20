const GAME = `http://localhost:3001/games`
const MOVES = `http://localhost:3001/moves`
const USER = `http://localhost:3001/users`
let gameId = 0
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

const createGame = () => {
  return fetch(`${GAME}/`, {
    method: 'POST',
    headers }).then(resp => resp.json())
    .then(json => gameId = json.id)
    .then(json => console.log(gameId))
}

const getGame = () => {
  return fetch(`${GAME}/${gameId}`).then(resp => resp.json()).then(json => console.log(json))
}

const createUser = (state) => {
  return fetch(`${USER}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({name: state.name})
  }).then(resp => resp.json()).then(json => console.log(json))
}



export default {updateBoard, fetchBoard, createGame, createMove, gameId, getGame, createUser};
