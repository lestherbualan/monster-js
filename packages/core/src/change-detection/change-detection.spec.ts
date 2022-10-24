import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { ChangeDetection } from "./change-detection";

describe('change-detection', function() {

    let instance: ChangeDetection;
    let wrapper: Partial<ComponentWrapperInstanceInterface>;

    beforeEach(function() {
        wrapper = {};
        instance = new ChangeDetection(wrapper as ComponentWrapperInstanceInterface);
    });

    it('should not evaluate watchers if not connected', function() {
        expect(instance['watchers'].length).toBe(0);
        instance['watchers'].push({
            isConnected: () => false,
            isUpdated: () => false,
            update: () => {},
            val: null
        });
        instance.detectChanges();
        // expect watchers length to be 1 means change detection is not able to evaluate watchers
        // since watchers[0] isConnected function returns false and should will be removed during watchers evaluation
        expect(instance['watchers'].length).toBe(1);
    });

    it('should run only once even called multiple times', async function() {
        wrapper.hooksCaller = () => {};
        spyOn(wrapper, 'hooksCaller');
        instance.connected();
        const promises: Promise<any>[] = [];
        promises.push(instance.detectChanges());
        promises.push(instance.detectChanges());
        promises.push(instance.detectChanges());
        await Promise.all(promises);
        expect(wrapper.hooksCaller).toHaveBeenCalledTimes(1);
    });

    it('should be able to add a watcher', function() {
        expect(instance['watchers'].length).toBe(0);
        instance.addWatcher({ isConnected: () => true, isUpdated: () => true, update: () => {}, val: null });
        instance.addWatcher({ isConnected: () => true, isUpdated: () => true, update: () => {}, val: null });
        expect(instance['watchers'].length).toBe(2);
    });

    it('should be able to add a conditional watcher', function() {
        expect(instance['conditionWatchers'].length).toBe(0);
        instance.addWatcher({ isConnected: () => true, isUpdated: () => true, update: () => {}, val: null }, true);
        instance.addWatcher({ isConnected: () => true, isUpdated: () => true, update: () => {}, val: null }, true);
        expect(instance['conditionWatchers'].length).toBe(2);
    });

    it('should remove watchers that are not connected', async function() {
        wrapper.hooksCaller = () => {};
        expect(instance['watchers'].length).toBe(0);
        expect(instance['conditionWatchers'].length).toBe(0);
        instance.addWatcher({ isConnected: () => true, isUpdated: () => true, update: () => {}, val: null });
        instance.addWatcher({ isConnected: () => false, isUpdated: () => true, update: () => {}, val: null });
        instance.addWatcher({ isConnected: () => true, isUpdated: () => true, update: () => {}, val: null }, true);
        instance.addWatcher({ isConnected: () => false, isUpdated: () => true, update: () => {}, val: null }, true);
        expect(instance['watchers'].length).toBe(2);
        expect(instance['conditionWatchers'].length).toBe(2);
        instance.connected();
        await instance.detectChanges();
        expect(instance['watchers'].length).toBe(1);
        expect(instance['conditionWatchers'].length).toBe(1);
    });

});