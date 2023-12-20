"use client";
import { NextPage } from 'next'
import {  getByParams } from "./core/service/httpEntittyService"
import { ApiService } from "./core/utils/ApiUrl"
import { AxiosResponse } from "axios"
import Logo from "./assets/logo.png"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LocationModel } from './core/models/geLocation.model';
import { ItemComponent } from './shared';
import { CharacterModel } from './core/models/character.model';
import Pagination from './shared/components/Pagination/Pagination';

const Home:NextPage=()=>{
const [LocationData, setLocationData] = useState<LocationModel>()


  const getAllLocation=(pageNumber=1)=>{
    
    getByParams(ApiService.GET_LOCATIONS,{page:pageNumber}).then((res:AxiosResponse<LocationModel>)=>{
      console.log("GET ALL LOCATIONS",res);
      setLocationData(res.data)
    })
  }
  

  const handlePageChanger=(pageNumber:number)=>{
    console.log("SAYFA Değiştirildi",pageNumber);
    getAllLocation(pageNumber)
  }

  useEffect(() => {
    getAllLocation()
  }, [])
  

  return(
    <div className='px-12'>
 <div className='flex items-center justify-center w-full' >
    <Image src={Logo} className='w-44 pt-10' alt="Ricky And Morty Logo"  />
 </div>
 <div className='w-full md:flex-row sm:flex-col flex flex-wrap gap-4 pt-4' >
      {
        LocationData?.results.map((item:CharacterModel,index:number)=>(
          <ItemComponent key={index} itemData={item} />
        ))
      }
 </div>
 <div className='pt-6' >

 {
  LocationData
  ?
  <Pagination onPageChange={handlePageChanger} info={LocationData.info}/>
  : null
 }
 </div>
    </div>
  )
}
export default Home