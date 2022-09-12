import { ComponentInstance } from "../interfaces/component-instance.interface";
import { viewPipe } from "./view-pipe";

describe('view-pipe', function() {

    it('should transform text using the registered pipe', function() {

        const context: Partial<ComponentInstance> = {
            pipes: {
                lowercase: (text: string) => text.toLowerCase()
            }
        };

        const transformed = viewPipe(context as any, 'lowercase', 'Hello World');
        expect(transformed).toBe('hello world');

    });

});