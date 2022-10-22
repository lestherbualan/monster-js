import { Observable } from "rxjs";
import { CustomResponse } from "../interfaces/custom-response.interface";

export type HttpResponse<T> = Observable<CustomResponse<T>>;