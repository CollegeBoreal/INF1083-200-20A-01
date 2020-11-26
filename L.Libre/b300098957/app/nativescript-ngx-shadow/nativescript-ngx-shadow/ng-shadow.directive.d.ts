import { ElementRef, OnChanges, OnInit, SimpleChanges, Renderer2, AfterViewInit } from '@angular/core';
import { AndroidData } from './common/android-data.model';
import { IOSData } from './common/ios-data.model';
import { Shape } from './common/shape.enum';
export declare class NativeShadowDirective implements OnInit, OnChanges, AfterViewInit {
    private el;
    private render;
    shadow: string | AndroidData | IOSData;
    elevation?: number | string;
    pressedElevation?: number | string;
    shape?: Shape;
    bgcolor?: string;
    cornerRadius?: number | string;
    translationZ?: number | string;
    pressedTranslationZ?: number | string;
    forcePressAnimation?: boolean;
    maskToBounds?: boolean;
    shadowColor?: string;
    shadowOffset?: number | string;
    shadowOpacity?: number | string;
    shadowRadius?: number | string;
    useShadowPath?: boolean;
    rasterize?: boolean;
    private loaded;
    private initialized;
    private originalNSFn;
    private previousNSFn;
    private iosShadowRapper;
    constructor(el: ElementRef, render: Renderer2);
    ngOnInit(): void;
    onLoaded(): void;
    private addIosWrapper();
    onUnloaded(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private monkeyPatch;
    private applyShadow();
    private initializeCommonData();
    private initializeAndroidData();
    private initializeIOSData();
    private loadFromAndroidData(data);
    private loadFromIOSData(data);
}
