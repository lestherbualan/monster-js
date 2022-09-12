import { CustomObservable } from '@monster-js/core';
import { urlResolver } from "./utils/url-resolver";

export class InternalService {
    private static instance: InternalService;

    public onRouteChange = new CustomObservable();
    public evaluate = new CustomObservable();

    constructor() {
        if (InternalService.instance) {
            return InternalService.instance;
        }

        this.initializeRouterEvents();
        this.navigate = this.navigate.bind(this);

        InternalService.instance = this;
    }

    public navigate(url: string, data: any = {}, title: string = '', replaceState?: boolean) {
        const resolvedUrl = urlResolver(url);
        const { pathname } = location;
        if (pathname === resolvedUrl) {
            return;
        }

        if (replaceState) {
            history.replaceState(data, title, resolvedUrl);
        } else {
            history.pushState(data, title, resolvedUrl);
        }
    }

    private runEvaluate(event: any) {
        this.evaluate.next(event);
        this.onRouteChange.next(event);
    }

    private initializeRouterEvents(): void {
        window.history.pushState = this.overwriteHistoryStateFunctions('pushState');
        window.history.replaceState = this.overwriteHistoryStateFunctions('replaceState');

        ['popstate', 'pushState', 'replaceState'].forEach(ev => {
            window.addEventListener(ev, event => {
                this.runEvaluate(event);
            });
        });
    }

    private overwriteHistoryStateFunctions(type: string): () => void {
        var originalFunction = history[type];
        return function () {
            originalFunction.apply(this, arguments);
            const newEvent = new Event(type);
            newEvent['arguments'] = arguments;
            window.dispatchEvent(newEvent);
        }
    }
}