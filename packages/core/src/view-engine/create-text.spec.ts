import { createText } from "./create-text";

describe('create-text', function() {

    it('should create a text node', function() {
        const text = createText('hello world');
        expect(text).toBeInstanceOf(Text);
        expect(text.textContent).toBe('hello world');
    });

});