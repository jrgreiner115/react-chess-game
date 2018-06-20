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


  componentDidMount(){
    this.blackFlip()
  }

  blackFlip(){
    let flipped = []
    for (let i of this.state.board){
      flipped.push(i.reverse())
    }
    this.setState({
      board: flipped.reverse(),
      playerColor: 'B'
    })
  }

  blackTranslator(oldCoords){


//YET TO TEST
//YET TO TEST
//YET TO TEST
//YET TO TEST
//YET TO TEST
//YET TO TEST

    return `${7 - parseInt(oldCoords[0])}` + (7 - parseInt(oldCoords[1]))
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
    return 'tile ' + color
  }

  makeBoard(){

    let board = [];
    //for each row
    for (let x = 0; x<8;x++){
      //each piece in the row
      let row = []
      for (let y = 0; y<8;y++){

        let piece = (this.state.board[x][y] === '') ? null : <Piece type={this.state.board[x][y]}
                                                                     coords={`${x}`+y}
                                                                     actionStart={this.piecePickedUp}
                                                                     playerColor={this.state.playerColor}/>
        row.push( <td id={`${x}`+y}
                     className={ this.classHelp(x,y) }
                     onDrop={ this.piecePutDown}
                     onDragOver={this.dragOver}>

                  {piece}
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




  //logic helpers
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
  //combos

  eatCheck(x,y){
    return this.outOfBoundsCheck(x,y) && this.isOwnPieceCheck(x,y)
  }

  pawnEatCheck(x,y){
    return this.outOfBoundsCheck(x,y) && this.isOwnPieceCheck(x,y) && !this.isEmpty(x,y)
  }

  pawnMoveCheck(x,y){
    return (this.outOfBoundsCheck(x,y) && this.isEmpty(x,y))
  }



  //destructive helpers
  //destructive helpers
  emptyCommit(x,y,arr){
    let boo = this.outOfBoundsCheck(x,y) && this.isEmpty(x,y)
    if (boo){
      arr.push(`${y}` + x)
    }
    return boo
  }

  eatCommit(x,y,arr){
    let boo = this.eatCheck(x,y)
    if (boo){
      arr.push(`${y}` + x)
    }
    return boo
  }


  //possible moves loops, bishop, rook, queen
  emptyLoop(x,y,xdelta,ydelta,movesArray){
    let i=1
    while( i>0 ){
      if (!this.emptyCommit(this.loopHelper(x,xdelta,i),this.loopHelper(y,ydelta,i),movesArray)){
        this.eatCommit(this.loopHelper(x,xdelta,i),this.loopHelper(y,ydelta,i),movesArray)
        i = -1
      }
      i++;
    }
  }
  loopHelper(x,delta,i){
    if (delta == "+"){
      return x + i
    }
    if (delta == "-"){
      return x - i
    }
    if (delta == ""){
      return x
    }
  }

  kingHandler(x,y,xdelta,ydelta,movesArray){
    this.eatCommit(this.loopHelper(x,xdelta,1),this.loopHelper(y,ydelta,1),movesArray)
  }

  //logic helpers

  pieceLogic(piece,coords){
    let y = parseInt(coords[0])
    let x = parseInt(coords[1])
    let short = piece.substring(0,2)
    switch(short){
      case "pa":
        this.pawnLogic(x,y)
        break;
      case "ro":
        this.rookLogic(x,y)
        break;
      case "bi":
        this.bishopLogic(x,y)
        break;
      case "qu":
        this.queenLogic(x,y)
        break;
      case "ki":
        this.kingLogic(x,y)
        break;
      case "kn":
        this.knightLogic(x,y)
        break;
    }
  }

  pawnLogic(x,y){
    //moves to make
    let movesArray = []

    //moves 1 forward without eating
    if (this.pawnMoveCheck(x,y-1)){
      movesArray.push(`${y-1}` + x)
    }

    //moves 2 forward if at starting, no eat
    if (y === 6 && this.pawnMoveCheck(x,y-2)){
      movesArray.push(`${y-2}` + x)
    }

    //diagonal eating
    if (this.pawnEatCheck(x-1,y-1)){
      movesArray.push(`${y-1}` + (x-1))
    }
    if (this.pawnEatCheck(x+1,y-1)){
      movesArray.push(`${y-1}` + (x+1))
    }

    //moves committer
    this.setState({
      lightUp: movesArray
    })

  }

  rookLogic(x,y){

    let movesArray = []

    this.emptyLoop(x,y,'+','',movesArray)
    this.emptyLoop(x,y,'','+',movesArray)
    this.emptyLoop(x,y,'-','',movesArray)
    this.emptyLoop(x,y,'','-',movesArray)

    //moves committer
    this.setState({
      lightUp: movesArray
    })
  }

  bishopLogic(x,y){
    let movesArray = []

    this.emptyLoop(x,y,'+','+',movesArray)
    this.emptyLoop(x,y,'+','-',movesArray)
    this.emptyLoop(x,y,'-','+',movesArray)
    this.emptyLoop(x,y,'-','-',movesArray)

    //moves committer
    this.setState({
      lightUp: movesArray
    })
  }

  queenLogic(x,y){
    let movesArray = []

    this.emptyLoop(x,y,'+','+',movesArray)
    this.emptyLoop(x,y,'+','-',movesArray)
    this.emptyLoop(x,y,'-','+',movesArray)
    this.emptyLoop(x,y,'-','-',movesArray)
    this.emptyLoop(x,y,'+','',movesArray)
    this.emptyLoop(x,y,'','+',movesArray)
    this.emptyLoop(x,y,'-','',movesArray)
    this.emptyLoop(x,y,'','-',movesArray)



    //moves committer
    this.setState({
      lightUp: movesArray
    })
  }

  kingLogic(x,y){
    let movesArray = []

    this.kingHandler(x,y,'+','',movesArray)
    this.kingHandler(x,y,'+','+',movesArray)
    this.kingHandler(x,y,'','+',movesArray)
    this.kingHandler(x,y,'-','',movesArray)
    this.kingHandler(x,y,'-','-',movesArray)
    this.kingHandler(x,y,'','-',movesArray)
    this.kingHandler(x,y,'+','-',movesArray)
    this.kingHandler(x,y,'-','+',movesArray)

    //moves committer
    this.setState({
      lightUp: movesArray
    })
  }

  knightLogic(x,y){
    let movesArray = []

    this.eatCommit(x-2,y-1,movesArray)
    this.eatCommit(x-2,y+1,movesArray)
    this.eatCommit(x+2,y-1,movesArray)
    this.eatCommit(x+2,y+1,movesArray)
    this.eatCommit(x-1,y-2,movesArray)
    this.eatCommit(x-1,y+2,movesArray)
    this.eatCommit(x+1,y-2,movesArray)
    this.eatCommit(x+1,y+2,movesArray)

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


  piecePutDown = (e) => {
    // checks before move is executed
    let goAhead = true

    //prepares the drop target
    let target = e.target.id.toString()
    if (target == "") {
      target = e.target.alt
    }

    // can only go on lit up tiles
    if (!this.state.lightUp.includes(target)){
      goAhead = false
    }

    //can not eat yourself
    if (this.state.selectedCoords === target){
      goAhead = false
    }

    //execution code
    if (goAhead){
      let coords = this.state.selectedCoords
      let piece = this.state.selectedPiece
      let board = this.state.board
      board[target[0]][target[1]] = piece;
      board[coords[0]][coords[1]] = ''

      this.setState({
        board: board
      })

      //translates for black board cuz its flipped
      // target = new pos
      // coords = old pos
      if (this.state.playerColor === 'B'){
        target = this.blackTranslator(target)
        coords = this.blackTranslator(coords)
      }


    }
    //execution code ends

    this.setState({
      lightUp: []
    })




  }

  dragOver(e){
    e.preventDefault()
  }

  render(){
    return(<div>

      <div id="gameBoard">
        { this.makeBoard() }
      </div>

    </div>)
  }

}
