"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../core/redux/store/store";
import Link from "next/link";
import Logo from "../assets/logo.png";
import Image from "next/image";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { CharacterModel } from "../core/models/Character.model";
import { CardComponent } from "../shared";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MyFavorites = () => {
  const navigate = useRouter();
  const favoriteCharacters = useSelector(
    (state: RootState) => state.favoriteCharacters
  );
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const clickCharacterHandler = (character: CharacterModel) => {
    navigate.push(`/CharacterDetail/${character.id}`);
  };

  return (
    <div className="flex flex-col gap-2">
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
      <div className="md:hidden block">
        {favoriteCharacters.length > 0 ? (
          <Slider {...settings}>
            {favoriteCharacters.map((character: CharacterModel, index) => (
              <div key={index} className="px-2 w-full md:w-1/6">
                <CardComponent
                  isDetailed={true}
                  CharacterData={character}
                  OnclickShowDetail={clickCharacterHandler}
                />
              </div>
            ))}
          </Slider>
        ) : null}
      </div>
      <div className="hidden md:flex items-center flex-col md:flex-row  md:flex-wrap gap-6">
        {favoriteCharacters.length > 0 ? (
          favoriteCharacters.map((character: CharacterModel, index) => (
            <div key={index} className="px-2 w-full md:w-1/6">
              <CardComponent
                isDetailed={true}
                CharacterData={character}
                OnclickShowDetail={clickCharacterHandler}
              />
            </div>
          ))
        ) : (
          <div className=" w-full flex justify-center pt-10">
            <Link href={"/"} className="font-semibold text-xl">
              Add Some Favorite Characters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
