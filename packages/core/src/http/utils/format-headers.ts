import { ObjectInterface } from "../../interfaces/object.interface";

export function formatHeaders(config: RequestInit) {
    const headers: ObjectInterface<any> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(config.headers || {})
    };
    return headers;
}