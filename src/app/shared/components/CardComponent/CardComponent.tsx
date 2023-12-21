import { CharacterModel } from "@/app/core/models/Character.model";
import Image from "next/image";
import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  addFavoriteCharacter,
  removeFavoriteCharacter,
} from "@/app/core/redux/store/store";
import Link from "next/link";

interface CardProps {
  CharacterData: CharacterModel;
  OnclickShowDetail: (characterData: CharacterModel) => void;
  isDetailed: boolean;
}
const CardComponent: React.FC<CardProps> = ({
  CharacterData,
  isDetailed = false,
}) => {
  const favoriteCharacters = useSelector(
    (state: RootState) => state.favoriteCharacters
  );
  const dispatch = useDispatch();

  const isAlreadyAddedFavorite = (characterData: CharacterModel) => {
    return favoriteCharacters.find(
      (character: CharacterModel) => character.id === characterData.id
    );
  };
  const favoriteController = (characterData: CharacterModel) => {
    if (isAlreadyAddedFavorite(characterData)) {
      dispatch(removeFavoriteCharacter(characterData));
    } else {
      dispatch(addFavoriteCharacter(characterData));
    }
  };

  const TruncatedText = ({
    text,
    maxCharacters,
  }: {
    text: string;
    maxCharacters: number;
  }) => {
    const truncatedText =
      text.length > maxCharacters ? `${text.slice(0, maxCharacters)}...` : text;

    return <div>{truncatedText}</div>;
  };

  const getStatusBackgroundColor = () => {
    switch (CharacterData.status) {
      case "Alive":
        return "bg-green-500";
      case "Dead":
        return "bg-red-500";
      case "Dead":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    isAlreadyAddedFavorite(CharacterData);
  }, []);

  return (
    <>
      <div className="  flex flex-col gap-2 w-full">
        <div className="relative w-full">
          <Image
            priority
            className="w-full"
            src={CharacterData.image}
            alt={CharacterData.name}
            width={350}
            height={350}
          />
          <div
            onClick={() => favoriteController(CharacterData)}
            className="absolute top-2 right-2">
            {isAlreadyAddedFavorite(CharacterData) ? (
              <FavoriteIcon
                sx={{
                  cursor: "pointer",
                  color: "red",
                  width: "34px",
                  height: "34px",
                }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ cursor: "pointer", width: "34px", height: "34px" }}
              />
            )}
          </div>
        </div>
        <div className="w-full flex justify-between ">
          <div className="w-full flex flex-col gap-2">
            <span className="font-semibold text-2xl">
              <TruncatedText text={CharacterData.name} maxCharacters={17} />
            </span>
            {isDetailed ? (
              <div className=" w-full flex  justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full w-4 h-4 ${getStatusBackgroundColor()}`}
                  />
                  <div className="font-semibold">
                    {CharacterData.status} - {CharacterData.species}{" "}
                  </div>
                </div>
                <span className=" w-min italic text-sm text-gray-500">
                  {CharacterData.species + "/" + CharacterData.gender}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full w-4 h-4 ${getStatusBackgroundColor()}`}
                />
                <div className="font-semibold">
                  {CharacterData.status} - {CharacterData.species}{" "}
                </div>
              </div>
            )}

            {isDetailed ? (
              <span className="italic">{CharacterData.location.name}</span>
            ) : null}
          </div>
          {!isDetailed ? (
            <Link href={`/CharacterDetail/${CharacterData.id}`}>
              <ArrowForwardIosIcon sx={{ width: 52, height: 52 }} />
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CardComponent;
