export interface RawAction {
    type: string;
    data: any;
    reducer: (state: any, payload: any) => any;
}