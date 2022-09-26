type FunctionPipeType = (value: any, params?: any[]) => any;

export interface FunctionPipe extends FunctionPipeType {
    selector?: string;
}