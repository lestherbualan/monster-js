import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";

export const detectChanges = (context: ComponentInstanceInterface) => context.$wrapper.changeDetection.detectChanges();