import { ComponentInstance } from "../interfaces/component-instance.interface";
import { pipes } from "./pipes";

describe('pipes', function() {

    it('should add pipes to the function component', function() {
        function app() { return null; }
        function pip() {}
        pip.selector = 'pip';
        pipes(app, [pip]);
        expect((app as unknown as ComponentInstance).pipes.pip).toBe(pip);
    });

});