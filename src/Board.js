import React from 'react';
import Piece from './Piece.js'

export default class Board extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      board:[
        ['rookB','bishopB','nightB','queenB','kingB','nightB','bishopB','rookB'],
        ['pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW'],
        ['rookW','bishopW','nightW','queenW','kingW','nightW','bishopW','rookW']
      ],
      selectedPiece: null,
      selectedCoords: null,
    }

  }

  reset(){
    this.setState({
      board:[
        ['rookB','bishopB','nightB','queenB','kingB','nightB','bishopB','rookB'],
        ['pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW'],
        ['rookW','bishopW','nightW','queenW','kingW','nightW','bishopW','rookW']
      ]
    })
  }

  makeBoard(){

    let board = [];
    //for each row
    for (let x = 0; x<8;x++){
      //each piece in the row
      let row = []
      for (let y = 0; y<8;y++){
        row.push( <td id={`${x}`+y}
                     className={'tile dropzone ' + ( ((y+x)%2 === 0) ? 'white' : 'black')}
                     onDrop={ this.actionTarget}
                     onDragOver={this.dragOver}>

                  <Piece type={this.state.board[x][y]}
                         coords={`${x}`+y}
                         actionStart={this.actionSource}
                         actionEnd={this.actionTarget}/>
                </td>)
      }

      //add row to board
      board.push(
        <tr id={'row'+x}>
          {row}
        </tr>
      )

    }
    return board
  }

  actionTarget = (e) => {
    let target = e.target.id.toString()
    if (target == "") {
      target = e.target.alt
    }
    if (true){
      let coords = this.state.selectedCoords
      let piece = this.state.selectedPiece
      let board = this.state.board
      console.log(e.target)
      board[target[0]][target[1]] = piece;
      board[coords[0]][coords[1]] = ''
      this.setState({
        board: board
      })
    }
  }

  actionSource = (e) => {
    //light up squares here

    //
    let piece = this.state.board[e[0]][e[1]]
    console.log(piece)
    this.setState({
      selectedPiece: piece,
      selectedCoords: e,
    })
  }

  dragOver(e){
    e.preventDefault()
  }

  render(){
    return(<div>

      <div id="gameBoard">
        { this.makeBoard() }
        <Piece />
      </div>

    </div>)
  }

}
