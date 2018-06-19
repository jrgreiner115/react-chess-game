import React from 'react';
import Piece from './Piece.js'

export default class Board extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      board:[
        ['rookB','bishopB','knightB','queenB','kingB','knightB','bishopB','rookB'],
        ['pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW'],
        ['rookW','bishopW','knightW','queenW','kingW','knightW','bishopW','rookW']
      ],
      selectedPiece: null,
      selectedCoords: null,
      playerColor: 'W'
    }

  }

  reset(){
    this.setState({
      board:[
        ['rookB','bishopB','knightB','queenB','kingB','knightB','bishopB','rookB'],
        ['pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW'],
        ['rookW','bishopW','knightW','queenW','kingW','knightW','bishopW','rookW']
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
                         actionStart={this.piecePickedUp}
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

  lightUp(){

  }

  pieceLogic(piece,coords){
    let short = piece.substring(0,2)
    switch(short){
      case "pa":
        this.pawnLogic(coords)
        break;

    }
  }

  //logic helpers
  isEmpty(x,y){
    console.log('empty')
    return this.state.board[x][y] === ""
  }

  outOfBoundsCheck(x,y){
    console.log('outabounds')
    if (x > 7 || y > 7){
      return false
    }
    if (x < 0 || y < 0){
      return false
    }
    return true
  }

  isOwnPieceCheck(x,y){
    console.log('ownpiece')
    return !(this.state.board[x][y].slice(-1) === this.board.playerColor)
  }

  moveAndEat(x,y){
    return this.outOfBoundsCheck(x,y) && this.isOwnPieceCheck(x,y)
  }

  pawnMoveCheck(x,y){
    return (this.outOfBoundsCheck(x,y) && this.isEmpty(x,y))
  }

  //logic helpers




  pawnLogic(coords){
    let x = parseInt(coords[0])
    let y = parseInt(coords[1])
    let movesArray = []
        console.log(x,y)
    //moves 1 forward without eating
    if (this.pawnMoveCheck(x,y+1)){
      movesArray.push([x,y+1])
    }

    //moves 2 forward if at starting
    if (x === 6 && this.pawnMoveCheck(x,y+2)){
      movesArray.push([x,y+2])
    }


    this.lightUp(movesArray)
  }



  piecePickedUp = (coords) => {
    //light up squares here

    //
    let piece = this.state.board[coords[0]][coords[1]]
    this.setState({
      selectedPiece: piece,
      selectedCoords: coords,
    })
    this.pieceLogic(piece,coords)
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
