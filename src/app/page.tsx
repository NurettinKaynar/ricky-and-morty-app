"use client";
import { NextPage } from 'next'
import { get } from "./core/service/httpEntittyService"
import { ApiService } from "./core/utils/ApiUrl"
import { AxiosResponse } from "axios"
import Logo from "./assets/logo.png"
import { useEffect } from 'react';
import Image from 'next/image';

const Home:NextPage=()=>{



  const getAllLocation=()=>{
    get(ApiService.GET_LOCATIONS).then((res:AxiosResponse)=>{
      console.log("GET ALL LOCATIONS",res);
      
    })
  }

  useEffect(() => {
    getAllLocation()
  }, [])
  

  return(
    <div>
 <div className='flex items-center justify-center w-full' >
    <Image src={Logo} className='w-44 pt-10' alt="Ricky And Morty Logo"  />
 </div>
    <div className='border rounded-lg' >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit nihil, magni explicabo voluptatem iste sunt maiores sed accusantium fuga provident sapiente illum dolorum maxime enim tenetur voluptatum corrupti odit ipsam!
    </div>
    </div>
  )
}
export default Home