import { fromEvent, Subject } from "rxjs";
import { urlResolve } from "./url-resolve";

export class InternalService {
    private static instance: InternalService;

    public onRouteChange: Subject<any> = new Subject();
    public evaluate: Subject<any> = new Subject<any>();

    constructor() {
        if (InternalService.instance) {
            return InternalService.instance;
        }


        /**
         * Allow new subscription to onRouteChange to trigger automatically upon subscribe
         */
        const fn = this.onRouteChange.subscribe;
        this.onRouteChange.subscribe = function() {
            arguments[0]({ type: 'subscribe' });
            return fn.apply(this, arguments);
        }


        this.initializeRouterEvents();
        this.navigate = this.navigate.bind(this);

        InternalService.instance = this;
    }

    public navigate(url: string, data: any = {}, title: string = '', replaceState?: boolean) {
        const resolvedUrl = urlResolve(url);
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

        fromEvent(window, 'popstate').subscribe(event => this.runEvaluate(event));
        fromEvent(window, 'pushState').subscribe(event => this.runEvaluate(event));
        fromEvent(window, 'replaceState').subscribe(event => this.runEvaluate(event));
    }

    private overwriteHistoryStateFunctions(type: keyof History): () => void {
        const originalFunction = history[type];
        return function () {
            originalFunction.apply(this, arguments);
            const newEvent: any = new Event(type);
            newEvent['arguments'] = arguments;
            window.dispatchEvent(newEvent);
        }
    }
}
