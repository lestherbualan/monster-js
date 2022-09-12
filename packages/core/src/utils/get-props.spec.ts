import { ComponentInstance } from "../interfaces/component-instance.interface";
import { getProps } from "./get-props";

describe('get-props', function() {

    it('should return the specific prop form the context if there is a second param', function() {
        const context: Partial<ComponentInstance> = {
            props: { test: 100 }
        };
        const test = getProps<{ test: number }>(context as any, 'test');
        expect(test).toBe(100);
    });

    it('should return the whole props form the context if there is no second param', function() {
        const context: Partial<ComponentInstance> = {
            props: { test: 100 }
        };
        const props = getProps<{ test: number }>(context as any);
        expect(props.test).toBe(100);

    });

});