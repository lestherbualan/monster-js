import { createComponentTester } from '@monster-js/tester';
import { EventHandlingComponent } from './event-handling.component';

describe('attribute-binding.component.tsx', function() {

    const { render } = createComponentTester<EventHandlingComponent>(EventHandlingComponent);

    it('should call the method when event is triggered', function() {
        const { component, query } = render();
        const onClick = query<HTMLButtonElement>('button#on-click');
        const onPreventClick = query<HTMLButtonElement>('button#on-prevent-click');
        spyOn(component, 'onClick');
        onClick.click();
        expect(component.onClick).toHaveBeenCalledTimes(1);
        onPreventClick.click();
        expect(component.onClick).toHaveBeenCalledTimes(2);
    });

});