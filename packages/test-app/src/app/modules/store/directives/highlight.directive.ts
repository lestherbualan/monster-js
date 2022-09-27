import { directive, DirectiveParam } from '@monster-js/core';

export function highlightDir(param: DirectiveParam) {
    const { element } = param;
    const { color } = param.directives;
    if (color) {
        element.style.background = color.get();
    }
}

directive(highlightDir, 'highlight');