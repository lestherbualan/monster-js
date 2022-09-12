import { camelToKebab } from "./camel-to-kebab";

describe('camel-to-kebab', function() {

    it('should convert camel case to kebab case', function() {
        const result = camelToKebab('testStringTest1');
        const result2 = camelToKebab('TestStringTest2');
        const result3 = camelToKebab('Test-String-Test3');
        const result4 = camelToKebab('test-String-Test4');
        expect(result).toBe('test-string-test1');
        expect(result2).toBe('test-string-test2');
        expect(result3).toBe('test-string-test3');
        expect(result4).toBe('test-string-test4');
    });

});