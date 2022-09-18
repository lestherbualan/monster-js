export interface DIDataSource {
    singleton: boolean;
    target: any;
    instance?: any;
    config: any;
    mock?: any;
}