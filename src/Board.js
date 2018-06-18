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
        // ['','','','','','','',''],
        // ['','','','','','','',''],
        // ['','','','','','','',''],
        // ['','','','','','','',''],
        // ['','','','','','','',''],
        // ['','','','','','','',''],
        // ['','','','','','','',''],
        // ['','','','','','','',''],
      ]
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
        row.push(<td id={`${x}`+y}
                     className={'tile dropzone ' + ( ((y+x)%2 === 0) ? 'white' : 'black')}
                     onDrop={ this.actionTarget}
                     onDragOver={this.dragOver}>

                  <Piece type={this.state.board[x][y]}
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

  // makeBoard(){
  //   //makes Board tiles either black or white
  //   let alternator = true;
  //
  //   let board = [];
  //   //for each row
  //   for (let x = 1; x<9;x++){
  //     //each piece in the row
  //     let row = []
  //     for (let y = 1; y<9;y++){
  //       row.push(<td id={`${x}`+y} className={'tile ' + (alternator ? 'white' : 'black')}></td>)
  //       alternator = !alternator
  //     }
  //     //add row to board
  //     alternator = !alternator
  //     board.push(
  //
  //       <tr id={'row'+x}>
  //         {row}
  //       </tr>
  //
  //     )
  //   }
  //   return board
  // }

  actionTarget = () => {
    console.log('hi')
  }

  actionSource = (e) => {
    e.stopPropagation()
    console.log(e.target)
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
