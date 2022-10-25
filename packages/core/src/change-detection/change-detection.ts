import { HooksEnum } from "../enums/hooks.enum";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";

export class ChangeDetection {
    private watchers: WatcherInterface[] = [];
    private conditionWatchers: WatcherInterface[] = [];
    private isConnected: boolean = false;
    private wrapper: ComponentWrapperInstanceInterface;
    private debounce: any;

    constructor(componentWrapper: ComponentWrapperInstanceInterface) {
        this.wrapper = componentWrapper;
    }

    public connected() {
        this.isConnected = true;
    }

    public addWatcher(watcher: WatcherInterface, isConditionWatcher: boolean = false) {
        isConditionWatcher
            ? this.conditionWatchers.push(watcher)
            : this.watchers.push(watcher);
    }

    public async detectChanges(): Promise<any> {

        if (!this.isConnected || this.debounce) return;

        this.debounce = new Promise(resolve => {
            setTimeout(() => {
                let hasViewChanges: boolean = false;
                [...this.conditionWatchers, ...this.watchers].forEach(watcher => {
                    if (watcher.isConnected() && watcher.isUpdated()) {
                        hasViewChanges = true;
                        watcher.update(watcher.val);
                    }
                });

                this.wrapper.hooksCaller(HooksEnum.onChangeDetection);
                this.watchers = this.watchers.filter(watcher => watcher.isConnected());
                this.conditionWatchers = this.conditionWatchers.filter(watcher => watcher.isConnected());

                if (hasViewChanges) this.wrapper.hooksCaller(HooksEnum.onViewChange);

                this.debounce = null;
                resolve(1);
            });
        });
        return this.debounce;
    }
}
