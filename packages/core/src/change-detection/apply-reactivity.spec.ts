import { applyReactivity } from './apply-reactivity';

describe('apply-reactivity', function() {

    let mockComponentInstance = { testProp: 'test value' };

    beforeEach(function() {
        mockComponentInstance = {
            testProp: 'test value'
        };
    });

    it('should apply getters and setters to all properties', function() {
        applyReactivity(mockComponentInstance, () => {});
        const descriptors = Object.getOwnPropertyDescriptor(mockComponentInstance, 'testProp');
        expect(descriptors.get).toBeDefined();
        expect(descriptors.set).toBeDefined();
    });

    it('should call the callback function when setting a value', function() {
        let handler = { fn: () => {} };
        spyOn(handler, 'fn');
        applyReactivity(mockComponentInstance, handler.fn);
        mockComponentInstance.testProp = 'sample change';
        expect(handler.fn).toHaveBeenCalled();
        mockComponentInstance.testProp = 'sample change 2';
        expect(handler.fn).toHaveBeenCalledTimes(2);
    });

    it('should return the correct value when calling a property', function() {
        applyReactivity(mockComponentInstance, () => {});
        mockComponentInstance.testProp = 'sample change';
        expect(mockComponentInstance.testProp).toBe('sample change');
    });

});