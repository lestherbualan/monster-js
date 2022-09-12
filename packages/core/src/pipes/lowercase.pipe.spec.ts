import { lowercasePipe } from "./lowercase.pipe";

describe('lowercase.pipe', function() {

    it('should transform text into lowercase from logic', function() {
        const text = lowercasePipe('Hello World');
        expect(text).toBe('hello world');
    });

    it('should transform text into lowercase from template');

});