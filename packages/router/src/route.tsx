import { afterInit, component, onDestroy, useState } from '@monster-js/core';
import { GuardType } from './enums/guard-type.enum';
import { Route } from './interfaces/route.interface';
import { InternalService } from './internal.service';
import { getRouteParams } from './utils/get-route-params';
import { getSelector } from './utils/get-selector';
import { processGuards } from './utils/process-guards';
import { routeMatcher } from './utils/route-matcher';
import { validateRouteProps } from './utils/validate-route-props';

function routeFn(route: Route) {

    /**
     * Validate route props
     */
    validateRouteProps(route);


    /**
     * Declarations
     */
    const [ isActive, setIsActive ] = useState(this, false);
    const internalService       = new InternalService();
    const evaluateSubscription  = internalService.evaluate.subscribe(async () => await evaluate());
    const matcher               = () => routeMatcher(route.path, window.location.pathname, route.exact);
    const view                  = { selector: '' };


    async function evaluate() {
        let previousValue = isActive();
        let isActiveHolder = isActive();
        if (route.redirectTo && matcher()) {
            internalService.navigate(route.redirectTo, {}, '', true);
            return;
        } else {
            isActiveHolder = matcher();
        }


        /**
         * Process guards canActivate
         */
        if (isActiveHolder && route.guards && route.guards.length > 0) {
            isActiveHolder = await processGuards(route, GuardType.canActivate);
        } else if (!isActiveHolder && previousValue && route.guards && route.guards.length > 0) {
            isActiveHolder = !(await processGuards(route, GuardType.canDeactivate));
        }


        if(!view.selector && isActiveHolder) {
            view.selector = await getSelector(route);
        }

        setIsActive(isActiveHolder);
    };


    /**
     * Hooks
     */
    onDestroy(this, () => evaluateSubscription.unsubscribe());
    afterInit(this, async () => await evaluate());


    return <view.selector
        view:if={isActive()}
        prop:router-params={getRouteParams(route)}
    ></view.selector>
};

export const route = component(routeFn, 'app-route');
