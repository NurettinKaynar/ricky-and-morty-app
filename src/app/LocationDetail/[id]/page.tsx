"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Logo from "../../assets/logo.png"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Link from 'next/link';
import { getByParams } from '@/app/core/service/httpEntittyService';
import { ApiService } from '@/app/core/utils/ApiUrl';
import { AxiosResponse } from 'axios';
import { DataResultModel } from '@/app/core/models/DataResultModel';
import { CharacterModel } from '@/app/core/models/Character.model';
import Pagination from '@/app/shared/components/Pagination/Pagination';
import { StatusEnum } from '@/app/core/enum/Status.enum';
const LocationDetail = ({params}:{params:{id:string}}) => {
    const [charactersData, setCharactersData] = useState<DataResultModel<CharacterModel>>()

    const getWithFilterCharacters=(locationId=params.id,pageNumber=1,status=StatusEnum.All)=>{
        
        getByParams(ApiService.GET_CHARACTERS,{locationId:locationId,page:pageNumber,status:status}).then((res:AxiosResponse<DataResultModel<CharacterModel>>)=>{
            console.log("CHARACTERINFO",res.data);
            setCharactersData(res.data)
        })
    }
    const handlePageChange=(pageNumber:number)=>{
        getWithFilterCharacters('',pageNumber,StatusEnum.All)
    }

    useEffect(() => {
        getWithFilterCharacters()
      
    }, [])
    
  return (
    <div className="md:px-8 flex flex-col mx-auto">
      <div className=" pt-10 md:px-24 px-2 flex items-center justify-between w-full">
        <Link href={'/'} >

        <ArrowBackIosNewOutlinedIcon />
        </Link>
        <Image
          priority
          src={Logo}
          className="w-44"
          alt="Ricky And Morty Logo"
        />
        <div></div>
      </div>
      <div className='flex items-center justify-center flex-row gap-x-8' >
            <span className="font-semibold" >Filter By Status</span>
            <span className="font-semibold underline" >My Favorites</span>
      </div>
      <div className='flex md:overflow-hidden overflow-x-scroll p-8 gap-6' >
            <div className='hover:bg-violet-800 cursor-pointer border rounded-full w-40 flex items-center justify-center p-2 gap-2' >
                <div className='rounded-full bg-red-500 w-4 h-4' ></div>
                <span className='font-semibold' >Dead</span>
            </div>
            <div className='hover:bg-violet-800 cursor-pointer border rounded-full w-40 flex items-center justify-center p-2 gap-2' >
                <div className='rounded-full bg-green-500 w-4 h-4' ></div>
                <span className='font-semibold' >Alive</span>
            </div>
            <div className='hover:bg-violet-800 cursor-pointer border rounded-full w-40 flex items-center justify-center p-2 gap-2' >
                <div className='rounded-full bg-gray-500 w-4 h-4' ></div>
                <span className='font-semibold' >Unknown</span>
            </div>
        <div className="md:inline-block hidden" >
            {
                charactersData?

                <Pagination onPageChange={handlePageChange} info={charactersData.info} />
                :null
            }
        </div>
      </div>
    </div>
  );
}

export default LocationDetail