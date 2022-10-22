export interface CanActivate {
    canActivate(): Promise<boolean> | boolean;
}
