import { CustomObject } from "./custom-object.interface";

export interface ViewDirective {
    namespace: string;
    directives: CustomObject<{ get: () => any; set: (value?: any) => void; }>;
}