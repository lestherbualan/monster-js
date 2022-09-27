import { directive, DirectiveParam, dirCreateWatcher, dirOnDestroy, Subscription } from '@monster-js/core';
import { InternalService } from './internal.service';
import { routeMatcher } from './utils/route-matcher';

export function routerDir(params: DirectiveParam) {
    const internalService = new InternalService();
    const { directives, element } = params;
    const { link, linkActive, linkActiveExact } = directives;
    const subscriptions: Subscription[] = [];

    function updater() {
        const isExact = linkActiveExact ? linkActiveExact.get() : false;
        const routeActive = routeMatcher(link.get(), location.pathname, isExact);
        if (routeActive) {
            element.classList.add(linkActive.get());
        } else {
            element.classList.remove(linkActive.get());
        }
    }

    dirOnDestroy(params, () => subscriptions.forEach(item => item.unsubscribe()));

    if (link) {
        element.addEventListener('click', event => {
            event.preventDefault();
            internalService.navigate(link.get());
        });

        if (element.localName === 'a') {
            element.setAttribute('href', link.get());

            dirCreateWatcher(params, 'link', newValue => {
                element.setAttribute('href', newValue);
            })
        }

        if (linkActive) {
            updater();
            subscriptions.push(internalService.onRouteChange.subscribe(() => updater()));
        }
    }
}

directive(routerDir, 'router');