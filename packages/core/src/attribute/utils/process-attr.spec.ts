import { AttributeTypeEnum } from "../../enums/attribute-type.enum";
import { processAttr } from "./process-attr";

describe('process-attr', function() {

    it('should add observedAttributesArray and observedAttributesObject if no observedAttributesObject present', function() {
        const target = class {};
        expect(target['observedAttributesArray']).toBeFalsy();
        expect(target['observedAttributesObject']).toBeFalsy();
        processAttr(new target(), 'test', AttributeTypeEnum.normal);
        expect(target['observedAttributesArray']).toBeTruthy();
        expect(target['observedAttributesObject']).toBeTruthy();
    });

});