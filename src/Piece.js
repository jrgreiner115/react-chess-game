import React from 'react';
import pawnB from './images/pawnB.svg'
import knightB from './images/knightB.svg'
import kingB from './images/kingB.svg'
import queenB from './images/queenB.svg'
import rookB from './images/rookB.svg'
import bishopB from './images/bishopB.svg'

import pawnW from './images/pawnW.svg'
import knightW from './images/knightW.svg'
import kingW from './images/kingW.svg'
import queenW from './images/queenW.svg'
import rookW from './images/rookW.svg'
import bishopW from './images/bishopW.svg'


export default class Piece extends React.Component{

  imageGetter(type){
    switch(type){
      case 'pawnB':
        return pawnB
      case 'nightB':
        return knightB
      case 'bishopB':
        return bishopB
      case 'rookB':
        return rookB
      case 'kingB':
        return kingB
      case 'queenB':
        return queenB

      case 'pawnW':
        return pawnW
      case 'nightW':
        return knightW
      case 'bishopW':
        return bishopW
      case 'rookW':
        return rookW
      case 'kingW':
        return kingW
      case 'queenW':
        return queenW
      default:
        return ''
    }
  }

  render(){
    let type = this.imageGetter(this.props.type)
    let rend = type === '' ? null : <img className="piece"
                                     src={this.imageGetter(this.props.type)}
                                     alt="chess piece"
                                     onDragStart={this.props.actionStart}
                                     onDrop={this.props.actionEnd}
                                     draggable="true"
                                     />
    return rend
  }

}

//imageGetter(this.props.type)
