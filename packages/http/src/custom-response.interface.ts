export interface CustomResponse<T = any> extends Omit<Response, 'json'> {
    json(): Promise<T>;
}
