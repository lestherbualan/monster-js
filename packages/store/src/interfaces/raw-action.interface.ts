export interface RawActionInterface {
    type: string;
    data: any;
    reducer: (state: any, payload: any) => any;
}
