export interface ViewDirectiveInterface {
    namespace: string;
    directives: { [key: string]: { get: () => any; set: (value?: any) => void; } };
}