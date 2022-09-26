export interface ViewDirective {
    namespace: string;
    directives: { [key: string]: { get: () => any; set: (value?: any) => void; } };
}