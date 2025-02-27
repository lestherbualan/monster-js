import { resolve } from "path";

export const paths = {
    component: resolver('assets/component/component-logic.txt'),
    shadowComponent: resolver('assets/component/shadow-component-logic.txt'),
    componentTest: resolver('assets/component/component-test.txt'),
    fnComponent: resolver('assets/component/function-component-logic.txt'),
    shadowFnComponent: resolver('assets/component/shadow-function-component-logic.txt'),
    fnComponentTest: resolver('assets/component/function-component-test.txt'),
    service: resolver('assets/service/service.txt'),
    module: resolver('assets/module/module.txt'),
    guard: resolver('assets/guard/guard.txt'),
    class: resolver('assets/class/class.txt'),
    directive: resolver('assets/directive/directive.txt'),
    pipe: resolver('assets/pipe/pipe.txt'),
    interface: resolver('assets/interface/interface.txt'),
    enum: resolver('assets/enum/enum.txt'),
    newApp: resolver('assets/starter-app')
};

function resolver(path: string) {
    return resolve(__dirname, path);
}
