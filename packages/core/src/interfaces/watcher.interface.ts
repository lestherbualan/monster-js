export interface WatcherInterface {
    val: any;
    isConnected: () => boolean;
    isUpdated: () => boolean;
    update: (value?: any) => void;
}