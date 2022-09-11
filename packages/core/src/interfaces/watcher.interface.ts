export interface Watcher {
    currentValue: any;
    isConnected: () => boolean;
    isUpdated: () => boolean;
    update: (value?: any) => void;
}