export function isObject(obj: any): boolean {
    return !!obj && !Array.isArray(obj) && typeof obj === 'object';
}