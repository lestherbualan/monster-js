import { directive } from "./directive";

describe('directive', function() {

    it('should add selector to a directive function', function() {
        function dir() {}
        directive(dir, 'highlight');
        expect((dir as any).selector).toBe('highlight');
    });

});