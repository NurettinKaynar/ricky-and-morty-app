import { CharacterModel } from '@/app/core/models/Character.model';
import React from 'react'

interface CardProps {
    CharacterData: CharacterModel;
    OnclickShowDetail: (characData: CharacterModel) => void;
  }
const CardComponent:React.FC" = ({}) => {
  return (
    <div>CardComponent</div>
  )
}

export default CardComponent