import { CustomBody } from "./custom-body.interface";

export interface CustomResponse<T> extends Omit<Response, "json">, CustomBody<T> { }
