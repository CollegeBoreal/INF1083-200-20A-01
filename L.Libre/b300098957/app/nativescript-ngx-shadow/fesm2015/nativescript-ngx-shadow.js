import { Color } from 'tns-core-modules/color';
import { Length } from 'tns-core-modules/ui/page/page';
import { isAndroid, screen, isIOS } from 'tns-core-modules/platform';
import { Directive, ElementRef, HostListener, Input, Renderer2, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const ShapeEnum = {
    RECTANGLE: 'RECTANGLE',
    OVAL: 'OVAL',
    RING: 'RING',
    LINE: 'LINE',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ LayeredShadow;
let /** @type {?} */ PlainShadow;
if (isAndroid) {
    LayeredShadow = android.graphics.drawable.LayerDrawable.extend({});
    PlainShadow = android.graphics.drawable.GradientDrawable.extend({});
}
class Shadow {
    /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    static apply(tnsView, data) {
        const /** @type {?} */ LOLLIPOP = 21;
        if (tnsView.android &&
            android.os.Build.VERSION.SDK_INT >= LOLLIPOP) {
            Shadow.applyOnAndroid(tnsView, Shadow.getDefaults(data));
        }
        else if (tnsView.ios) {
            Shadow.applyOnIOS(tnsView, Shadow.getDefaults(data));
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static getDefaults(data) {
        return Object.assign({}, data, {
            shape: (/** @type {?} */ (data)).shape || Shadow.DEFAULT_SHAPE,
            pressedElevation: (/** @type {?} */ (data)).pressedElevation || Shadow.DEFAULT_PRESSED_ELEVATION,
            pressedTranslationZ: (/** @type {?} */ (data)).pressedTranslationZ || Shadow.DEFAULT_PRESSED_ELEVATION,
            shadowColor: (/** @type {?} */ (data)).shadowColor ||
                Shadow.DEFAULT_SHADOW_COLOR,
            useShadowPath: ((/** @type {?} */ (data)).useShadowPath !== undefined ? (/** @type {?} */ (data)).useShadowPath : true),
            rasterize: ((/** @type {?} */ (data)).rasterize !== undefined ? (/** @type {?} */ (data)).rasterize : false)
        });
    }
    /**
     * @param {?} drawable
     * @return {?}
     */
    static isShadow(drawable) {
        return (drawable instanceof LayeredShadow || drawable instanceof PlainShadow);
    }
    /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    static applyOnAndroid(tnsView, data) {
        const /** @type {?} */ nativeView = tnsView.android;
        let /** @type {?} */ shape;
        let /** @type {?} */ overrideBackground = true;
        let /** @type {?} */ currentBg = nativeView.getBackground();
        if (currentBg instanceof android.graphics.drawable.RippleDrawable) {
            // play nice if a ripple is wrapping a shadow
            let /** @type {?} */ rippleBg = currentBg.getDrawable(0);
            if (rippleBg instanceof android.graphics.drawable.InsetDrawable) {
                overrideBackground = false; // this is a button with it's own shadow
            }
            else if (Shadow.isShadow(rippleBg)) {
                // if the ripple is wrapping a shadow, strip it
                currentBg = rippleBg;
            }
        }
        if (overrideBackground) {
            if (Shadow.isShadow(currentBg)) {
                // make sure to have the right background
                currentBg = currentBg instanceof LayeredShadow ? // if layered, get the original background
                    currentBg.getDrawable(1) : null;
            }
            const /** @type {?} */ outerRadii = Array.create("float", 8);
            if (data.cornerRadius === undefined) {
                outerRadii[0] = outerRadii[1] = Length.toDevicePixels(tnsView.borderTopLeftRadius, 0);
                outerRadii[2] = outerRadii[3] = Length.toDevicePixels(tnsView.borderTopRightRadius, 0);
                outerRadii[4] = outerRadii[5] = Length.toDevicePixels(tnsView.borderBottomRightRadius, 0);
                outerRadii[6] = outerRadii[7] = Length.toDevicePixels(tnsView.borderBottomLeftRadius, 0);
            }
            else {
                java.util.Arrays.fill(outerRadii, Shadow.androidDipToPx(nativeView, /** @type {?} */ (data.cornerRadius)));
            }
            // use the user defined color or the default in case the color is TRANSPARENT
            const /** @type {?} */ bgColor = currentBg ?
                (currentBg instanceof android.graphics.drawable.ColorDrawable && currentBg.getColor() ?
                    currentBg.getColor() : android.graphics.Color.parseColor(data.bgcolor || Shadow.DEFAULT_BGCOLOR)) :
                android.graphics.Color.parseColor(data.bgcolor || Shadow.DEFAULT_BGCOLOR);
            let /** @type {?} */ newBg;
            if (data.shape !== ShapeEnum.RECTANGLE || data.bgcolor || !currentBg) {
                // replace background
                shape = new PlainShadow();
                shape.setShape(android.graphics.drawable.GradientDrawable[data.shape]);
                shape.setCornerRadii(outerRadii);
                shape.setColor(bgColor);
                newBg = shape;
            }
            else {
                // add a layer
                const /** @type {?} */ r = new android.graphics.drawable.shapes.RoundRectShape(outerRadii, null, null);
                shape = new android.graphics.drawable.ShapeDrawable(r);
                shape.getPaint().setColor(bgColor);
                var /** @type {?} */ arr = Array.create(android.graphics.drawable.Drawable, 2);
                arr[0] = shape;
                arr[1] = currentBg;
                const /** @type {?} */ drawable = new LayeredShadow(arr);
                newBg = drawable;
            }
            nativeView.setBackgroundDrawable(newBg);
        }
        nativeView.setElevation(Shadow.androidDipToPx(nativeView, /** @type {?} */ (data.elevation)));
        nativeView.setTranslationZ(Shadow.androidDipToPx(nativeView, /** @type {?} */ (data.translationZ)));
        if (nativeView.getStateListAnimator() || data.forcePressAnimation) {
            this.overrideDefaultAnimator(nativeView, data);
        }
    }
    /**
     * @param {?} nativeView
     * @param {?} data
     * @return {?}
     */
    static overrideDefaultAnimator(nativeView, data) {
        const /** @type {?} */ sla = new android.animation.StateListAnimator();
        const /** @type {?} */ ObjectAnimator = android.animation.ObjectAnimator;
        const /** @type {?} */ AnimatorSet = android.animation.AnimatorSet;
        const /** @type {?} */ shortAnimTime = android.R.integer.config_shortAnimTime;
        const /** @type {?} */ buttonDuration = nativeView.getContext().getResources().getInteger(shortAnimTime) / 2;
        const /** @type {?} */ pressedElevation = this.androidDipToPx(nativeView, data.pressedElevation);
        const /** @type {?} */ pressedZ = this.androidDipToPx(nativeView, data.pressedTranslationZ);
        const /** @type {?} */ elevation = this.androidDipToPx(nativeView, data.elevation);
        const /** @type {?} */ z = this.androidDipToPx(nativeView, data.translationZ || 0);
        const /** @type {?} */ pressedSet = new AnimatorSet();
        const /** @type {?} */ notPressedSet = new AnimatorSet();
        const /** @type {?} */ defaultSet = new AnimatorSet();
        pressedSet.playTogether(java.util.Arrays.asList([
            ObjectAnimator.ofFloat(nativeView, "translationZ", [pressedZ])
                .setDuration(buttonDuration),
            ObjectAnimator.ofFloat(nativeView, "elevation", [pressedElevation])
                .setDuration(0),
        ]));
        notPressedSet.playTogether(java.util.Arrays.asList([
            ObjectAnimator.ofFloat(nativeView, "translationZ", [z])
                .setDuration(buttonDuration),
            ObjectAnimator.ofFloat(nativeView, "elevation", [elevation])
                .setDuration(0),
        ]));
        defaultSet.playTogether(java.util.Arrays.asList([
            ObjectAnimator.ofFloat(nativeView, "translationZ", [0]).setDuration(0),
            ObjectAnimator.ofFloat(nativeView, "elevation", [0]).setDuration(0),
        ]));
        sla.addState([android.R.attr.state_pressed, android.R.attr.state_enabled], pressedSet);
        sla.addState([android.R.attr.state_enabled], notPressedSet);
        sla.addState([], defaultSet);
        nativeView.setStateListAnimator(sla);
    }
    /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    static applyOnIOS(tnsView, data) {
        const /** @type {?} */ nativeView = tnsView.ios;
        const /** @type {?} */ elevation = parseFloat(((/** @type {?} */ (data.elevation)) - 0).toFixed(2));
        nativeView.layer.maskToBounds = false;
        nativeView.layer.shadowColor = new Color(data.shadowColor).ios.CGColor;
        nativeView.layer.shadowOffset =
            data.shadowOffset ?
                CGSizeMake(0, parseFloat(String(data.shadowOffset))) :
                CGSizeMake(0, 0.54 * elevation - 0.14);
        nativeView.layer.shadowOpacity =
            data.shadowOpacity ?
                parseFloat(String(data.shadowOpacity)) :
                0.006 * elevation + 0.25;
        nativeView.layer.shadowRadius =
            data.shadowRadius ?
                parseFloat(String(data.shadowRadius)) :
                0.66 * elevation - 0.5;
        nativeView.layer.shouldRasterize = data.rasterize;
        nativeView.layer.rasterizationScale = screen.mainScreen.scale;
        let /** @type {?} */ shadowPath = null;
        if (data.useShadowPath) {
            shadowPath = UIBezierPath.bezierPathWithRoundedRectCornerRadius(nativeView.bounds, nativeView.layer.shadowRadius).cgPath;
        }
        nativeView.layer.shadowPath = shadowPath;
    }
    /**
     * @param {?} nativeView
     * @param {?} dip
     * @return {?}
     */
    static androidDipToPx(nativeView, dip) {
        const /** @type {?} */ metrics = nativeView.getContext().getResources().getDisplayMetrics();
        return android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, dip, metrics);
    }
}
Shadow.DEFAULT_SHAPE = ShapeEnum.RECTANGLE;
Shadow.DEFAULT_BGCOLOR = '#FFFFFF';
Shadow.DEFAULT_SHADOW_COLOR = '#000000';
Shadow.DEFAULT_PRESSED_ELEVATION = 2;
Shadow.DEFAULT_PRESSED_Z = 4;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NativeShadowDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgShadowModule {
}
NgShadowModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    NativeShadowDirective,
                ],
                exports: [
                    NativeShadowDirective,
                ],
                providers: [],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AndroidData {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const Elevation = {
    SWITCH: 1,
    CARD_RESTING: 2,
    RAISED_BUTTON_RESTING: 2,
    SEARCH_BAR_RESTING: 2,
    REFRESH_INDICADOR: 3,
    SEARCH_BAR_SCROLLED: 3,
    APPBAR: 4,
    FAB_RESTING: 6,
    SNACKBAR: 6,
    BOTTOM_NAVIGATION_BAR: 8,
    MENU: 8,
    CARD_PICKED_UP: 8,
    RAISED_BUTTON_PRESSED: 8,
    SUBMENU_LEVEL1: 9,
    SUBMENU_LEVEL2: 10,
    SUBMENU_LEVEL3: 11,
    SUBMENU_LEVEL4: 12,
    SUBMENU_LEVEL5: 13,
    FAB_PRESSED: 12,
    NAV_DRAWER: 16,
    RIGHT_DRAWER: 16,
    MODAL_BOTTOM_SHEET: 16,
    DIALOG: 24,
    PICKER: 24,
};
Elevation[Elevation.SWITCH] = "SWITCH";
Elevation[Elevation.CARD_RESTING] = "CARD_RESTING";
Elevation[Elevation.RAISED_BUTTON_RESTING] = "RAISED_BUTTON_RESTING";
Elevation[Elevation.SEARCH_BAR_RESTING] = "SEARCH_BAR_RESTING";
Elevation[Elevation.REFRESH_INDICADOR] = "REFRESH_INDICADOR";
Elevation[Elevation.SEARCH_BAR_SCROLLED] = "SEARCH_BAR_SCROLLED";
Elevation[Elevation.APPBAR] = "APPBAR";
Elevation[Elevation.FAB_RESTING] = "FAB_RESTING";
Elevation[Elevation.SNACKBAR] = "SNACKBAR";
Elevation[Elevation.BOTTOM_NAVIGATION_BAR] = "BOTTOM_NAVIGATION_BAR";
Elevation[Elevation.MENU] = "MENU";
Elevation[Elevation.CARD_PICKED_UP] = "CARD_PICKED_UP";
Elevation[Elevation.RAISED_BUTTON_PRESSED] = "RAISED_BUTTON_PRESSED";
Elevation[Elevation.SUBMENU_LEVEL1] = "SUBMENU_LEVEL1";
Elevation[Elevation.SUBMENU_LEVEL2] = "SUBMENU_LEVEL2";
Elevation[Elevation.SUBMENU_LEVEL3] = "SUBMENU_LEVEL3";
Elevation[Elevation.SUBMENU_LEVEL4] = "SUBMENU_LEVEL4";
Elevation[Elevation.SUBMENU_LEVEL5] = "SUBMENU_LEVEL5";
Elevation[Elevation.FAB_PRESSED] = "FAB_PRESSED";
Elevation[Elevation.NAV_DRAWER] = "NAV_DRAWER";
Elevation[Elevation.RIGHT_DRAWER] = "RIGHT_DRAWER";
Elevation[Elevation.MODAL_BOTTOM_SHEET] = "MODAL_BOTTOM_SHEET";
Elevation[Elevation.DIALOG] = "DIALOG";
Elevation[Elevation.PICKER] = "PICKER";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IOSData {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgShadowModule, AndroidData, Elevation, IOSData, Shadow, ShapeEnum, NativeShadowDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LW5neC1zaGFkb3cuanMubWFwIiwic291cmNlcyI6WyJuZzovL25hdGl2ZXNjcmlwdC1uZ3gtc2hhZG93L25hdGl2ZXNjcmlwdC1uZ3gtc2hhZG93L2NvbW1vbi9zaGFwZS5lbnVtLnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9jb21tb24vc2hhZG93LnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uZy1zaGFkb3cuZGlyZWN0aXZlLnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9saWIubW9kdWxlLnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9jb21tb24vYW5kcm9pZC1kYXRhLm1vZGVsLnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9jb21tb24vaW9zLWRhdGEubW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZW51bSBTaGFwZUVudW0ge1xuICBSRUNUQU5HTEUgPSAnUkVDVEFOR0xFJyxcbiAgT1ZBTCA9ICdPVkFMJyxcbiAgUklORyA9ICdSSU5HJyxcbiAgTElORSA9ICdMSU5FJyxcbn1cblxuZXhwb3J0IHR5cGUgU2hhcGUgPSAnUkVDVEFOR0xFJyB8ICdPVkFMJyB8ICdSSU5HJyB8ICdMSU5FJztcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvcic7XG5cbmltcG9ydCB7IEFuZHJvaWREYXRhIH0gZnJvbSBcIi4vYW5kcm9pZC1kYXRhLm1vZGVsXCI7XG5pbXBvcnQgeyBJT1NEYXRhIH0gZnJvbSBcIi4vaW9zLWRhdGEubW9kZWxcIjtcbmltcG9ydCB7IFNoYXBlRW51bSB9IGZyb20gJy4vc2hhcGUuZW51bSc7XG5pbXBvcnQgeyBMZW5ndGggfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5cbmRlY2xhcmUgY29uc3QgYW5kcm9pZDogYW55O1xuZGVjbGFyZSBjb25zdCBqYXZhOiBhbnk7XG5kZWNsYXJlIGNvbnN0IENHU2l6ZU1ha2U6IGFueTtcbmRlY2xhcmUgY29uc3QgVUlTY3JlZW46IGFueTtcbmRlY2xhcmUgY29uc3QgQXJyYXk6IGFueTtcbmRlY2xhcmUgY29uc3QgVUlCZXppZXJQYXRoOiBhbnk7XG5cbmxldCBMYXllcmVkU2hhZG93O1xubGV0IFBsYWluU2hhZG93O1xuXG5pZiAoaXNBbmRyb2lkKSB7XG4gIExheWVyZWRTaGFkb3cgPSBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkxheWVyRHJhd2FibGUuZXh0ZW5kKHt9KTtcbiAgUGxhaW5TaGFkb3cgPSBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkdyYWRpZW50RHJhd2FibGUuZXh0ZW5kKHt9KTtcbn1cblxuZXhwb3J0IGNsYXNzIFNoYWRvdyB7XG4gIHN0YXRpYyBERUZBVUxUX1NIQVBFID0gU2hhcGVFbnVtLlJFQ1RBTkdMRTtcbiAgc3RhdGljIERFRkFVTFRfQkdDT0xPUiA9ICcjRkZGRkZGJztcbiAgc3RhdGljIERFRkFVTFRfU0hBRE9XX0NPTE9SID0gJyMwMDAwMDAnO1xuICBzdGF0aWMgREVGQVVMVF9QUkVTU0VEX0VMRVZBVElPTiA9IDI7XG4gIHN0YXRpYyBERUZBVUxUX1BSRVNTRURfWiA9IDQ7XG5cbiAgc3RhdGljIGFwcGx5KHRuc1ZpZXc6IGFueSwgZGF0YTogSU9TRGF0YSB8IEFuZHJvaWREYXRhKSB7XG4gICAgY29uc3QgTE9MTElQT1AgPSAyMTtcbiAgICBpZiAoXG4gICAgICB0bnNWaWV3LmFuZHJvaWQgJiZcbiAgICAgIGFuZHJvaWQub3MuQnVpbGQuVkVSU0lPTi5TREtfSU5UID49IExPTExJUE9QXG4gICAgKSB7XG4gICAgICBTaGFkb3cuYXBwbHlPbkFuZHJvaWQodG5zVmlldywgU2hhZG93LmdldERlZmF1bHRzKGRhdGEpKTtcbiAgICB9IGVsc2UgaWYgKHRuc1ZpZXcuaW9zKSB7XG4gICAgICBTaGFkb3cuYXBwbHlPbklPUyh0bnNWaWV3LCBTaGFkb3cuZ2V0RGVmYXVsdHMoZGF0YSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldERlZmF1bHRzKGRhdGE6IElPU0RhdGEgfCBBbmRyb2lkRGF0YSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICBkYXRhLFxuICAgICAge1xuICAgICAgICBzaGFwZTogKGRhdGEgYXMgQW5kcm9pZERhdGEpLnNoYXBlIHx8IFNoYWRvdy5ERUZBVUxUX1NIQVBFLFxuICAgICAgICBwcmVzc2VkRWxldmF0aW9uOiAoZGF0YSBhcyBBbmRyb2lkRGF0YSkucHJlc3NlZEVsZXZhdGlvbiB8fCBTaGFkb3cuREVGQVVMVF9QUkVTU0VEX0VMRVZBVElPTixcbiAgICAgICAgcHJlc3NlZFRyYW5zbGF0aW9uWjogKGRhdGEgYXMgQW5kcm9pZERhdGEpLnByZXNzZWRUcmFuc2xhdGlvblogfHwgU2hhZG93LkRFRkFVTFRfUFJFU1NFRF9FTEVWQVRJT04sXG4gICAgICAgIHNoYWRvd0NvbG9yOiAoZGF0YSBhcyBJT1NEYXRhKS5zaGFkb3dDb2xvciB8fFxuICAgICAgICAgIFNoYWRvdy5ERUZBVUxUX1NIQURPV19DT0xPUixcbiAgICAgICAgdXNlU2hhZG93UGF0aDogKChkYXRhIGFzIElPU0RhdGEpLnVzZVNoYWRvd1BhdGggIT09IHVuZGVmaW5lZCA/IChkYXRhIGFzIElPU0RhdGEpLnVzZVNoYWRvd1BhdGggOiB0cnVlKSxcbiAgICAgICAgcmFzdGVyaXplOiAoKGRhdGEgYXMgSU9TRGF0YSkucmFzdGVyaXplICE9PSB1bmRlZmluZWQgPyAoZGF0YSBhcyBJT1NEYXRhKS5yYXN0ZXJpemUgOiBmYWxzZSlcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzU2hhZG93KGRyYXdhYmxlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKGRyYXdhYmxlIGluc3RhbmNlb2YgTGF5ZXJlZFNoYWRvdyB8fCBkcmF3YWJsZSBpbnN0YW5jZW9mIFBsYWluU2hhZG93KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGFwcGx5T25BbmRyb2lkKHRuc1ZpZXc6IGFueSwgZGF0YTogQW5kcm9pZERhdGEpIHtcbiAgICBjb25zdCBuYXRpdmVWaWV3ID0gdG5zVmlldy5hbmRyb2lkO1xuICAgIGxldCBzaGFwZTtcbiAgICBsZXQgb3ZlcnJpZGVCYWNrZ3JvdW5kID0gdHJ1ZTtcblxuXG4gICAgbGV0IGN1cnJlbnRCZyA9IG5hdGl2ZVZpZXcuZ2V0QmFja2dyb3VuZCgpO1xuXG4gICAgaWYgKGN1cnJlbnRCZyBpbnN0YW5jZW9mIGFuZHJvaWQuZ3JhcGhpY3MuZHJhd2FibGUuUmlwcGxlRHJhd2FibGUpIHsgLy8gcGxheSBuaWNlIGlmIGEgcmlwcGxlIGlzIHdyYXBwaW5nIGEgc2hhZG93XG4gICAgICBsZXQgcmlwcGxlQmcgPSBjdXJyZW50QmcuZ2V0RHJhd2FibGUoMCk7XG4gICAgICBpZiAocmlwcGxlQmcgaW5zdGFuY2VvZiBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkluc2V0RHJhd2FibGUpIHtcbiAgICAgICAgb3ZlcnJpZGVCYWNrZ3JvdW5kID0gZmFsc2U7IC8vIHRoaXMgaXMgYSBidXR0b24gd2l0aCBpdCdzIG93biBzaGFkb3dcbiAgICAgIH0gZWxzZSBpZiAoU2hhZG93LmlzU2hhZG93KHJpcHBsZUJnKSkgeyAvLyBpZiB0aGUgcmlwcGxlIGlzIHdyYXBwaW5nIGEgc2hhZG93LCBzdHJpcCBpdFxuICAgICAgICBjdXJyZW50QmcgPSByaXBwbGVCZztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG92ZXJyaWRlQmFja2dyb3VuZCkge1xuICAgICAgaWYgKFNoYWRvdy5pc1NoYWRvdyhjdXJyZW50QmcpKSB7IC8vIG1ha2Ugc3VyZSB0byBoYXZlIHRoZSByaWdodCBiYWNrZ3JvdW5kXG4gICAgICAgIGN1cnJlbnRCZyA9IGN1cnJlbnRCZyBpbnN0YW5jZW9mIExheWVyZWRTaGFkb3cgPyAvLyBpZiBsYXllcmVkLCBnZXQgdGhlIG9yaWdpbmFsIGJhY2tncm91bmRcbiAgICAgICAgICBjdXJyZW50QmcuZ2V0RHJhd2FibGUoMSkgOiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvdXRlclJhZGlpID0gQXJyYXkuY3JlYXRlKFwiZmxvYXRcIiwgOCk7XG4gICAgICBpZiAoZGF0YS5jb3JuZXJSYWRpdXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXRlclJhZGlpWzBdID0gb3V0ZXJSYWRpaVsxXSA9IExlbmd0aC50b0RldmljZVBpeGVscyh0bnNWaWV3LmJvcmRlclRvcExlZnRSYWRpdXMsIDApO1xuICAgICAgICBvdXRlclJhZGlpWzJdID0gb3V0ZXJSYWRpaVszXSA9IExlbmd0aC50b0RldmljZVBpeGVscyh0bnNWaWV3LmJvcmRlclRvcFJpZ2h0UmFkaXVzLCAwKTtcbiAgICAgICAgb3V0ZXJSYWRpaVs0XSA9IG91dGVyUmFkaWlbNV0gPSBMZW5ndGgudG9EZXZpY2VQaXhlbHModG5zVmlldy5ib3JkZXJCb3R0b21SaWdodFJhZGl1cywgMCk7XG4gICAgICAgIG91dGVyUmFkaWlbNl0gPSBvdXRlclJhZGlpWzddID0gTGVuZ3RoLnRvRGV2aWNlUGl4ZWxzKHRuc1ZpZXcuYm9yZGVyQm90dG9tTGVmdFJhZGl1cywgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqYXZhLnV0aWwuQXJyYXlzLmZpbGwob3V0ZXJSYWRpaSwgU2hhZG93LmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEuY29ybmVyUmFkaXVzIGFzIG51bWJlcikpO1xuICAgICAgfVxuXG4gICAgICAvLyB1c2UgdGhlIHVzZXIgZGVmaW5lZCBjb2xvciBvciB0aGUgZGVmYXVsdCBpbiBjYXNlIHRoZSBjb2xvciBpcyBUUkFOU1BBUkVOVFxuICAgICAgY29uc3QgYmdDb2xvciA9IGN1cnJlbnRCZyA/XG4gICAgICAgIChjdXJyZW50QmcgaW5zdGFuY2VvZiBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkNvbG9yRHJhd2FibGUgJiYgY3VycmVudEJnLmdldENvbG9yKCkgP1xuICAgICAgICAgIGN1cnJlbnRCZy5nZXRDb2xvcigpIDogYW5kcm9pZC5ncmFwaGljcy5Db2xvci5wYXJzZUNvbG9yKGRhdGEuYmdjb2xvciB8fCBTaGFkb3cuREVGQVVMVF9CR0NPTE9SKSkgOlxuICAgICAgICBhbmRyb2lkLmdyYXBoaWNzLkNvbG9yLnBhcnNlQ29sb3IoZGF0YS5iZ2NvbG9yIHx8IFNoYWRvdy5ERUZBVUxUX0JHQ09MT1IpO1xuXG4gICAgICBsZXQgbmV3Qmc7XG5cbiAgICAgIGlmIChkYXRhLnNoYXBlICE9PSBTaGFwZUVudW0uUkVDVEFOR0xFIHx8IGRhdGEuYmdjb2xvciB8fCAhY3VycmVudEJnKSB7IC8vIHJlcGxhY2UgYmFja2dyb3VuZFxuICAgICAgICBzaGFwZSA9IG5ldyBQbGFpblNoYWRvdygpO1xuICAgICAgICBzaGFwZS5zZXRTaGFwZShcbiAgICAgICAgICBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkdyYWRpZW50RHJhd2FibGVbZGF0YS5zaGFwZV0sXG4gICAgICAgICk7XG4gICAgICAgIHNoYXBlLnNldENvcm5lclJhZGlpKG91dGVyUmFkaWkpO1xuICAgICAgICBzaGFwZS5zZXRDb2xvcihiZ0NvbG9yKTtcbiAgICAgICAgbmV3QmcgPSBzaGFwZTtcbiAgICAgIH0gZWxzZSB7IC8vIGFkZCBhIGxheWVyXG4gICAgICAgIGNvbnN0IHIgPSBuZXcgYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5zaGFwZXMuUm91bmRSZWN0U2hhcGUob3V0ZXJSYWRpaSwgbnVsbCwgbnVsbCk7XG4gICAgICAgIHNoYXBlID0gbmV3IGFuZHJvaWQuZ3JhcGhpY3MuZHJhd2FibGUuU2hhcGVEcmF3YWJsZShyKTtcbiAgICAgICAgc2hhcGUuZ2V0UGFpbnQoKS5zZXRDb2xvcihiZ0NvbG9yKTtcbiAgICAgICAgdmFyIGFyciA9IEFycmF5LmNyZWF0ZShhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkRyYXdhYmxlLCAyKTtcbiAgICAgICAgYXJyWzBdID0gc2hhcGU7XG4gICAgICAgIGFyclsxXSA9IGN1cnJlbnRCZztcbiAgICAgICAgY29uc3QgZHJhd2FibGUgPSBuZXcgTGF5ZXJlZFNoYWRvdyhhcnIpO1xuICAgICAgICBuZXdCZyA9IGRyYXdhYmxlO1xuICAgICAgfVxuXG4gICAgICBuYXRpdmVWaWV3LnNldEJhY2tncm91bmREcmF3YWJsZShuZXdCZyk7XG4gICAgfVxuXG4gICAgbmF0aXZlVmlldy5zZXRFbGV2YXRpb24oXG4gICAgICBTaGFkb3cuYW5kcm9pZERpcFRvUHgobmF0aXZlVmlldywgZGF0YS5lbGV2YXRpb24gYXMgbnVtYmVyKSxcbiAgICApO1xuICAgIG5hdGl2ZVZpZXcuc2V0VHJhbnNsYXRpb25aKFxuICAgICAgU2hhZG93LmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEudHJhbnNsYXRpb25aIGFzIG51bWJlciksXG4gICAgKTtcbiAgICBpZiAobmF0aXZlVmlldy5nZXRTdGF0ZUxpc3RBbmltYXRvcigpIHx8IGRhdGEuZm9yY2VQcmVzc0FuaW1hdGlvbikge1xuICAgICAgdGhpcy5vdmVycmlkZURlZmF1bHRBbmltYXRvcihuYXRpdmVWaWV3LCBkYXRhKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBvdmVycmlkZURlZmF1bHRBbmltYXRvcihuYXRpdmVWaWV3OiBhbnksIGRhdGE6IEFuZHJvaWREYXRhKSB7XG4gICAgY29uc3Qgc2xhID0gbmV3IGFuZHJvaWQuYW5pbWF0aW9uLlN0YXRlTGlzdEFuaW1hdG9yKCk7XG5cbiAgICBjb25zdCBPYmplY3RBbmltYXRvciA9IGFuZHJvaWQuYW5pbWF0aW9uLk9iamVjdEFuaW1hdG9yO1xuICAgIGNvbnN0IEFuaW1hdG9yU2V0ID0gYW5kcm9pZC5hbmltYXRpb24uQW5pbWF0b3JTZXQ7XG4gICAgY29uc3Qgc2hvcnRBbmltVGltZSA9IGFuZHJvaWQuUi5pbnRlZ2VyLmNvbmZpZ19zaG9ydEFuaW1UaW1lO1xuXG4gICAgY29uc3QgYnV0dG9uRHVyYXRpb24gPVxuICAgICAgbmF0aXZlVmlldy5nZXRDb250ZXh0KCkuZ2V0UmVzb3VyY2VzKCkuZ2V0SW50ZWdlcihzaG9ydEFuaW1UaW1lKSAvIDI7XG4gICAgY29uc3QgcHJlc3NlZEVsZXZhdGlvbiA9IHRoaXMuYW5kcm9pZERpcFRvUHgobmF0aXZlVmlldywgZGF0YS5wcmVzc2VkRWxldmF0aW9uKTtcbiAgICBjb25zdCBwcmVzc2VkWiA9IHRoaXMuYW5kcm9pZERpcFRvUHgobmF0aXZlVmlldywgZGF0YS5wcmVzc2VkVHJhbnNsYXRpb25aKTtcbiAgICBjb25zdCBlbGV2YXRpb24gPSB0aGlzLmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEuZWxldmF0aW9uKTtcbiAgICBjb25zdCB6ID0gdGhpcy5hbmRyb2lkRGlwVG9QeChuYXRpdmVWaWV3LCBkYXRhLnRyYW5zbGF0aW9uWiB8fCAwKTtcblxuICAgIGNvbnN0IHByZXNzZWRTZXQgPSBuZXcgQW5pbWF0b3JTZXQoKTtcbiAgICBjb25zdCBub3RQcmVzc2VkU2V0ID0gbmV3IEFuaW1hdG9yU2V0KCk7XG4gICAgY29uc3QgZGVmYXVsdFNldCA9IG5ldyBBbmltYXRvclNldCgpO1xuXG4gICAgcHJlc3NlZFNldC5wbGF5VG9nZXRoZXIoamF2YS51dGlsLkFycmF5cy5hc0xpc3QoW1xuICAgICAgT2JqZWN0QW5pbWF0b3Iub2ZGbG9hdChuYXRpdmVWaWV3LCBcInRyYW5zbGF0aW9uWlwiLCBbcHJlc3NlZFpdKVxuICAgICAgICAuc2V0RHVyYXRpb24oYnV0dG9uRHVyYXRpb24pLFxuICAgICAgT2JqZWN0QW5pbWF0b3Iub2ZGbG9hdChuYXRpdmVWaWV3LCBcImVsZXZhdGlvblwiLCBbcHJlc3NlZEVsZXZhdGlvbl0pXG4gICAgICAgIC5zZXREdXJhdGlvbigwKSxcbiAgICBdKSk7XG4gICAgbm90UHJlc3NlZFNldC5wbGF5VG9nZXRoZXIoamF2YS51dGlsLkFycmF5cy5hc0xpc3QoW1xuICAgICAgT2JqZWN0QW5pbWF0b3Iub2ZGbG9hdChuYXRpdmVWaWV3LCBcInRyYW5zbGF0aW9uWlwiLCBbel0pXG4gICAgICAgIC5zZXREdXJhdGlvbihidXR0b25EdXJhdGlvbiksXG4gICAgICBPYmplY3RBbmltYXRvci5vZkZsb2F0KG5hdGl2ZVZpZXcsIFwiZWxldmF0aW9uXCIsIFtlbGV2YXRpb25dKVxuICAgICAgICAuc2V0RHVyYXRpb24oMCksXG4gICAgXSkpO1xuICAgIGRlZmF1bHRTZXQucGxheVRvZ2V0aGVyKGphdmEudXRpbC5BcnJheXMuYXNMaXN0KFtcbiAgICAgIE9iamVjdEFuaW1hdG9yLm9mRmxvYXQobmF0aXZlVmlldywgXCJ0cmFuc2xhdGlvblpcIiwgWzBdKS5zZXREdXJhdGlvbigwKSxcbiAgICAgIE9iamVjdEFuaW1hdG9yLm9mRmxvYXQobmF0aXZlVmlldywgXCJlbGV2YXRpb25cIiwgWzBdKS5zZXREdXJhdGlvbigwKSxcbiAgICBdKSk7XG5cbiAgICBzbGEuYWRkU3RhdGUoXG4gICAgICBbYW5kcm9pZC5SLmF0dHIuc3RhdGVfcHJlc3NlZCwgYW5kcm9pZC5SLmF0dHIuc3RhdGVfZW5hYmxlZF0sXG4gICAgICBwcmVzc2VkU2V0LFxuICAgICk7XG4gICAgc2xhLmFkZFN0YXRlKFthbmRyb2lkLlIuYXR0ci5zdGF0ZV9lbmFibGVkXSwgbm90UHJlc3NlZFNldCk7XG4gICAgc2xhLmFkZFN0YXRlKFtdLCBkZWZhdWx0U2V0KTtcbiAgICBuYXRpdmVWaWV3LnNldFN0YXRlTGlzdEFuaW1hdG9yKHNsYSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhcHBseU9uSU9TKHRuc1ZpZXc6IGFueSwgZGF0YTogSU9TRGF0YSkge1xuICAgIGNvbnN0IG5hdGl2ZVZpZXcgPSB0bnNWaWV3LmlvcztcbiAgICBjb25zdCBlbGV2YXRpb24gPSBwYXJzZUZsb2F0KCgoZGF0YS5lbGV2YXRpb24gYXMgbnVtYmVyKSAtIDApLnRvRml4ZWQoMikpO1xuICAgIG5hdGl2ZVZpZXcubGF5ZXIubWFza1RvQm91bmRzID0gZmFsc2U7XG4gICAgbmF0aXZlVmlldy5sYXllci5zaGFkb3dDb2xvciA9IG5ldyBDb2xvcihkYXRhLnNoYWRvd0NvbG9yKS5pb3MuQ0dDb2xvcjtcbiAgICBuYXRpdmVWaWV3LmxheWVyLnNoYWRvd09mZnNldCA9XG4gICAgICBkYXRhLnNoYWRvd09mZnNldCA/XG4gICAgICAgIENHU2l6ZU1ha2UoMCwgcGFyc2VGbG9hdChTdHJpbmcoZGF0YS5zaGFkb3dPZmZzZXQpKSkgOlxuICAgICAgICBDR1NpemVNYWtlKDAsIDAuNTQgKiBlbGV2YXRpb24gLSAwLjE0KTtcbiAgICBuYXRpdmVWaWV3LmxheWVyLnNoYWRvd09wYWNpdHkgPVxuICAgICAgZGF0YS5zaGFkb3dPcGFjaXR5ID9cbiAgICAgICAgcGFyc2VGbG9hdChTdHJpbmcoZGF0YS5zaGFkb3dPcGFjaXR5KSkgOlxuICAgICAgICAwLjAwNiAqIGVsZXZhdGlvbiArIDAuMjU7XG4gICAgbmF0aXZlVmlldy5sYXllci5zaGFkb3dSYWRpdXMgPVxuICAgICAgZGF0YS5zaGFkb3dSYWRpdXMgP1xuICAgICAgICBwYXJzZUZsb2F0KFN0cmluZyhkYXRhLnNoYWRvd1JhZGl1cykpIDpcbiAgICAgICAgMC42NiAqIGVsZXZhdGlvbiAtIDAuNTtcbiAgICBuYXRpdmVWaWV3LmxheWVyLnNob3VsZFJhc3Rlcml6ZSA9IGRhdGEucmFzdGVyaXplO1xuICAgIG5hdGl2ZVZpZXcubGF5ZXIucmFzdGVyaXphdGlvblNjYWxlID0gc2NyZWVuLm1haW5TY3JlZW4uc2NhbGU7XG4gICAgbGV0IHNoYWRvd1BhdGggPSBudWxsO1xuICAgIGlmKGRhdGEudXNlU2hhZG93UGF0aCkge1xuICAgICAgc2hhZG93UGF0aCA9IFVJQmV6aWVyUGF0aC5iZXppZXJQYXRoV2l0aFJvdW5kZWRSZWN0Q29ybmVyUmFkaXVzKG5hdGl2ZVZpZXcuYm91bmRzLCBuYXRpdmVWaWV3LmxheWVyLnNoYWRvd1JhZGl1cykuY2dQYXRoO1xuICAgIH1cbiAgICBuYXRpdmVWaWV3LmxheWVyLnNoYWRvd1BhdGggPSBzaGFkb3dQYXRoO1xuICB9XG5cbiAgc3RhdGljIGFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXc6IGFueSwgZGlwOiBudW1iZXIpIHtcbiAgICBjb25zdCBtZXRyaWNzID0gbmF0aXZlVmlldy5nZXRDb250ZXh0KCkuZ2V0UmVzb3VyY2VzKCkuZ2V0RGlzcGxheU1ldHJpY3MoKTtcbiAgICByZXR1cm4gYW5kcm9pZC51dGlsLlR5cGVkVmFsdWUuYXBwbHlEaW1lbnNpb24oXG4gICAgICBhbmRyb2lkLnV0aWwuVHlwZWRWYWx1ZS5DT01QTEVYX1VOSVRfRElQLFxuICAgICAgZGlwLFxuICAgICAgbWV0cmljcyxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBSZW5kZXJlcjIsXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybSc7XG5cbmltcG9ydCB7IEFuZHJvaWREYXRhIH0gZnJvbSAnLi9jb21tb24vYW5kcm9pZC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IElPU0RhdGEgfSBmcm9tICcuL2NvbW1vbi9pb3MtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBTaGFkb3cgfSBmcm9tICcuL2NvbW1vbi9zaGFkb3cnO1xuaW1wb3J0IHsgU2hhcGUsIFNoYXBlRW51bSB9IGZyb20gJy4vY29tbW9uL3NoYXBlLmVudW0nO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dCc7XG5kZWNsYXJlIGNvbnN0IGFuZHJvaWQ6IGFueTtcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3NoYWRvd10nIH0pXG5leHBvcnQgY2xhc3MgTmF0aXZlU2hhZG93RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBzaGFkb3c6IHN0cmluZyB8IEFuZHJvaWREYXRhIHwgSU9TRGF0YTtcbiAgQElucHV0KCkgZWxldmF0aW9uPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwcmVzc2VkRWxldmF0aW9uPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBzaGFwZT86IFNoYXBlO1xuICBASW5wdXQoKSBiZ2NvbG9yPzogc3RyaW5nO1xuICBASW5wdXQoKSBjb3JuZXJSYWRpdXM/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHRyYW5zbGF0aW9uWj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHJlc3NlZFRyYW5zbGF0aW9uWj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgZm9yY2VQcmVzc0FuaW1hdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1hc2tUb0JvdW5kcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNoYWRvd0NvbG9yPzogc3RyaW5nO1xuICBASW5wdXQoKSBzaGFkb3dPZmZzZXQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHNoYWRvd09wYWNpdHk/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHNoYWRvd1JhZGl1cz86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgdXNlU2hhZG93UGF0aD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJhc3Rlcml6ZT86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBsb2FkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIG9yaWdpbmFsTlNGbjogYW55O1xuICBwcml2YXRlIHByZXZpb3VzTlNGbjogYW55O1xuICBwcml2YXRlIGlvc1NoYWRvd1JhcHBlcjogVmlldztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcjogUmVuZGVyZXIyKSB7XG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdGhpcy5vcmlnaW5hbE5TRm4gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuX3JlZHJhd05hdGl2ZUJhY2tncm91bmQ7IC8vYWx3YXlzIHN0b3JlIHRoZSBvcmlnaW5hbCBtZXRob2RcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVDb21tb25EYXRhKCk7XG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplQW5kcm9pZERhdGEoKTtcbiAgICB9IGVsc2UgaWYgKGlzSU9TKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVJT1NEYXRhKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNoYWRvdyAmJiAodGhpcy5zaGFkb3cgYXMgQW5kcm9pZERhdGEgfCBJT1NEYXRhKS5lbGV2YXRpb24pIHtcbiAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgdGhpcy5sb2FkRnJvbUFuZHJvaWREYXRhKHRoaXMuc2hhZG93IGFzIEFuZHJvaWREYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcbiAgICAgICAgdGhpcy5sb2FkRnJvbUlPU0RhdGEodGhpcy5zaGFkb3cgYXMgSU9TRGF0YSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYXBwbHlTaGFkb3coKTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2xvYWRlZCcpXG4gIG9uTG9hZGVkKCkge1xuICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAvLyBXZWlyZGx5IG5nT25Jbml0IGlzbid0IGNhbGxlZCBvbiBpT1Mgb24gZGVtbyBhcHBcbiAgICAvLyBNYW5hZ2VkIHRvIGdldCBpdCB3b3JraW5nIG9uIGlPUyB3aGVuIGFwcGx5aW5nIHRvXG4gICAgLy8gRmxleGJveExheW91dCwgYnV0IG9uIHRoZSBkZW1vIGFwcCwgd2UgYXBwbHkgdG8gYVxuICAgIC8vIExhYmVsLCBhbmQsIGZvciB0aGF0IGNhc2UsIG5nT25Jbml0IGlzbid0IGNhbGxlZFxuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGVuZm9yY2luZyB0aGUgRGlyZWN0aXZlIGlzIGluaXRpYWxpemVkXG4gICAgLy8gYmVmb3JlIGNhbGxpbmcgdGhpcy5hcHBseVNoYWRvdygpXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlTaGFkb3coKTtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLnByZXZpb3VzTlNGbiA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5fcmVkcmF3TmF0aXZlQmFja2dyb3VuZDsgLy8ganVzdCB0byBtYWludGFpbiBjb21wYXRpYmlsaXR5IHdpdGggb3RoZXIgcGF0Y2hlc1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50Ll9yZWRyYXdOYXRpdmVCYWNrZ3JvdW5kID0gdGhpcy5tb25rZXlQYXRjaDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZElvc1dyYXBwZXIoKSB7XG4gICAgaWYgKGlzSU9TKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgYXMgVmlldztcblxuICAgICAgdGhpcy5pb3NTaGFkb3dSYXBwZXIgPSB0aGlzLnJlbmRlci5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnU3RhY2tMYXlvdXQnXG4gICAgICApIGFzIFN0YWNrTGF5b3V0O1xuXG4gICAgICAvLyB3cmFwcGluZ0VsZW1lbnQuY3NzQ2xhc3NlcyA9IG1haW5FbGVtZW50LmNzc0NsYXNzZXM7XG4gICAgICBjb25zdCBwYXJlbnQgPSBvcmlnaW5hbEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIHRoaXMucmVuZGVyLmluc2VydEJlZm9yZShwYXJlbnQsIHRoaXMuaW9zU2hhZG93UmFwcGVyLCBvcmlnaW5hbEVsZW1lbnQpO1xuICAgICAgdGhpcy5yZW5kZXIucmVtb3ZlQ2hpbGQocGFyZW50LCBvcmlnaW5hbEVsZW1lbnQpO1xuICAgICAgdGhpcy5yZW5kZXIuYXBwZW5kQ2hpbGQodGhpcy5pb3NTaGFkb3dSYXBwZXIsIG9yaWdpbmFsRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndW5sb2FkZWQnKVxuICBvblVubG9hZGVkKCkge1xuICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG5cbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuX3JlZHJhd05hdGl2ZUJhY2tncm91bmQgPSB0aGlzLm9yaWdpbmFsTlNGbjsgLy8gYWx3YXlzIHJldmVydCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kXG4gICAgfVxuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmFkZElvc1dyYXBwZXIoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmxvYWRlZCAmJlxuICAgICAgISFjaGFuZ2VzICYmXG4gICAgICAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93JykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZWxldmF0aW9uJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgncHJlc3NlZEVsZXZhdGlvbicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYXBlJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnYmdjb2xvcicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Nvcm5lclJhZGl1cycpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3ByZXNzZWRUcmFuc2xhdGlvblonKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdmb3JjZVByZXNzQW5pbWF0aW9uJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndHJhbnNsYXRpb25aJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnbWFza1RvQm91bmRzJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93Q29sb3InKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFkb3dPZmZzZXQnKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFkb3dPcGFjaXR5JykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93UmFkaXVzJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgncmFzdGVyaXplJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndXNlU2hhZG93TWFwJykpXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYWRvdycpICYmXG4gICAgICAgICFjaGFuZ2VzLmhhc093blByb3BlcnR5KCdlbGV2YXRpb24nKSAmJlxuICAgICAgICB0eXBlb2YgY2hhbmdlcy5zaGFkb3cuY3VycmVudFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZWxldmF0aW9uID0gY2hhbmdlcy5zaGFkb3cuY3VycmVudFZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuc2hhZG93ICYmIGNoYW5nZXMuc2hhZG93LmN1cnJlbnRWYWx1ZS5lbGV2YXRpb24pIHtcbiAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgICAgIHRoaXMubG9hZEZyb21BbmRyb2lkRGF0YSh0aGlzLnNoYWRvdyBhcyBBbmRyb2lkRGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcbiAgICAgICAgICB0aGlzLmxvYWRGcm9tSU9TRGF0YSh0aGlzLnNoYWRvdyBhcyBJT1NEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5hcHBseVNoYWRvdygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9ua2V5UGF0Y2ggPSB2YWwgPT4ge1xuICAgIHRoaXMucHJldmlvdXNOU0ZuLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB2YWwpO1xuICAgIHRoaXMuYXBwbHlTaGFkb3coKTtcbiAgfTtcblxuICBwcml2YXRlIGFwcGx5U2hhZG93KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuc2hhZG93ID09PSBudWxsIHx8XG4gICAgICB0aGlzLnNoYWRvdyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAodGhpcy5zaGFkb3cgPT09ICcnICYmICF0aGlzLmVsZXZhdGlvbilcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGb3Igc2hhZG93cyB0byBiZSBzaG93biBvbiBBbmRyb2lkIHRoZSBTREsgaGFzIHRvIGJlIGdyZWF0ZXJcbiAgICAvLyBvciBlcXVhbCB0aGFuIDIxLCBsb3dlciBTREsgbWVhbnMgbm8gc2V0RWxldmF0aW9uIG1ldGhvZCBpcyBhdmFpbGFibGVcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICBpZiAoYW5kcm9pZC5vcy5CdWlsZC5WRVJTSU9OLlNES19JTlQgPCAyMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgdmlld1RvQXBwbHlTaGFkb3dUbyA9IGlzSU9TXG4gICAgICA/IHRoaXMuaW9zU2hhZG93UmFwcGVyXG4gICAgICA6IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcblxuICAgIGlmICh2aWV3VG9BcHBseVNoYWRvd1RvKSB7XG4gICAgICBTaGFkb3cuYXBwbHkodmlld1RvQXBwbHlTaGFkb3dUbywge1xuICAgICAgICBlbGV2YXRpb246IHRoaXMuZWxldmF0aW9uIGFzIG51bWJlcixcbiAgICAgICAgcHJlc3NlZEVsZXZhdGlvbjogdGhpcy5wcmVzc2VkRWxldmF0aW9uIGFzIG51bWJlcixcbiAgICAgICAgc2hhcGU6IHRoaXMuc2hhcGUsXG4gICAgICAgIGJnY29sb3I6IHRoaXMuYmdjb2xvcixcbiAgICAgICAgY29ybmVyUmFkaXVzOiB0aGlzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgdHJhbnNsYXRpb25aOiB0aGlzLnRyYW5zbGF0aW9uWixcbiAgICAgICAgcHJlc3NlZFRyYW5zbGF0aW9uWjogdGhpcy5wcmVzc2VkVHJhbnNsYXRpb25aLFxuICAgICAgICBmb3JjZVByZXNzQW5pbWF0aW9uOiB0aGlzLmZvcmNlUHJlc3NBbmltYXRpb24sXG4gICAgICAgIG1hc2tUb0JvdW5kczogdGhpcy5tYXNrVG9Cb3VuZHMsXG4gICAgICAgIHNoYWRvd0NvbG9yOiB0aGlzLnNoYWRvd0NvbG9yLFxuICAgICAgICBzaGFkb3dPZmZzZXQ6IHRoaXMuc2hhZG93T2Zmc2V0IGFzIG51bWJlcixcbiAgICAgICAgc2hhZG93T3BhY2l0eTogdGhpcy5zaGFkb3dPcGFjaXR5IGFzIG51bWJlcixcbiAgICAgICAgc2hhZG93UmFkaXVzOiB0aGlzLnNoYWRvd1JhZGl1cyBhcyBudW1iZXIsXG4gICAgICAgIHJhc3Rlcml6ZTogdGhpcy5yYXN0ZXJpemUsXG4gICAgICAgIHVzZVNoYWRvd1BhdGg6IHRoaXMudXNlU2hhZG93UGF0aFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplQ29tbW9uRGF0YSgpIHtcbiAgICBjb25zdCB0U2hhZG93ID0gdHlwZW9mIHRoaXMuc2hhZG93O1xuICAgIGlmICgodFNoYWRvdyA9PT0gJ3N0cmluZycgfHwgdFNoYWRvdyA9PT0gJ251bWJlcicpICYmICF0aGlzLmVsZXZhdGlvbikge1xuICAgICAgdGhpcy5lbGV2YXRpb24gPSB0aGlzLnNoYWRvdyA/IHBhcnNlSW50KHRoaXMuc2hhZG93IGFzIHN0cmluZywgMTApIDogMjtcbiAgICB9XG4gICAgY29uc3QgdEVsZXZhdGlvbiA9IHR5cGVvZiB0aGlzLmVsZXZhdGlvbjtcbiAgICBpZiAodEVsZXZhdGlvbiA9PT0gJ3N0cmluZycgfHwgdEVsZXZhdGlvbiA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuZWxldmF0aW9uID0gdGhpcy5lbGV2YXRpb25cbiAgICAgICAgPyBwYXJzZUludCh0aGlzLmVsZXZhdGlvbiBhcyBzdHJpbmcsIDEwKVxuICAgICAgICA6IDI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplQW5kcm9pZERhdGEoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvcm5lclJhZGl1cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuY29ybmVyUmFkaXVzID0gcGFyc2VJbnQodGhpcy5jb3JuZXJSYWRpdXMsIDEwKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRyYW5zbGF0aW9uWiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25aID0gcGFyc2VJbnQodGhpcy50cmFuc2xhdGlvblosIDEwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVJT1NEYXRhKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zaGFkb3dPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnNoYWRvd09mZnNldCA9IHBhcnNlRmxvYXQodGhpcy5zaGFkb3dPZmZzZXQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc2hhZG93T3BhY2l0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuc2hhZG93T3BhY2l0eSA9IHBhcnNlRmxvYXQodGhpcy5zaGFkb3dPcGFjaXR5KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNoYWRvd1JhZGl1cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuc2hhZG93UmFkaXVzID0gcGFyc2VGbG9hdCh0aGlzLnNoYWRvd1JhZGl1cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRnJvbUFuZHJvaWREYXRhKGRhdGE6IEFuZHJvaWREYXRhKSB7XG4gICAgdGhpcy5lbGV2YXRpb24gPSBkYXRhLmVsZXZhdGlvbiB8fCB0aGlzLmVsZXZhdGlvbjtcbiAgICB0aGlzLnNoYXBlID0gZGF0YS5zaGFwZSB8fCB0aGlzLnNoYXBlO1xuICAgIHRoaXMuYmdjb2xvciA9IGRhdGEuYmdjb2xvciB8fCB0aGlzLmJnY29sb3I7XG4gICAgdGhpcy5jb3JuZXJSYWRpdXMgPSBkYXRhLmNvcm5lclJhZGl1cyB8fCB0aGlzLmNvcm5lclJhZGl1cztcbiAgICB0aGlzLnRyYW5zbGF0aW9uWiA9IGRhdGEudHJhbnNsYXRpb25aIHx8IHRoaXMudHJhbnNsYXRpb25aO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRnJvbUlPU0RhdGEoZGF0YTogSU9TRGF0YSkge1xuICAgIHRoaXMubWFza1RvQm91bmRzID0gZGF0YS5tYXNrVG9Cb3VuZHMgfHwgdGhpcy5tYXNrVG9Cb3VuZHM7XG4gICAgdGhpcy5zaGFkb3dDb2xvciA9IGRhdGEuc2hhZG93Q29sb3IgfHwgdGhpcy5zaGFkb3dDb2xvcjtcbiAgICB0aGlzLnNoYWRvd09mZnNldCA9IGRhdGEuc2hhZG93T2Zmc2V0IHx8IHRoaXMuc2hhZG93T2Zmc2V0O1xuICAgIHRoaXMuc2hhZG93T3BhY2l0eSA9IGRhdGEuc2hhZG93T3BhY2l0eSB8fCB0aGlzLnNoYWRvd09wYWNpdHk7XG4gICAgdGhpcy5zaGFkb3dSYWRpdXMgPSBkYXRhLnNoYWRvd1JhZGl1cyB8fCB0aGlzLnNoYWRvd1JhZGl1cztcbiAgICB0aGlzLnJhc3Rlcml6ZSA9IGRhdGEucmFzdGVyaXplIHx8IHRoaXMucmFzdGVyaXplO1xuICAgIHRoaXMudXNlU2hhZG93UGF0aCA9IGRhdGEudXNlU2hhZG93UGF0aCB8fCB0aGlzLnVzZVNoYWRvd1BhdGg7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5hdGl2ZVNoYWRvd0RpcmVjdGl2ZSB9IGZyb20gJy4vbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbmctc2hhZG93LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOYXRpdmVTaGFkb3dEaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOYXRpdmVTaGFkb3dEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG59KVxuZXhwb3J0IGNsYXNzIE5nU2hhZG93TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuL3NoYXBlLmVudW0nO1xuXG5leHBvcnQgY2xhc3MgQW5kcm9pZERhdGEge1xuICBlbGV2YXRpb246IG51bWJlcjtcbiAgcHJlc3NlZEVsZXZhdGlvbj86IG51bWJlcjtcbiAgc2hhcGU/OiBTaGFwZTtcbiAgYmdjb2xvcj86IHN0cmluZztcbiAgY29ybmVyUmFkaXVzPzogbnVtYmVyO1xuICB0cmFuc2xhdGlvblo/OiBudW1iZXI7XG4gIHByZXNzZWRUcmFuc2xhdGlvblo/OiBudW1iZXI7XG4gIGZvcmNlUHJlc3NBbmltYXRpb24/OiBib29sZWFuO1xufVxuIiwiZXhwb3J0IGNsYXNzIElPU0RhdGEge1xuICBlbGV2YXRpb246IG51bWJlcjtcbiAgbWFza1RvQm91bmRzPzogYm9vbGVhbjtcbiAgc2hhZG93Q29sb3I/OiBzdHJpbmc7XG4gIHNoYWRvd09mZnNldD86IG51bWJlcjtcbiAgc2hhZG93T3BhY2l0eT86IG51bWJlcjtcbiAgc2hhZG93UmFkaXVzPzogbnVtYmVyO1xuICByYXN0ZXJpemU/OiBib29sZWFuO1xuICB1c2VTaGFkb3dQYXRoPzogYm9vbGVhbjtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztlQUVjLFdBQVc7VUFDaEIsTUFBTTtVQUNOLE1BQU07VUFDTixNQUFNOzs7Ozs7O0FDTGYsQUFlQSxxQkFBSSxhQUFhLENBQUM7QUFDbEIscUJBQUksV0FBVyxDQUFDO0FBRWhCLElBQUksU0FBUyxFQUFFO0lBQ2IsYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkUsV0FBVyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyRTtBQUVEOzs7Ozs7SUFPRSxPQUFPLEtBQUssQ0FBQyxPQUFZLEVBQUUsSUFBMkI7UUFDcEQsdUJBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUNFLE9BQU8sQ0FBQyxPQUFPO1lBQ2YsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxRQUN0QyxFQUFFO1lBQ0EsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzFEO2FBQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN0RDtLQUNGOzs7OztJQUVPLE9BQU8sV0FBVyxDQUFDLElBQTJCO1FBQ3BELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FDbEIsRUFBRSxFQUNGLElBQUksRUFDSjtZQUNFLEtBQUssRUFBRSxtQkFBQyxJQUFtQixHQUFFLEtBQUssSUFBSSxNQUFNLENBQUMsYUFBYTtZQUMxRCxnQkFBZ0Is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