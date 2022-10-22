import { Container } from "../../dependency-injection/container";

export interface OnReceiveConfig {
    onReceiveConfig(config: any, container: Container): void;
}