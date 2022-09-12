import { FunctionComponent } from "../interfaces/function-component.interface";
import { directives } from "./directives";

describe('directives', function() {

    it('should add directives to the function component', function() {
        function dir() {}
        dir.selector = 'highlight';
        function app() { return null; }
        directives(app, [dir]);
        expect((app as FunctionComponent).directives.highlight).toBe(dir);
    });

});