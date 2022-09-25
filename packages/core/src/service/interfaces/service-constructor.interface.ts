export interface ServiceConstructor {
    new(...args: any[]): any;
    singleton?: boolean;
}
