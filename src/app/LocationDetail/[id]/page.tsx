"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Link from "next/link";
import { getByParams } from "@/app/core/service/httpEntittyService";
import { ApiService } from "@/app/core/utils/ApiUrl";
import { AxiosResponse } from "axios";
import { DataResultModel } from "@/app/core/models/DataResultModel";
import { CharacterModel } from "@/app/core/models/Character.model";
import Pagination from "@/app/shared/components/Pagination/Pagination";
import { StatusEnum } from "@/app/core/enum/Status.enum";
import CardComponent from "@/app/shared/components/CardComponent/CardComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const LocationDetail = ({ params }: { params: { id: string } }) => {
  const [charactersData, setCharactersData] =
    useState<DataResultModel<CharacterModel>>();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getWithFilterCharacters = (
    locationId = params.id,
    pageNumber = 1,
    status = StatusEnum.All
  ) => {
    getByParams(ApiService.GET_CHARACTERS, {
      locationId: locationId,
      page: pageNumber,
      status: status,
    }).then((res: AxiosResponse<DataResultModel<CharacterModel>>) => {
      console.log("CHARACTERINFO", res.data);
      setCharactersData(res.data);
    });
  };
  const handlePageChange = (pageNumber: number) => {
    getWithFilterCharacters("", pageNumber, StatusEnum.All);
  };
  const clickCharacterHandler = (characterData: CharacterModel) => {
    console.log("Karaktere Tıklandı", characterData);
  };

  useEffect(() => {
    getWithFilterCharacters();
  }, []);

  return (
    <div className="md:px-8 flex flex-col mx-auto">
      <div className=" pt-10 md:px-24 px-2 flex items-center justify-between w-full">
        <Link href={"/"}>
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
      <div className="flex items-center justify-center flex-row gap-x-8">
        <span className="font-semibold">Filter By Status</span>
        <Link href={"/MyFavorites"} className="font-semibold underline">
          My Favorites
        </Link>
      </div>
      <div className="flex md:overflow-hidden overflow-x-scroll p-8 gap-6">
        <div
          onClick={() =>
            getWithFilterCharacters("", undefined, StatusEnum.Dead)
          }
          className="hover:bg-violet-800 cursor-pointer border rounded-full w-40 flex items-center justify-center p-2 gap-2">
          <div className="rounded-full bg-red-500 w-4 h-4"></div>
          <span className="font-semibold">Dead</span>
        </div>
        <div
          onClick={() =>
            getWithFilterCharacters("", undefined, StatusEnum.Alive)
          }
          className="hover:bg-violet-800 cursor-pointer border rounded-full w-40 flex items-center justify-center p-2 gap-2">
          <div className="rounded-full bg-green-500 w-4 h-4"></div>
          <span className="font-semibold">Alive</span>
        </div>
        <div
          onClick={() =>
            getWithFilterCharacters("", undefined, StatusEnum.Unknown)
          }
          className="hover:bg-violet-800 cursor-pointer border rounded-full w-40 flex items-center justify-center p-2 gap-2">
          <div className="rounded-full bg-gray-500 w-4 h-4"></div>
          <span className="font-semibold">Unknown</span>
        </div>
      </div>
      <div className="md:hidden block">
        <Slider {...settings}>
          {charactersData?.results.map(
            (item: CharacterModel, index: number) => (
              <div key={index} className="w-full px-2">
                <CardComponent
                  isDetailed={false}
                  OnclickShowDetail={clickCharacterHandler}
                  CharacterData={item}
                />
              </div>
            )
          )}
        </Slider>
      </div>
      <div className="flex items-center justify-center">
        <div className="hidden  md:flex flex-wrap gap-10">
          {charactersData?.results.map(
            (item: CharacterModel, index: number) => (
              <div key={index} className="w-full px-2 md:w-1/6">
                <CardComponent
                  isDetailed={false}
                  OnclickShowDetail={clickCharacterHandler}
                  CharacterData={item}
                />
              </div>
            )
          )}
        </div>
      </div>
      <div className="md:inline-block hidden">
        {charactersData ? (
          <Pagination
            onPageChange={handlePageChange}
            info={charactersData.info}
          />
        ) : null}
      </div>
    </div>
  );
};

export default LocationDetail;
