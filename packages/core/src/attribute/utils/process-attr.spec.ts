import { AttributeTypeEnum } from "../../enums/attribute-type.enum";
import { processAttr } from "./process-attr";

describe('process-attr', function() {

    let target;
    let targetInstance;

    beforeEach(function() {
        target = class {};
        targetInstance = new target();
    });

    it('should add observedAttributesArray and observedAttributesObject if no observedAttributesObject present', function() {
        expect(target['observedAttributesArray']).toBeFalsy();
        expect(target['observedAttributesObject']).toBeFalsy();
        processAttr(targetInstance, 'test', AttributeTypeEnum.normal);
        expect(target['observedAttributesArray']).toBeTruthy();
        expect(target['observedAttributesObject']).toBeTruthy();
    });

    it('should not replace observedAttributesArray and observedAttributesObject if already present', function() {
        expect(target['observedAttributesArray']).toBeFalsy();
        expect(target['observedAttributesObject']).toBeFalsy();
        processAttr(targetInstance, 'test', AttributeTypeEnum.normal);
        expect(target['observedAttributesArray']).toBeTruthy();
        expect(target['observedAttributesObject']).toBeTruthy();

        const observedAttributesArray = target['observedAttributesArray'];
        const observedAttributesObject = target['observedAttributesObject'];

        processAttr(targetInstance, 'test2', AttributeTypeEnum.normal);

        expect(target['observedAttributesArray']).toBe(observedAttributesArray);
        expect(target['observedAttributesObject']).toBe(observedAttributesObject);
    });

    it('should add the key to observedAttributesObject and the value should be the attribute type', function() {
        const key = 'kebabCaseKey';
        const kebabKey = 'kebab-case-key';

        processAttr(targetInstance, key, AttributeTypeEnum.normal);
        expect(target['observedAttributesObject'][kebabKey]).toBe(AttributeTypeEnum.normal);
    });

    it('should add the key to observedAttributesObject as kebab cased if the key is in camel case', function() {
        const key = 'kebabCaseKey';
        const kebabKey = 'kebab-case-key';

        processAttr(targetInstance, key, AttributeTypeEnum.normal);
        expect(target['observedAttributesObject'][kebabKey]).toBeTruthy();
    });

    it('should push the key to the observedAttributesArray as kebab cased if the key is in camel case', function() {
        const key = 'kebabCaseKey';
        const kebabKey = 'kebab-case-key';

        processAttr(targetInstance, key, AttributeTypeEnum.normal);
        expect(target['observedAttributesArray'][0]).toBe(kebabKey);
    });

    it('should push the key to the observedAttributesArray', function() {
        const key = 'test';
        const key2 = 'test2';

        processAttr(targetInstance, key, AttributeTypeEnum.normal);
        expect(target['observedAttributesArray'].length).toBe(1);
        expect(target['observedAttributesArray'][0]).toBe(key);

        // test to verify that the old key is not removed when running the function again
        processAttr(targetInstance, key2, AttributeTypeEnum.normal);
        expect(target['observedAttributesArray'].length).toBe(2);
        expect(target['observedAttributesArray'][1]).toBe(key2);
    });

});