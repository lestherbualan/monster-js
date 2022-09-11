import { GuardType } from "../enums/guard-type.enum";
import { Route } from "../interfaces/route.interface";

export async function processGuards(route: Route, guard: GuardType): Promise<boolean> {
    const promises: Promise<boolean>[] = [];
    for (let i = 0; i < route.guards.length; i++) {
        const guardData = route.guards[i](this);
        if (guardData[guard]) {
            const caller = async () => {
                return await guardData[guard]();
            }
            promises.push(caller());
        }
    }
    const responses = await Promise.all(promises);
    if (responses.indexOf(false) >= 0) {
        return false;
    }
    return true;
}