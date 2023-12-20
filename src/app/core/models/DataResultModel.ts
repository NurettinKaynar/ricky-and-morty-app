import { InfoModel } from "./Info.model";
import { LocationModel } from "./location.model";

export interface DataResultModel<T>{
    info:InfoModel,
    results:T[]
}