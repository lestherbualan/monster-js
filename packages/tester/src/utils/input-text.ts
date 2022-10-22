import { fireEvent } from "./fire-event";

export function inputText(element: Element, text: string): void;
export function inputText(element: Element, text: string, delay: number): Promise<null>;
export function inputText(element: Element, text: string, delay: number = 0) {
    let el = element as HTMLInputElement;
    el.value = '';
    if (delay) {
        console.log('has delay');
        return new Promise((resolve) => {

            const textArr = text.split('');
            let elValue = el.value;

            if (textArr.length === 0) {
                resolve(null);
                return;
            }

            for (let index = 0; index < textArr.length; index++) {
                setTimeout(() => {
                    elValue = elValue + textArr[index];
                    el.value = elValue;
                    fireEvent(el, 'input');

                    if (textArr.length - 1 === index) {
                        resolve(null);
                    }
                }, delay * index);
            }
        });
    } else {
        const textArr = text.split('');
        let elValue = el.value;
        let count = 0;
        while(textArr.length > count) {
            elValue = elValue + textArr[count];
            el.value = elValue;
            fireEvent(el, 'input');
            count++;
        }
    }
}
