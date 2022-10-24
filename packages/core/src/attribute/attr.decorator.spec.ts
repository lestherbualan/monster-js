import { AttributeTypeEnum } from "../enums/attribute-type.enum";
import { Attr } from "./attr.decorator";

describe('attr.decorator', function() {

    let target;
    let targetInstance;

    beforeEach(function() {
        target = class {};
        targetInstance = new target();
    });

    it('should add the property key to the observedAttributesArray', function() {
        const key = 'test';
        Attr(targetInstance, key);
        expect(target['observedAttributesArray'][0]).toBe(key);
    });

    it('should add the property key to the observedAttributesObject and the value should be normal', function() {
        const key = 'test';
        Attr(targetInstance, key);
        expect(target['observedAttributesObject'][key]).toBe(AttributeTypeEnum.normal);
    });

});
