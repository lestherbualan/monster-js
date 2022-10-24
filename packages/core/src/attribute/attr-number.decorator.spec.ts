import { AttributeTypeEnum } from "../enums/attribute-type.enum";
import { AttrNumber } from "./attr-number.decorator";

describe('attr-number.decorator', function() {

    let target;
    let targetInstance;

    beforeEach(function() {
        target = class {};
        targetInstance = new target();
    });

    it('should add the property key to the observedAttributesArray', function() {
        const key = 'test';
        AttrNumber(targetInstance, key);
        expect(target['observedAttributesArray'][0]).toBe(key);
    });

    it('should add the property key to the observedAttributesObject and the value should be number', function() {
        const key = 'test';
        AttrNumber(targetInstance, key);
        expect(target['observedAttributesObject'][key]).toBe(AttributeTypeEnum.number);
    });

});
