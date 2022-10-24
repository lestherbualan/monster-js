import { AttributeTypeEnum } from "../enums/attribute-type.enum";
import { AttrBoolean } from "./attr-boolean.decorator";

describe('attr-boolean.decorator', function() {

    let target;
    let targetInstance;

    beforeEach(function() {
        target = class {};
        targetInstance = new target();
    });

    it('should add the property key to the observedAttributesArray', function() {
        const key = 'test';
        AttrBoolean(targetInstance, key);
        expect(target['observedAttributesArray'][0]).toBe(key);
    });

    it('should add the property key to the observedAttributesObject and the value should be boolean', function() {
        const key = 'test';
        AttrBoolean(targetInstance, key);
        expect(target['observedAttributesObject'][key]).toBe(AttributeTypeEnum.boolean);
    });

});