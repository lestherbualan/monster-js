import { DataSourceDataInterface } from "../interfaces/data-source-data.interface";
import { DataSourceInterface } from "../interfaces/data-source.interface";
import { DIConfigInterface } from "../interfaces/di-config.interface";

export class Container {

    private dataSource: DataSourceInterface;

    constructor(dataSource: DataSourceInterface) {
        this.dataSource = dataSource;
    }

    public mock(target: new (...args: any[]) => any, mock: any) {
        const data = this.getSource(target);
        data.mock = mock;
        this.update(target, data);
    }

    public getSource<T>(target: T): DataSourceDataInterface {
        return this.dataSource.data.get(target)!;
    }

    public update(target: new (...args: any[]) => any, config: DataSourceDataInterface) {
        this.dataSource.data.set(target, config);
    }

    public register(target: new (...args: any[]) => any, config: DIConfigInterface) {
        /**
         * If condition is to prevent overriding single data
         */
        if (config.singleton) {
            const source = this.getSource(target);
            if (!source) {
                this.dataSource.data.set(target, { target, config });
            }
        } else {
            this.dataSource.data.set(target, { target, config });
        }
    }


    /**
     * Check if class is registered in the container
     */
    private validateSourceData(target: any) {
        let sourceData: DataSourceDataInterface = this.dataSource.data.get(target);
        if (!sourceData) {
            const globalSource = globalThis.GlobalDataSource;

            if (globalSource === this.dataSource) throw new Error(`${target.name} is not registered in global dependency injection container.`);

            const di = new Container(globalSource);
            sourceData = di.getSource(target);

            if (!sourceData) throw new Error(`${target.name} is not registered in ${this.dataSource.name} and in global dependency injection container.`);
        }
        return sourceData;
    }


    private triggerHooks(instance: any, sourceData: DataSourceDataInterface, customParent?: any) {
        /**
         * instance will receive the custom parent if there is a custom parent
         * and the instance has onReceiveParent hook
         */
        if (instance.onReceiveParent && typeof instance.onReceiveParent === 'function') instance.onReceiveParent(customParent);


        /**
         * Set instance config if there is a config data
         */
        if (sourceData.config && instance.onReceiveConfig && typeof instance.onReceiveConfig === 'function') instance.onReceiveConfig(sourceData.config.config, this);
    }

    public resolve<T = any>(target: new (...args: any[]) => T, customParent?: any): T {
        let sourceData: DataSourceDataInterface = this.dataSource.data.get(target)!;


        /**
         * If there is a mock data
         * then, return the mock data
         */
        if (sourceData?.mock) return sourceData.mock;


        sourceData = this.validateSourceData(target);


        /**
         * If singleton and has already an instance return the instance
         */
        if (sourceData.config.singleton && sourceData.config.instance) return sourceData.config.instance;


        const params: any[] = Reflect.getMetadata('design:paramtypes', sourceData.target) || [];
        const paramsInstances: any[] = params.map(item => this.resolve(item));
        const instance = new sourceData.target(...paramsInstances);


        /**
         * injected dependency will receive the parent instance
         */
        paramsInstances.forEach(item => {
            if (item.onReceiveParent && typeof item.onReceiveParent === 'function') item.onReceiveParent(instance);
        });


        this.triggerHooks(instance, sourceData, customParent);
        this.setupSingleton(instance, target, sourceData);

        return instance;
    }

    /**
     * If singleton update instance in the data source
     */
    private setupSingleton<T>(instance: any, target: new (...args: any[]) => T, sourceData: DataSourceDataInterface) {
        if (sourceData.config.singleton) {
            sourceData.config.instance = instance;
            this.dataSource.data.set(target, {
                ...sourceData,
                config: {
                    ...sourceData.config,
                    instance: instance
                }
            });
        }
    }
}