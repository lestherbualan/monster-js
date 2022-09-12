import { CustomObservable, OnReceiveConfig, DevTool } from '@monster-js/core';
import { ActionKeys } from './interfaces/action-keys.interface';
import { Actions } from './interfaces/actions.interface';
import { DevToolAction } from './interfaces/dev-tool-action.interface';
import { RawAction } from './interfaces/raw-action.interface';
import { StoreState } from './interfaces/store-state.interface';
import { objectToObservables } from './utils/object-to-observables';

const NORMAL_SET_DEVTOOL_KEY = '@STORE_SET';

export class Store<T = any> implements OnReceiveConfig {

    /**
     * Contains the state of the store
     * the properties of the state objects are observables
     */
    private state: { [key in keyof T]: CustomObservable<T[key]> } = null!;
    private values: T = null!;


    private actions: Actions = {};
    private actionKeys: ActionKeys<T> = {};

    private devTool: DevTool = new DevTool();

    private static instance: Store;

    constructor() {
        if (Store.instance) {
            return Store.instance;
        }
        Store.instance = this;
    }

    private setupDevTool() {
        this.devTool.subscribe((message: DevToolAction) => {
            if (message.type === 'DISPATCH' && message.state) {
                // set state here
                const state = JSON.parse(message.state);

                for (const key in state) {
                    this.doSet(key as any, state[key]);
                }
            }
        });
        this.devTool.init(this.values);
    }

    public onReceiveConfig(config: StoreState<T>) {
        this.initialState(config);
    }

    public initialState(config: StoreState<T>) {
        this.state = objectToObservables<T>(config.state as any);
        this.values = config.state;
        this.actions = config.actions || {};
        this.setupActions();
        this.setupDevTool();
    }

    private setupActions(): void {
        for (const key in this.actions) {
            this.actions[key].forEach(action => {
                const actionResult: RawAction = action();
                this.actionKeys[actionResult.type] = key as keyof T;
            });
        }
    }

    public action(action: RawAction) {
        const key = this.actionKeys[action.type];
        if (key === undefined) {
            throw `The action '${action.type}' is not registered in the action array.`;
        }
        const value = this.get(key);
        this.doSet(key, action.reducer(value, action.data));
        this.devToolSet(action.type);
    }

    public select<K extends keyof T>(key: K): CustomObservable<T[K]> {
        return this.state[key];
    }

    public doSet<K extends keyof T>(key: K, value: T[K]): void {
        this.values[key] = value;
        this.state[key].next(this.values[key]);
    }

    private devToolSet(actionType: string) {
        this.devTool.send(actionType, this.values);
    }

    public set<K extends keyof T>(key: K, value: T[K]): void {
        this.doSet(key, value);
        this.devToolSet(NORMAL_SET_DEVTOOL_KEY);
    }

    public get(key: keyof T) {
        return this.values[key];
    }
}
