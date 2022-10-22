export interface CanDeactivate {
    canDeactivate(): Promise<boolean> | boolean;
}