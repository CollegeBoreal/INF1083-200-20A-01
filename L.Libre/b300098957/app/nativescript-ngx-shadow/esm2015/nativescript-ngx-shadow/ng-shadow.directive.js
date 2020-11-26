/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { isAndroid, isIOS } from 'tns-core-modules/platform';
import { Shadow } from './common/shadow';
export class NativeShadowDirective {
    /**
     * @param {?} el
     * @param {?} render
     */
    constructor(el, render) {
        this.el = el;
        this.render = render;
        this.loaded = false;
        this.initialized = false;
        this.monkeyPatch = val => {
            this.previousNSFn.call(this.el.nativeElement, val);
            this.applyShadow();
        };
        if (isAndroid) {
            this.originalNSFn = this.el.nativeElement._redrawNativeBackground; //always store the original method
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initializeCommonData();
        if (isAndroid) {
            this.initializeAndroidData();
        }
        else if (isIOS) {
            this.initializeIOSData();
        }
        if (this.shadow && (/** @type {?} */ (this.shadow)).elevation) {
            if (isAndroid) {
                this.loadFromAndroidData(/** @type {?} */ (this.shadow));
            }
            else if (isIOS) {
                this.loadFromIOSData(/** @type {?} */ (this.shadow));
            }
        }
        this.applyShadow();
        this.initialized = true;
    }
    /**
     * @return {?}
     */
    onLoaded() {
        this.loaded = true;
        // Weirdly ngOnInit isn't called on iOS on demo app
        // Managed to get it working on iOS when applying to
        // FlexboxLayout, but on the demo app, we apply to a
        // Label, and, for that case, ngOnInit isn't called
        // This is just enforcing the Directive is initialized
        // before calling this.applyShadow()
        if (!this.initialized) {
            this.ngOnInit();
        }
        this.applyShadow();
        if (isAndroid) {
            this.previousNSFn = this.el.nativeElement._redrawNativeBackground; // just to maintain compatibility with other patches
            this.el.nativeElement._redrawNativeBackground = this.monkeyPatch;
        }
    }
    /**
     * @return {?}
     */
    addIosWrapper() {
        if (isIOS) {
            const /** @type {?} */ originalElement = /** @type {?} */ (this.el.nativeElement);
            this.iosShadowRapper = /** @type {?} */ (this.render.createElement('StackLayout'));
            // wrappingElement.cssClasses = mainElement.cssClasses;
            const /** @type {?} */ parent = originalElement.parentNode;
            this.render.insertBefore(parent, this.iosShadowRapper, originalElement);
            this.render.removeChild(parent, originalElement);
            this.render.appendChild(this.iosShadowRapper, originalElement);
        }
    }
    /**
     * @return {?}
     */
    onUnloaded() {
        this.loaded = false;
        if (isAndroid) {
            this.el.nativeElement._redrawNativeBackground = this.originalNSFn; // always revert to the original method
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.addIosWrapper();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.loaded &&
            !!changes &&
            (changes.hasOwnProperty('shadow') ||
                changes.hasOwnProperty('elevation') ||
                changes.hasOwnProperty('pressedElevation') ||
                changes.hasOwnProperty('shape') ||
                changes.hasOwnProperty('bgcolor') ||
                changes.hasOwnProperty('cornerRadius') ||
                changes.hasOwnProperty('pressedTranslationZ') ||
                changes.hasOwnProperty('forcePressAnimation') ||
                changes.hasOwnProperty('translationZ') ||
                changes.hasOwnProperty('maskToBounds') ||
                changes.hasOwnProperty('shadowColor') ||
                changes.hasOwnProperty('shadowOffset') ||
                changes.hasOwnProperty('shadowOpacity') ||
                changes.hasOwnProperty('shadowRadius') ||
                changes.hasOwnProperty('rasterize') ||
                changes.hasOwnProperty('useShadowMap'))) {
            if (changes.hasOwnProperty('shadow') &&
                !changes.hasOwnProperty('elevation') &&
                typeof changes["shadow"].currentValue === 'number') {
                this.elevation = changes["shadow"].currentValue;
            }
            if (changes["shadow"] && changes["shadow"].currentValue.elevation) {
                if (isAndroid) {
                    this.loadFromAndroidData(/** @type {?} */ (this.shadow));
                }
                else if (isIOS) {
                    this.loadFromIOSData(/** @type {?} */ (this.shadow));
                }
            }
            this.applyShadow();
        }
    }
    /**
     * @return {?}
     */
    applyShadow() {
        if (this.shadow === null ||
            this.shadow === undefined ||
            (this.shadow === '' && !this.elevation)) {
            return;
        }
        // For shadows to be shown on Android the SDK has to be greater
        // or equal than 21, lower SDK means no setElevation method is available
        if (isAndroid) {
            if (android.os.Build.VERSION.SDK_INT < 21) {
                return;
            }
        }
        const /** @type {?} */ viewToApplyShadowTo = isIOS
            ? this.iosShadowRapper
            : this.el.nativeElement;
        if (viewToApplyShadowTo) {
            Shadow.apply(viewToApplyShadowTo, {
                elevation: /** @type {?} */ (this.elevation),
                pressedElevation: /** @type {?} */ (this.pressedElevation),
                shape: this.shape,
                bgcolor: this.bgcolor,
                cornerRadius: this.cornerRadius,
                translationZ: this.translationZ,
                pressedTranslationZ: this.pressedTranslationZ,
                forcePressAnimation: this.forcePressAnimation,
                maskToBounds: this.maskToBounds,
                shadowColor: this.shadowColor,
                shadowOffset: /** @type {?} */ (this.shadowOffset),
                shadowOpacity: /** @type {?} */ (this.shadowOpacity),
                shadowRadius: /** @type {?} */ (this.shadowRadius),
                rasterize: this.rasterize,
                useShadowPath: this.useShadowPath
            });
        }
    }
    /**
     * @return {?}
     */
    initializeCommonData() {
        const /** @type {?} */ tShadow = typeof this.shadow;
        if ((tShadow === 'string' || tShadow === 'number') && !this.elevation) {
            this.elevation = this.shadow ? parseInt(/** @type {?} */ (this.shadow), 10) : 2;
        }
        const /** @type {?} */ tElevation = typeof this.elevation;
        if (tElevation === 'string' || tElevation === 'number') {
            this.elevation = this.elevation
                ? parseInt(/** @type {?} */ (this.elevation), 10)
                : 2;
        }
    }
    /**
     * @return {?}
     */
    initializeAndroidData() {
        if (typeof this.cornerRadius === 'string') {
            this.cornerRadius = parseInt(this.cornerRadius, 10);
        }
        if (typeof this.translationZ === 'string') {
            this.translationZ = parseInt(this.translationZ, 10);
        }
    }
    /**
     * @return {?}
     */
    initializeIOSData() {
        if (typeof this.shadowOffset === 'string') {
            this.shadowOffset = parseFloat(this.shadowOffset);
        }
        if (typeof this.shadowOpacity === 'string') {
            this.shadowOpacity = parseFloat(this.shadowOpacity);
        }
        if (typeof this.shadowRadius === 'string') {
            this.shadowRadius = parseFloat(this.shadowRadius);
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    loadFromAndroidData(data) {
        this.elevation = data.elevation || this.elevation;
        this.shape = data.shape || this.shape;
        this.bgcolor = data.bgcolor || this.bgcolor;
        this.cornerRadius = data.cornerRadius || this.cornerRadius;
        this.translationZ = data.translationZ || this.translationZ;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    loadFromIOSData(data) {
        this.maskToBounds = data.maskToBounds || this.maskToBounds;
        this.shadowColor = data.shadowColor || this.shadowColor;
        this.shadowOffset = data.shadowOffset || this.shadowOffset;
        this.shadowOpacity = data.shadowOpacity || this.shadowOpacity;
        this.shadowRadius = data.shadowRadius || this.shadowRadius;
        this.rasterize = data.rasterize || this.rasterize;
        this.useShadowPath = data.useShadowPath || this.useShadowPath;
    }
}
NativeShadowDirective.decorators = [
    { type: Directive, args: [{ selector: '[shadow]' },] },
];
/** @nocollapse */
NativeShadowDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NativeShadowDirective.propDecorators = {
    shadow: [{ type: Input }],
    elevation: [{ type: Input }],
    pressedElevation: [{ type: Input }],
    shape: [{ type: Input }],
    bgcolor: [{ type: Input }],
    cornerRadius: [{ type: Input }],
    translationZ: [{ type: Input }],
    pressedTranslationZ: [{ type: Input }],
    forcePressAnimation: [{ type: Input }],
    maskToBounds: [{ type: Input }],
    shadowColor: [{ type: Input }],
    shadowOffset: [{ type: Input }],
    shadowOpacity: [{ type: Input }],
    shadowRadius: [{ type: Input }],
    useShadowPath: [{ type: Input }],
    rasterize: [{ type: Input }],
    onLoaded: [{ type: HostListener, args: ['loaded',] }],
    onUnloaded: [{ type: HostListener, args: ['unloaded',] }]
};
function NativeShadowDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NativeShadowDirective.prototype.shadow;
    /** @type {?} */
    NativeShadowDirective.prototype.elevation;
    /** @type {?} */
    NativeShadowDirective.prototype.pressedElevation;
    /** @type {?} */
    NativeShadowDirective.prototype.shape;
    /** @type {?} */
    NativeShadowDirective.prototype.bgcolor;
    /** @type {?} */
    NativeShadowDirective.prototype.cornerRadius;
    /** @type {?} */
    NativeShadowDirective.prototype.translationZ;
    /** @type {?} */
    NativeShadowDirective.prototype.pressedTranslationZ;
    /** @type {?} */
    NativeShadowDirective.prototype.forcePressAnimation;
    /** @type {?} */
    NativeShadowDirective.prototype.maskToBounds;
    /** @type {?} */
    NativeShadowDirective.prototype.shadowColor;
    /** @type {?} */
    NativeShadowDirective.prototype.shadowOffset;
    /** @type {?} */
    NativeShadowDirective.prototype.shadowOpacity;
    /** @type {?} */
    NativeShadowDirective.prototype.shadowRadius;
    /** @type {?} */
    NativeShadowDirective.prototype.useShadowPath;
    /** @type {?} */
    NativeShadowDirective.prototype.rasterize;
    /** @type {?} */
    NativeShadowDirective.prototype.loaded;
    /** @type {?} */
    NativeShadowDirective.prototype.initialized;
    /** @type {?} */
    NativeShadowDirective.prototype.originalNSFn;
    /** @type {?} */
    NativeShadowDirective.prototype.previousNSFn;
    /** @type {?} */
    NativeShadowDirective.prototype.iosShadowRapper;
    /** @type {?} */
    NativeShadowDirective.prototype.monkeyPatch;
    /** @type {?} */
    NativeShadowDirective.prototype.el;
    /** @type {?} */
    NativeShadowDirective.prototype.render;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2hhZG93LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25hdGl2ZXNjcmlwdC1uZ3gtc2hhZG93LyIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbmctc2hhZG93LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFJTCxTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUk3RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPekMsTUFBTTs7Ozs7SUF3QkosWUFBb0IsRUFBYyxFQUFVLE1BQWlCO1FBQXpDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO3NCQU41QyxLQUFLOzJCQUNBLEtBQUs7MkJBb0hMLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtRQWpIQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztTQUNuRTtLQUNGOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM5QjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxD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ckQsZUFBZSxDQUFDLElBQWE7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7Ozs7WUF4T2pFLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7Ozs7WUFuQmpDLFVBQVU7WUFNVixTQUFTOzs7cUJBZVIsS0FBSzt3QkFDTCxLQUFLOytCQUNMLEtBQUs7b0JBQ0wsS0FBSztzQkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSztrQ0FDTCxLQUFLO2tDQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFnQ0wsWUFBWSxTQUFDLFFBQVE7eUJBb0NyQixZQUFZLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtJztcblxuaW1wb3J0IHsgQW5kcm9pZERhdGEgfSBmcm9tICcuL2NvbW1vbi9hbmRyb2lkLWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgSU9TRGF0YSB9IGZyb20gJy4vY29tbW9uL2lvcy1kYXRhLm1vZGVsJztcbmltcG9ydCB7IFNoYWRvdyB9IGZyb20gJy4vY29tbW9uL3NoYWRvdyc7XG5pbXBvcnQgeyBTaGFwZSwgU2hhcGVFbnVtIH0gZnJvbSAnLi9jb21tb24vc2hhcGUuZW51bSc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcbmRlY2xhcmUgY29uc3QgYW5kcm9pZDogYW55O1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbc2hhZG93XScgfSlcbmV4cG9ydCBjbGFzcyBOYXRpdmVTaGFkb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHNoYWRvdzogc3RyaW5nIHwgQW5kcm9pZERhdGEgfCBJT1NEYXRhO1xuICBASW5wdXQoKSBlbGV2YXRpb24/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHByZXNzZWRFbGV2YXRpb24/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHNoYXBlPzogU2hhcGU7XG4gIEBJbnB1dCgpIGJnY29sb3I/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvcm5lclJhZGl1cz86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgdHJhbnNsYXRpb25aPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwcmVzc2VkVHJhbnNsYXRpb25aPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBmb3JjZVByZXNzQW5pbWF0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbWFza1RvQm91bmRzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hhZG93Q29sb3I/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNoYWRvd09mZnNldD86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgc2hhZG93T3BhY2l0eT86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgc2hhZG93UmFkaXVzPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSB1c2VTaGFkb3dQYXRoPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmFzdGVyaXplPzogYm9vbGVhbjtcblxuICBwcml2YXRlIGxvYWRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgb3JpZ2luYWxOU0ZuOiBhbnk7XG4gIHByaXZhdGUgcHJldmlvdXNOU0ZuOiBhbnk7XG4gIHByaXZhdGUgaW9zU2hhZG93UmFwcGVyOiBWaWV3O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyOiBSZW5kZXJlcjIpIHtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsTlNGbiA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5fcmVkcmF3TmF0aXZlQmFja2dyb3VuZDsgLy9hbHdheXMgc3RvcmUgdGhlIG9yaWdpbmFsIG1ldGhvZFxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUNvbW1vbkRhdGEoKTtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVBbmRyb2lkRGF0YSgpO1xuICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUlPU0RhdGEoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hhZG93ICYmICh0aGlzLnNoYWRvdyBhcyBBbmRyb2lkRGF0YSB8IElPU0RhdGEpLmVsZXZhdGlvbikge1xuICAgICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgICB0aGlzLmxvYWRGcm9tQW5kcm9pZERhdGEodGhpcy5zaGFkb3cgYXMgQW5kcm9pZERhdGEpO1xuICAgICAgfSBlbHNlIGlmIChpc0lPUykge1xuICAgICAgICB0aGlzLmxvYWRGcm9tSU9TRGF0YSh0aGlzLnNoYWRvdyBhcyBJT1NEYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hcHBseVNoYWRvdygpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbG9hZGVkJylcbiAgb25Mb2FkZWQoKSB7XG4gICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgIC8vIFdlaXJkbHkgbmdPbkluaXQgaXNuJ3QgY2FsbGVkIG9uIGlPUyBvbiBkZW1vIGFwcFxuICAgIC8vIE1hbmFnZWQgdG8gZ2V0IGl0IHdvcmtpbmcgb24gaU9TIHdoZW4gYXBwbHlpbmcgdG9cbiAgICAvLyBGbGV4Ym94TGF5b3V0LCBidXQgb24gdGhlIGRlbW8gYXBwLCB3ZSBhcHBseSB0byBhXG4gICAgLy8gTGFiZWwsIGFuZCwgZm9yIHRoYXQgY2FzZSwgbmdPbkluaXQgaXNuJ3QgY2FsbGVkXG5cbiAgICAvLyBUaGlzIGlzIGp1c3QgZW5mb3JjaW5nIHRoZSBEaXJlY3RpdmUgaXMgaW5pdGlhbGl6ZWRcbiAgICAvLyBiZWZvcmUgY2FsbGluZyB0aGlzLmFwcGx5U2hhZG93KClcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseVNoYWRvdygpO1xuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgIHRoaXMucHJldmlvdXNOU0ZuID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Ll9yZWRyYXdOYXRpdmVCYWNrZ3JvdW5kOyAvLyBqdXN0IHRvIG1haW50YWluIGNvbXBhdGliaWxpdHkgd2l0aCBvdGhlciBwYXRjaGVzXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuX3JlZHJhd05hdGl2ZUJhY2tncm91bmQgPSB0aGlzLm1vbmtleVBhdGNoO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkSW9zV3JhcHBlcigpIHtcbiAgICBpZiAoaXNJT1MpIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudCBhcyBWaWV3O1xuXG4gICAgICB0aGlzLmlvc1NoYWRvd1JhcHBlciA9IHRoaXMucmVuZGVyLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdTdGFja0xheW91dCdcbiAgICAgICkgYXMgU3RhY2tMYXlvdXQ7XG5cbiAgICAgIC8vIHdyYXBwaW5nRWxlbWVudC5jc3NDbGFzc2VzID0gbWFpbkVsZW1lbnQuY3NzQ2xhc3NlcztcbiAgICAgIGNvbnN0IHBhcmVudCA9IG9yaWdpbmFsRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgdGhpcy5yZW5kZXIuaW5zZXJ0QmVmb3JlKHBhcmVudCwgdGhpcy5pb3NTaGFkb3dSYXBwZXIsIG9yaWdpbmFsRWxlbWVudCk7XG4gICAgICB0aGlzLnJlbmRlci5yZW1vdmVDaGlsZChwYXJlbnQsIG9yaWdpbmFsRWxlbWVudCk7XG4gICAgICB0aGlzLnJlbmRlci5hcHBlbmRDaGlsZCh0aGlzLmlvc1NoYWRvd1JhcHBlciwgb3JpZ2luYWxFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd1bmxvYWRlZCcpXG4gIG9uVW5sb2FkZWQoKSB7XG4gICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcblxuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5fcmVkcmF3TmF0aXZlQmFja2dyb3VuZCA9IHRoaXMub3JpZ2luYWxOU0ZuOyAvLyBhbHdheXMgcmV2ZXJ0IHRvIHRoZSBvcmlnaW5hbCBtZXRob2RcbiAgICB9XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuYWRkSW9zV3JhcHBlcigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIHRoaXMubG9hZGVkICYmXG4gICAgICAhIWNoYW5nZXMgJiZcbiAgICAgIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFkb3cnKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdlbGV2YXRpb24nKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdwcmVzc2VkRWxldmF0aW9uJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhcGUnKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdiZ2NvbG9yJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnY29ybmVyUmFkaXVzJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgncHJlc3NlZFRyYW5zbGF0aW9uWicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2ZvcmNlUHJlc3NBbmltYXRpb24nKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCd0cmFuc2xhdGlvblonKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdtYXNrVG9Cb3VuZHMnKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFkb3dDb2xvcicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYWRvd09mZnNldCcpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYWRvd09wYWNpdHknKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFkb3dSYWRpdXMnKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdyYXN0ZXJpemUnKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCd1c2VTaGFkb3dNYXAnKSlcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93JykgJiZcbiAgICAgICAgIWNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2VsZXZhdGlvbicpICYmXG4gICAgICAgIHR5cGVvZiBjaGFuZ2VzLnNoYWRvdy5jdXJyZW50VmFsdWUgPT09ICdudW1iZXInXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5lbGV2YXRpb24gPSBjaGFuZ2VzLnNoYWRvdy5jdXJyZW50VmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlcy5zaGFkb3cgJiYgY2hhbmdlcy5zaGFkb3cuY3VycmVudFZhbHVlLmVsZXZhdGlvbikge1xuICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgdGhpcy5sb2FkRnJvbUFuZHJvaWREYXRhKHRoaXMuc2hhZG93IGFzIEFuZHJvaWREYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0lPUykge1xuICAgICAgICAgIHRoaXMubG9hZEZyb21JT1NEYXRhKHRoaXMuc2hhZG93IGFzIElPU0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmFwcGx5U2hhZG93KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb25rZXlQYXRjaCA9IHZhbCA9PiB7XG4gICAgdGhpcy5wcmV2aW91c05TRm4uY2FsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHZhbCk7XG4gICAgdGhpcy5hcHBseVNoYWRvdygpO1xuICB9O1xuXG4gIHByaXZhdGUgYXBwbHlTaGFkb3coKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5zaGFkb3cgPT09IG51bGwgfHxcbiAgICAgIHRoaXMuc2hhZG93ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICh0aGlzLnNoYWRvdyA9PT0gJycgJiYgIXRoaXMuZWxldmF0aW9uKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZvciBzaGFkb3dzIHRvIGJlIHNob3duIG9uIEFuZHJvaWQgdGhlIFNESyBoYXMgdG8gYmUgZ3JlYXRlclxuICAgIC8vIG9yIGVxdWFsIHRoYW4gMjEsIGxvd2VyIFNESyBtZWFucyBubyBzZXRFbGV2YXRpb24gbWV0aG9kIGlzIGF2YWlsYWJsZVxuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgIGlmIChhbmRyb2lkLm9zLkJ1aWxkLlZFUlNJT04uU0RLX0lOVCA8IDIxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB2aWV3VG9BcHBseVNoYWRvd1RvID0gaXNJT1NcbiAgICAgID8gdGhpcy5pb3NTaGFkb3dSYXBwZXJcbiAgICAgIDogdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKHZpZXdUb0FwcGx5U2hhZG93VG8pIHtcbiAgICAgIFNoYWRvdy5hcHBseSh2aWV3VG9BcHBseVNoYWRvd1RvLCB7XG4gICAgICAgIGVsZXZhdGlvbjogdGhpcy5lbGV2YXRpb24gYXMgbnVtYmVyLFxuICAgICAgICBwcmVzc2VkRWxldmF0aW9uOiB0aGlzLnByZXNzZWRFbGV2YXRpb24gYXMgbnVtYmVyLFxuICAgICAgICBzaGFwZTogdGhpcy5zaGFwZSxcbiAgICAgICAgYmdjb2xvcjogdGhpcy5iZ2NvbG9yLFxuICAgICAgICBjb3JuZXJSYWRpdXM6IHRoaXMuY29ybmVyUmFkaXVzLFxuICAgICAgICB0cmFuc2xhdGlvblo6IHRoaXMudHJhbnNsYXRpb25aLFxuICAgICAgICBwcmVzc2VkVHJhbnNsYXRpb25aOiB0aGlzLnByZXNzZWRUcmFuc2xhdGlvblosXG4gICAgICAgIGZvcmNlUHJlc3NBbmltYXRpb246IHRoaXMuZm9yY2VQcmVzc0FuaW1hdGlvbixcbiAgICAgICAgbWFza1RvQm91bmRzOiB0aGlzLm1hc2tUb0JvdW5kcyxcbiAgICAgICAgc2hhZG93Q29sb3I6IHRoaXMuc2hhZG93Q29sb3IsXG4gICAgICAgIHNoYWRvd09mZnNldDogdGhpcy5zaGFkb3dPZmZzZXQgYXMgbnVtYmVyLFxuICAgICAgICBzaGFkb3dPcGFjaXR5OiB0aGlzLnNoYWRvd09wYWNpdHkgYXMgbnVtYmVyLFxuICAgICAgICBzaGFkb3dSYWRpdXM6IHRoaXMuc2hhZG93UmFkaXVzIGFzIG51bWJlcixcbiAgICAgICAgcmFzdGVyaXplOiB0aGlzLnJhc3Rlcml6ZSxcbiAgICAgICAgdXNlU2hhZG93UGF0aDogdGhpcy51c2VTaGFkb3dQYXRoXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVDb21tb25EYXRhKCkge1xuICAgIGNvbnN0IHRTaGFkb3cgPSB0eXBlb2YgdGhpcy5zaGFkb3c7XG4gICAgaWYgKCh0U2hhZG93ID09PSAnc3RyaW5nJyB8fCB0U2hhZG93ID09PSAnbnVtYmVyJykgJiYgIXRoaXMuZWxldmF0aW9uKSB7XG4gICAgICB0aGlzLmVsZXZhdGlvbiA9IHRoaXMuc2hhZG93ID8gcGFyc2VJbnQodGhpcy5zaGFkb3cgYXMgc3RyaW5nLCAxMCkgOiAyO1xuICAgIH1cbiAgICBjb25zdCB0RWxldmF0aW9uID0gdHlwZW9mIHRoaXMuZWxldmF0aW9uO1xuICAgIGlmICh0RWxldmF0aW9uID09PSAnc3RyaW5nJyB8fCB0RWxldmF0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5lbGV2YXRpb24gPSB0aGlzLmVsZXZhdGlvblxuICAgICAgICA/IHBhcnNlSW50KHRoaXMuZWxldmF0aW9uIGFzIHN0cmluZywgMTApXG4gICAgICAgIDogMjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVBbmRyb2lkRGF0YSgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuY29ybmVyUmFkaXVzID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5jb3JuZXJSYWRpdXMgPSBwYXJzZUludCh0aGlzLmNvcm5lclJhZGl1cywgMTApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMudHJhbnNsYXRpb25aID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy50cmFuc2xhdGlvblogPSBwYXJzZUludCh0aGlzLnRyYW5zbGF0aW9uWiwgMTApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUlPU0RhdGEoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNoYWRvd09mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuc2hhZG93T2Zmc2V0ID0gcGFyc2VGbG9hdCh0aGlzLnNoYWRvd09mZnNldCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zaGFkb3dPcGFjaXR5ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5zaGFkb3dPcGFjaXR5ID0gcGFyc2VGbG9hdCh0aGlzLnNoYWRvd09wYWNpdHkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc2hhZG93UmFkaXVzID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5zaGFkb3dSYWRpdXMgPSBwYXJzZUZsb2F0KHRoaXMuc2hhZG93UmFkaXVzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWRGcm9tQW5kcm9pZERhdGEoZGF0YTogQW5kcm9pZERhdGEpIHtcbiAgICB0aGlzLmVsZXZhdGlvbiA9IGRhdGEuZWxldmF0aW9uIHx8IHRoaXMuZWxldmF0aW9uO1xuICAgIHRoaXMuc2hhcGUgPSBkYXRhLnNoYXBlIHx8IHRoaXMuc2hhcGU7XG4gICAgdGhpcy5iZ2NvbG9yID0gZGF0YS5iZ2NvbG9yIHx8IHRoaXMuYmdjb2xvcjtcbiAgICB0aGlzLmNvcm5lclJhZGl1cyA9IGRhdGEuY29ybmVyUmFkaXVzIHx8IHRoaXMuY29ybmVyUmFkaXVzO1xuICAgIHRoaXMudHJhbnNsYXRpb25aID0gZGF0YS50cmFuc2xhdGlvblogfHwgdGhpcy50cmFuc2xhdGlvblo7XG4gIH1cblxuICBwcml2YXRlIGxvYWRGcm9tSU9TRGF0YShkYXRhOiBJT1NEYXRhKSB7XG4gICAgdGhpcy5tYXNrVG9Cb3VuZHMgPSBkYXRhLm1hc2tUb0JvdW5kcyB8fCB0aGlzLm1hc2tUb0JvdW5kcztcbiAgICB0aGlzLnNoYWRvd0NvbG9yID0gZGF0YS5zaGFkb3dDb2xvciB8fCB0aGlzLnNoYWRvd0NvbG9yO1xuICAgIHRoaXMuc2hhZG93T2Zmc2V0ID0gZGF0YS5zaGFkb3dPZmZzZXQgfHwgdGhpcy5zaGFkb3dPZmZzZXQ7XG4gICAgdGhpcy5zaGFkb3dPcGFjaXR5ID0gZGF0YS5zaGFkb3dPcGFjaXR5IHx8IHRoaXMuc2hhZG93T3BhY2l0eTtcbiAgICB0aGlzLnNoYWRvd1JhZGl1cyA9IGRhdGEuc2hhZG93UmFkaXVzIHx8IHRoaXMuc2hhZG93UmFkaXVzO1xuICAgIHRoaXMucmFzdGVyaXplID0gZGF0YS5yYXN0ZXJpemUgfHwgdGhpcy5yYXN0ZXJpemU7XG4gICAgdGhpcy51c2VTaGFkb3dQYXRoID0gZGF0YS51c2VTaGFkb3dQYXRoIHx8IHRoaXMudXNlU2hhZG93UGF0aDtcbiAgfVxufVxuIl19