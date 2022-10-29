import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";

export const detectChanges = async (context: ComponentInstanceInterface) => await context.$wrapper.changeDetection.detectChanges();