import { addEventListener } from "./add-event-listener";

describe('add-event-listener', function() {

    it('should add an event listener', function() {
        const element = document.createElement('button');
        let counter = 0;
        addEventListener(element, 'click', () => {
            counter++;
        });
        element.click();
        expect(counter).toBe(1);
        element.click();
        expect(counter).toBe(2);
    });

});