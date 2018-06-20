const API = `http://localhost:3001/games`
const MOVES = `http://localhost:3001/moves`

const headers = {
  Accepts: 'application/json',
  'Content-Type': 'application/json'
}

const updateBoard = (gameId, boardObj) => {
  return fetch(`${API}/${gameId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({current_game_board: boardObj})
  }).then(resp => resp.json()).then(json => console.log('PATCH',json))
}

const fetchBoard = gameId => {
  return fetch(`${API}/${gameId}`).then(resp => resp.json())
}

const createMove = (state) => {
  return fetch(`${MOVES}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({board_id: 1, previous_position: state.previousPosition, new_position: state.newPosition})
  })
}

const createBoard = (boardObj) => {
  return fetch(`${API}/`, {
    method: 'POST',
    headers,
    body: {current_game_board: (JSON.stringify(boardObj))}
  }).then(resp => resp.json()).then(json => console.log(json))
}
export default {updateBoard, fetchBoard, createBoard, createMove};
