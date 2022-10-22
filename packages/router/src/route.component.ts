import {
    Component,
    ComponentInterface,
    Container,
    getSelector,
    ifCondition,
    ObjectInterface,
    OnDestroy,
    OnInit,
    PropsService,
    renderChild,
    Services,
    viewProps
} from '@monster-js/core';
import { RouteInterface } from './interfaces/route.interface';
import { InternalService } from './utils/internal.service';
import { evaluateRoutePath } from './utils/evaluate-route-path';
import { fakeDefineComponent } from './utils/fake-define-component';
import { Subscription } from 'rxjs';
import { bootstrapModule } from '@monster-js/core/module';

@Services(PropsService)
@Component('app-route')
export class Route implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    private isActive: boolean = false;
    private internalService: InternalService = new InternalService();
    private selector: string = null!;
    private container: Container = null!;
    private paramCaller = () => {
        const params: ObjectInterface = {};
        const path: string = this.propsService.get('path');
        const wPath = location.pathname;
        const pathArr = path.split('/').filter(item => !!item);
        const wPathArr = wPath.split('/').filter(item => !!item);
        pathArr.forEach((item, index) => {
            if (item.indexOf(':') === 0) {
                const key = item.substring(1);
                params[key] = wPathArr[index];
            }
        });
        return params;
    };
    private guardRegistered: boolean = false;

    constructor(private propsService: PropsService<RouteInterface>) {
        this.evaluate = this.evaluate.bind(this);
        this.processModule = this.processModule.bind(this);
    }

    onInit(): void {
        this.subscriptions.push(this.internalService.evaluate.subscribe(this.evaluate));
        this.evaluate();
    }

    onDestroy(): void {
        this.subscriptions.forEach(item => item.unsubscribe());
    }


    /**
     * Register guards into di container
     * 
     * @param component the root component of a module or the component passed as prop:component in app-route
     * @returns void
     */
    private registerGuards(component: ComponentInterface) {
        if (this.guardRegistered) {
            return;
        }

        const guards = this.propsService.get('guards') || [];
        this.container = new Container(component.dataSource!);
        guards.forEach(guard => this.container.register(guard, { singleton: false, target: guard }));
        this.guardRegistered = true;
    }


    private async evaluate() {
        const props = this.propsService.get();
        const match = evaluateRoutePath(props);

        if (this.isActive && !match) {
            if (!(await this.canDeactivate())) {
                return;
            }
            this.selector = null;
            this.isActive = false;
            return;
        }

        const redirectTo = this.propsService.get('redirectTo');
        if (match && redirectTo) {
            this.internalService.navigate(redirectTo, {}, '', true);

            this.selector = null;
            this.isActive = false;
            return;
        }

        if (!props.component && !props.module && !redirectTo) {
            throw `The route ${props.path} does not have a component or module property.`;
        }

        if (!this.isActive && match) {
            if (props.component && !this.selector) {
                await this.processComponent(props);
            } else if (props.module && !this.selector) {
                await this.processModule();
            }
        }
    }

    private async processGuard(method: string): Promise<boolean> {
        const guards = this.propsService.get('guards') || [];
        let checkResult = true;
        for (let i = 0; i < guards.length; i++) {
            const guard = guards[i];
            const instance = this.container.resolve<ObjectInterface>(guard);
            if (instance[method] && typeof instance[method] === 'function') {
                const result = await instance[method]();
                if (!result) {
                    checkResult = false;
                }
            }
        }
        return checkResult;
    }

    private async canActivate(): Promise<boolean> {
        return await this.processGuard('canActivate');
    }

    private async canDeactivate(): Promise<boolean> {
        return await this.processGuard('canDeactivate');
    }

    private async processComponent(props: RouteInterface) {
        if (props.component) {
            this.registerGuards(props.component);

            if (!(await this.canActivate())) {
                return;
            }

            this.isActive = true;

            const defined = customElements.get(getSelector(props.component));
            if (!defined) {
                throw `The component '${getSelector(props.component)}' is not defined.`;
            }
            fakeDefineComponent(this, props.component);

            this.selector = getSelector(props.component);
        }
    }

    private async processModule() {
        const module = await this.propsService.get('module')!();
        if (!module) {
            throw `The import statement in route ${this.propsService.get('path')} when lazy loading a module must return the module after a promise is resolved.`;
        }
        if (!module.config.root) {
            throw `The root component in '${module.name}' module is not defined. Please add a root component so that router can process the module correctly.`;
        }

        fakeDefineComponent(this, module.config.root!)
        bootstrapModule(module);

        this.registerGuards(module.config.root!);

        const canActivate = await this.canActivate();
        if (!canActivate) {
            return;
        }

        this.isActive = true;
        this.selector = getSelector(module.config.root);
    }

    render(): any {
        return ifCondition(
            this,
            () => viewProps(this, renderChild(this.selector, this) as any, { params: () => this.paramCaller }) ,
            () => this.isActive && !!this.selector
        );
    }
}