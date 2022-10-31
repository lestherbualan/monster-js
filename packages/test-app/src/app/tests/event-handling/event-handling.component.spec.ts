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

    it('should pass the proper parameter to the method', function() {
        const { component, query } = render();
        const btn = query<HTMLButtonElement>('button#with-param');
        expect(component.param).toBeNull();
        btn.click();
        expect(component.param).toBe('hello world');
    });

    it('should pass $event variable as parameter', function() {
        const { component, query } = render();
        const btn = query<HTMLButtonElement>('button#event-param');
        expect(component.param).toBeNull();
        btn.click();
        expect(component.param).toBeInstanceOf(Event);
    });

});