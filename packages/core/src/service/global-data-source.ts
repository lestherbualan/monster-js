import { DIDataSource } from "../dependency-injection/interfaces/di-data-source.interface";
import { Constructor } from "../interfaces/constructor.interface";

export const GLOBAL_DI_SOURCE: Map<Constructor, DIDataSource> = new Map();