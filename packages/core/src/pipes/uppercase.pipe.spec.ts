import { uppercasePipe } from "./uppercase.pipe";

describe('uppercase.pipe', function() {

    it('should transform text into uppercase from logic', function() {
        const text = uppercasePipe('Hello World');
        expect(text).toBe('HELLO WORLD');
    });

    it('should transform text into uppercase from template');
});