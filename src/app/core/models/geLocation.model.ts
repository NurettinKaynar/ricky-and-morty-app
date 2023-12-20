import { InfoModel } from "./Info.model";
import { CharacterModel } from "./character.model";

export interface LocationModel{
    info:InfoModel,
    results:CharacterModel[]
}