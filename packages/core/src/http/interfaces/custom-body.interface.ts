export interface CustomBody<T> extends Body {
    json(): Promise<T>;
}
