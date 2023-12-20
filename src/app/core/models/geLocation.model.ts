import { InfoModel } from "./Info.model";
import { LocationModel } from "./location.model";

export interface LocationModelDto{
    info:InfoModel,
    results:LocationModel[]
}