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

interface CardProps {
  CharacterData: CharacterModel;
  OnclickShowDetail: (characterData: CharacterModel) => void;
}
const CardComponent: React.FC<CardProps> = ({ CharacterData }) => {
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
    <div className=" cursor-pointer flex flex-col gap-2">
      <div className="relative ">
        <Image
          className="w-58 h-58"
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
              sx={{ color: "red", width: "34px", height: "34px" }}
            />
          ) : (
            <FavoriteBorderIcon sx={{ width: "34px", height: "34px" }} />
          )}
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-2xl">
            <TruncatedText text={CharacterData.name} maxCharacters={17} />
          </span>
          <div className="flex items-center gap-2">
            <div
              className={`rounded-full w-4 h-4 ${getStatusBackgroundColor()}`}
            />
            <div className="font-semibold">{CharacterData.status}</div>
          </div>
        </div>
        <ArrowForwardIosIcon sx={{ width: 52, height: 52 }} />
      </div>
    </div>
  );
};

export default CardComponent;
