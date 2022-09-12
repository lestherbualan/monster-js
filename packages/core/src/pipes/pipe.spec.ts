import { pipe } from "./pipe";

describe('pipe', function() {

    it('should add a selector to a pipe', function() {
        function samplePipe() {}
        pipe(samplePipe, 'uppercase');
        expect((samplePipe as any).selector).toBe('uppercase');
    });

});