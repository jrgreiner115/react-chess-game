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
      playerColor: 'W',
      lightUp: []
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

  classHelp = (x,y) => {
    let color = this.state.lightUp.includes(`${x}`+y) ? 'yellow' : ( ((y+x)%2 === 0) ? 'white' : 'black')
    return 'tile dropzone ' + color
  }

  makeBoard(){

    let board = [];
    //for each row
    for (let x = 0; x<8;x++){
      //each piece in the row
      let row = []
      for (let y = 0; y<8;y++){
        row.push( <td id={`${x}`+y}
                     className={ this.classHelp(x,y) }
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

    this.setState({
      lightUp: []
    })
  }

  lightUp(){

  }

  pieceLogic(piece,coords){
    let y = parseInt(coords[0])
    let x = parseInt(coords[1])
    let short = piece.substring(0,2)
    switch(short){
      case "pa":
        this.pawnLogic(x,y)
        break;

    }
  }

  //logic helpers
  isEmpty(x,y){
    return this.state.board[y][x] === ''
  }

  outOfBoundsCheck(x,y){
    if (x > 7 || y > 7){
      return false
    }
    if (x < 0 || y < 0){
      return false
    }
    return true
  }

  isOwnPieceCheck(x,y){
    return !(this.state.board[y][x].slice(-1) === this.state.playerColor)
  }

  eatCheck(x,y){
    return this.outOfBoundsCheck(x,y) && this.isOwnPieceCheck(x,y)
  }

  pawnEatCheck(x,y){
    return this.outOfBoundsCheck(x,y) && this.isOwnPieceCheck(x,y) && !this.isEmpty(x,y)
  }

  pawnMoveCheck(x,y){
    console.log("movecheck", x, y)
    console.log("bounds", this.outOfBoundsCheck(x,y))
    console.log("empty", this.isEmpty(x,y))

    return (this.outOfBoundsCheck(x,y) && this.isEmpty(x,y))
  }

  //logic helpers




  pawnLogic(x,y){
    //moves to make
    let movesArray = []

    //moves 1 forward without eating
    if (this.pawnMoveCheck(x,y-1)){
      console.log('move1 is go')
      movesArray.push(`${y-1}` + x)
    }

    //moves 2 forward if at starting, no eat
    if (y === 6 && this.pawnMoveCheck(x,y-2)){
      console.log('move2 is go')
      movesArray.push(`${y-2}` + x)
    }

    //diagonal eating
    if (this.pawnEatCheck(x-1,y-1)){
      console.log('eat left is go')
      movesArray.push(`${y-1}` + (x-1))
    }
    if (this.pawnEatCheck(x+1,y-1)){
      console.log('eat right is go')
      movesArray.push(`${y-1}` + (x+1))
    }

    //moves committer
    console.log(movesArray)
    this.setState({
      lightUp: movesArray
    })

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
