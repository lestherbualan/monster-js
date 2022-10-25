import { ComponentInstanceInterface, detectChanges } from "../core";

describe('detect-changes', function() {

    it('should run detectChanges function', async function() {
        const context: Partial<ComponentInstanceInterface> = { };
        context.$wrapper = {
            changeDetection: {
                detectChanges() {}
            }
        } as any;
        spyOn(context.$wrapper.changeDetection, 'detectChanges');
        await detectChanges(context as ComponentInstanceInterface);
        expect(context.$wrapper.changeDetection.detectChanges).toHaveBeenCalled();
    });

});