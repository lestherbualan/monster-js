export interface HookItem {
    isActive(): boolean;
    hook: (...args: any[]) => void;
}