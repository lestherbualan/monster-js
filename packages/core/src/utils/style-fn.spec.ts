import { FunctionComponent } from "../interfaces/function-component.interface";
import { _StyleFn } from "./style-fn";

describe('style-fn', function() {

    it('should add style to function component', function() {

        function app() { return null; }
        const style = '.btn { color: red; }';
        _StyleFn(style, app);
        expect((app as FunctionComponent).styles).toBe(style);

    });

});