import { ComponentInstance } from "../interfaces/component-instance.interface";
import { viewDirective } from "./view-directive";

describe('view-directive', function() {

    it('should log an error if directive is not registered', function() {
        const context: Partial<ComponentInstance> = {
            directives: { }
        };
        spyOn(console, 'error');
        viewDirective(context as any, document.createElement('div'), [{
            namespace: 'test',
            directives: {}
        }]);
        expect(console.error).toHaveBeenCalled();
    });

    it('should call registered directives', function() {
        const directive = function() {}
        const context: Partial<ComponentInstance> = {
            directives: {
                view: directive
            }
        };
        spyOn(context.directives, 'view');
        viewDirective(context as any, document.createElement('div'), [{
            namespace: 'view',
            directives: {}
        }]);
        expect(context.directives.view).toHaveBeenCalled();
    });

});