export interface Watcher {
    val: any;
    isConnected: () => boolean;
    isUpdated: () => boolean;
    update: (value?: any) => void;
}