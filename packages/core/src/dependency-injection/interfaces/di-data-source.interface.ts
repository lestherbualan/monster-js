import { Constructor } from "../../interfaces/constructor.interface";

export interface DIDataSource {
    target: Constructor;
    config?: any;
    instance?: any;
    singleton?: boolean;
    mock?: any;
}