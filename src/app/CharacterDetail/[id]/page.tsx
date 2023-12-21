"use client";
import { getById, getByParams } from "@/app/core/service/httpEntittyService";
import React, { useEffect, useState } from "react";
import { ApiService } from "../../core/utils/ApiUrl";
import { CharacterModel } from "@/app/core/models/Character.model";
import { AxiosError, AxiosResponse } from "axios";
import { DataResultModel } from "@/app/core/models/DataResultModel";
import CardComponent from "@/app/shared/components/CardComponent/CardComponent";
import Link from "next/link";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { HorizontalCardComponent } from "@/app/shared";

const CharacterDetail = ({ params }: { params: { id: string } }) => {
  const [CharacterDetail, setCharacterDetail] = useState<CharacterModel>();
  const [similarCharacters, setSimilarCharacters] =
    useState<CharacterModel[]>();
  const routeParams = params.id;

  const getCharacterDetail = () => {
    getById(ApiService.GET_CHARACTERS, params.id)
      .then((result: AxiosResponse<CharacterModel>) => {
        setCharacterDetail(result.data);
        console.log("CHARACTER RESPONSE", result.data);
        getSimilarCharacters(result.data);
      })
      .catch((err: AxiosError) => {
        console.error("API CONNECTTION ERROR", err);
      });
  };
  const getSimilarCharacters = (character: CharacterModel) => {
    getByParams(ApiService.GET_CHARACTERS, {
      location: character.location.name,
      status: character.status,
      page: 1,
    })
      .then((res: AxiosResponse<DataResultModel<CharacterModel>>) => {
        console.log("benzer karakterler", res);

        const data = res.data.results.slice(0, 5);
        setSimilarCharacters(data);
      })
      .catch((err: AxiosError) => {
        console.error("BENZER KARAKTERLER ALINAMADI", err);
      });
  };

  const handleCharacterClick = (characterData: CharacterModel) => {
    console.log("KARAKTERE TIKLANDI", characterData);
  };

  useEffect(() => {
    getCharacterDetail();
  }, []);

  return (
    <div className="md:px-8 px-0 flex gap-4 flex-col mx-auto">
      <div className=" pt-10 md:px-4 px-0 flex items-center justify-between w-full">
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
      <div className="flex w-full  justify-start md:items-start md:gap-36 md:flex-row flex-col md:px-10 px-0 gap-2 items-center pt-12">
        <div className="w-1/3">
          {CharacterDetail ? (
            <CardComponent
              CharacterData={CharacterDetail}
              isDetailed={true}
              OnclickShowDetail={handleCharacterClick}
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl font-semibold">Other Character</h4>
          <div className="flex px-1 flex-col gap-2">
            {similarCharacters
              ? similarCharacters.map(
                  (character: CharacterModel, index: number) => (
                    <HorizontalCardComponent
                      key={index}
                      Character={character}
                    />
                  )
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
