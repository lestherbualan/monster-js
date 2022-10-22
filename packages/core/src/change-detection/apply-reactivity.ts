export function applyReactivity(obj: { [key: string]: any }, changeCallback: () => void) {
    Object.keys(obj).forEach(key => {
        let initialValue = obj[key];
        Object.defineProperty(obj, key, {
            get: () => initialValue,
            set(value) {
                if (initialValue !== value) {
                    initialValue = value;
                    changeCallback();
                }
            }
        });
    });
}
