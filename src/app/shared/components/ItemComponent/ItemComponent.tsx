import React from 'react'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { CharacterModel } from '@/app/core/models/character.model';
import Link from 'next/link';

const ItemComponent = ({itemData}:{itemData:CharacterModel}) => {
  return (
    <Link  href={`/characterDetail/${itemData.id}`}  className='px-6 transition ease-in-out delay-100 border cursor-pointer w-full md:w-1/4 rounded-lg justify-between flex items-center hover:bg-violet-800' >
    <div className='p-2  grid gap-x-8 grid-cols-2'>
      <span className='font-semibold' >
        Name:
      </span>
      <span className='font-medium' >
        {itemData.name}
      </span>
      <span className='font-semibold' >
        Type:
      </span>
      <span className='font-medium' >
        {itemData.type}
      </span>
      <span className='font-semibold' >
        Dimension:
      </span>
      <span className='font-medium' >
        {itemData.dimension}
      </span>
      <span className='font-semibold' >
        Resident Count:
      </span>
      <span className='font-medium' >
        {itemData.residents.length}
      </span>
    </div>
  <ArrowForwardIosRoundedIcon/>
  </Link>
  )
}

export default ItemComponent