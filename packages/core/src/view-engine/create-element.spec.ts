import { createElement } from "./create-element";

describe('create-element', function() {

    it('should create an element', function() {
        const element = createElement('div');
        expect(element).toBeTruthy();
        expect(element.localName).toBe('div');
    });

    it('should create an element with attributes', function() {
        const element = createElement('div', { id: 'id-test', class: 'cls' });
        expect(element).toBeTruthy();
        expect(element.getAttribute('id')).toBe('id-test');
        expect(element.classList.contains('cls')).toBeTrue();
    });

    it('should create an element with children', function() {
        const child1 = document.createElement('div');
        const child2 = document.createElement('div');
        const element = createElement('div', {}, [child1, child2]);
        expect(element).toBeTruthy();
        expect(element.childNodes.length).toBe(2);
        expect(element.childNodes[0]).toBe(child1);
        expect(element.childNodes[1]).toBe(child2);
    });

});