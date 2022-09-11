export interface ActionKeys<T> {
    [key: string]: keyof T;
}
