import { CharacterModel } from "@/app/core/models/Character.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HorizontalCardComponent = ({
  Character,
}: {
  Character: CharacterModel;
}) => {
  return (
    <Link href={`/CharacterDetail/${Character.id}`} className="flex gap-2">
      <Image
        width={102}
        height={102}
        priority
        src={Character.image}
        alt={Character.name}
      />
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-2xl text-gray-500">
          {Character.name}
        </span>
        <span className="font-semibold text-xl italic">
          {Character.location.name}
        </span>
        <span className="font-semibold italic text-sm">
          {Character.species} / {Character.gender}
        </span>
      </div>
    </Link>
  );
};

export default HorizontalCardComponent;
