import { ComponentWrapperInstanceInterface } from "./component-wrapper-instance.interface";
import { AdoptedCallback } from "./impls/adopted-callback.impl";
import { AfterViewInit } from "./impls/after-view-init.impl";
import { AttributeChangeCallback } from "./impls/attribute-change-callback.impl";
import { BeforeViewInit } from "./impls/before-view-init.impl";
import { ConnectedCallback } from "./impls/connected-callback.impl";
import { DisconnectedCallback } from "./impls/disconnected-callback.impl";
import { OnChangeDetection } from "./impls/on-change-detection.impl";
import { OnDestroy } from "./impls/on-destroy.impl";
import { OnInit } from "./impls/on-init.impl";
import { OnPropsChange } from "./impls/on-props-change.impl";
import { OnViewChange } from "./impls/on-view-change.impl";
import { ObjectInterface } from "./object.interface";

export interface ComponentInstanceInterface
    extends
    Partial<ConnectedCallback>,
    Partial<OnInit>,
    Partial<DisconnectedCallback>,
    Partial<OnPropsChange>,
    Partial<OnDestroy>,
    Partial<OnViewChange>,
    Partial<BeforeViewInit>,
    Partial<AfterViewInit>,
    Partial<AttributeChangeCallback>,
    Partial<AdoptedCallback>,
    Partial<OnChangeDetection>
{
    $wrapper?: ComponentWrapperInstanceInterface;
    render(injections?: ObjectInterface): any;
}