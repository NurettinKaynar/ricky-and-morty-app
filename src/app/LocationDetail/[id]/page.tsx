"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Logo from "../../assets/logo.png"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Link from 'next/link';
import { getByParams } from '@/app/core/service/httpEntittyService';
import { ApiService } from '@/app/core/utils/ApiUrl';
import { AxiosResponse } from 'axios';
const LocationDetail = ({params}:{params:{id:string}}) => {
    const [charactersData, setCharactersData] = useState()
    const getAllLocation=()=>{

        getByParams(ApiService.GET_CHARACTERS,{locationId:params.id}).then((res:AxiosResponse)=>{
            console.log("CHARACTERINFO",res.data);
            setCharactersData(res.data)
        })
    }
    useEffect(() => {
      getAllLocation()
    
      
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

      </div>
    </div>
  );
}

export default LocationDetail