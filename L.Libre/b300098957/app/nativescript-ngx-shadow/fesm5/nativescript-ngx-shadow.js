import { Color } from 'tns-core-modules/color';
import { Length } from 'tns-core-modules/ui/page/page';
import { isAndroid, screen, isIOS } from 'tns-core-modules/platform';
import { Directive, ElementRef, HostListener, Input, Renderer2, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var ShapeEnum = {
    RECTANGLE: 'RECTANGLE',
    OVAL: 'OVAL',
    RING: 'RING',
    LINE: 'LINE',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ LayeredShadow;
var /** @type {?} */ PlainShadow;
if (isAndroid) {
    LayeredShadow = android.graphics.drawable.LayerDrawable.extend({});
    PlainShadow = android.graphics.drawable.GradientDrawable.extend({});
}
var Shadow = /** @class */ (function () {
    function Shadow() {
    }
    /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    Shadow.apply = /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    function (tnsView, data) {
        var /** @type {?} */ LOLLIPOP = 21;
        if (tnsView.android &&
            android.os.Build.VERSION.SDK_INT >= LOLLIPOP) {
            Shadow.applyOnAndroid(tnsView, Shadow.getDefaults(data));
        }
        else if (tnsView.ios) {
            Shadow.applyOnIOS(tnsView, Shadow.getDefaults(data));
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Shadow.getDefaults = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return Object.assign({}, data, {
            shape: (/** @type {?} */ (data)).shape || Shadow.DEFAULT_SHAPE,
            pressedElevation: (/** @type {?} */ (data)).pressedElevation || Shadow.DEFAULT_PRESSED_ELEVATION,
            pressedTranslationZ: (/** @type {?} */ (data)).pressedTranslationZ || Shadow.DEFAULT_PRESSED_ELEVATION,
            shadowColor: (/** @type {?} */ (data)).shadowColor ||
                Shadow.DEFAULT_SHADOW_COLOR,
            useShadowPath: ((/** @type {?} */ (data)).useShadowPath !== undefined ? (/** @type {?} */ (data)).useShadowPath : true),
            rasterize: ((/** @type {?} */ (data)).rasterize !== undefined ? (/** @type {?} */ (data)).rasterize : false)
        });
    };
    /**
     * @param {?} drawable
     * @return {?}
     */
    Shadow.isShadow = /**
     * @param {?} drawable
     * @return {?}
     */
    function (drawable) {
        return (drawable instanceof LayeredShadow || drawable instanceof PlainShadow);
    };
    /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    Shadow.applyOnAndroid = /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    function (tnsView, data) {
        var /** @type {?} */ nativeView = tnsView.android;
        var /** @type {?} */ shape;
        var /** @type {?} */ overrideBackground = true;
        var /** @type {?} */ currentBg = nativeView.getBackground();
        if (currentBg instanceof android.graphics.drawable.RippleDrawable) {
            // play nice if a ripple is wrapping a shadow
            var /** @type {?} */ rippleBg = currentBg.getDrawable(0);
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
            var /** @type {?} */ outerRadii = Array.create("float", 8);
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
            var /** @type {?} */ bgColor = currentBg ?
                (currentBg instanceof android.graphics.drawable.ColorDrawable && currentBg.getColor() ?
                    currentBg.getColor() : android.graphics.Color.parseColor(data.bgcolor || Shadow.DEFAULT_BGCOLOR)) :
                android.graphics.Color.parseColor(data.bgcolor || Shadow.DEFAULT_BGCOLOR);
            var /** @type {?} */ newBg = void 0;
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
                var /** @type {?} */ r = new android.graphics.drawable.shapes.RoundRectShape(outerRadii, null, null);
                shape = new android.graphics.drawable.ShapeDrawable(r);
                shape.getPaint().setColor(bgColor);
                var /** @type {?} */ arr = Array.create(android.graphics.drawable.Drawable, 2);
                arr[0] = shape;
                arr[1] = currentBg;
                var /** @type {?} */ drawable = new LayeredShadow(arr);
                newBg = drawable;
            }
            nativeView.setBackgroundDrawable(newBg);
        }
        nativeView.setElevation(Shadow.androidDipToPx(nativeView, /** @type {?} */ (data.elevation)));
        nativeView.setTranslationZ(Shadow.androidDipToPx(nativeView, /** @type {?} */ (data.translationZ)));
        if (nativeView.getStateListAnimator() || data.forcePressAnimation) {
            this.overrideDefaultAnimator(nativeView, data);
        }
    };
    /**
     * @param {?} nativeView
     * @param {?} data
     * @return {?}
     */
    Shadow.overrideDefaultAnimator = /**
     * @param {?} nativeView
     * @param {?} data
     * @return {?}
     */
    function (nativeView, data) {
        var /** @type {?} */ sla = new android.animation.StateListAnimator();
        var /** @type {?} */ ObjectAnimator = android.animation.ObjectAnimator;
        var /** @type {?} */ AnimatorSet = android.animation.AnimatorSet;
        var /** @type {?} */ shortAnimTime = android.R.integer.config_shortAnimTime;
        var /** @type {?} */ buttonDuration = nativeView.getContext().getResources().getInteger(shortAnimTime) / 2;
        var /** @type {?} */ pressedElevation = this.androidDipToPx(nativeView, data.pressedElevation);
        var /** @type {?} */ pressedZ = this.androidDipToPx(nativeView, data.pressedTranslationZ);
        var /** @type {?} */ elevation = this.androidDipToPx(nativeView, data.elevation);
        var /** @type {?} */ z = this.androidDipToPx(nativeView, data.translationZ || 0);
        var /** @type {?} */ pressedSet = new AnimatorSet();
        var /** @type {?} */ notPressedSet = new AnimatorSet();
        var /** @type {?} */ defaultSet = new AnimatorSet();
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
    };
    /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    Shadow.applyOnIOS = /**
     * @param {?} tnsView
     * @param {?} data
     * @return {?}
     */
    function (tnsView, data) {
        var /** @type {?} */ nativeView = tnsView.ios;
        var /** @type {?} */ elevation = parseFloat(((/** @type {?} */ (data.elevation)) - 0).toFixed(2));
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
        var /** @type {?} */ shadowPath = null;
        if (data.useShadowPath) {
            shadowPath = UIBezierPath.bezierPathWithRoundedRectCornerRadius(nativeView.bounds, nativeView.layer.shadowRadius).cgPath;
        }
        nativeView.layer.shadowPath = shadowPath;
    };
    /**
     * @param {?} nativeView
     * @param {?} dip
     * @return {?}
     */
    Shadow.androidDipToPx = /**
     * @param {?} nativeView
     * @param {?} dip
     * @return {?}
     */
    function (nativeView, dip) {
        var /** @type {?} */ metrics = nativeView.getContext().getResources().getDisplayMetrics();
        return android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, dip, metrics);
    };
    Shadow.DEFAULT_SHAPE = ShapeEnum.RECTANGLE;
    Shadow.DEFAULT_BGCOLOR = '#FFFFFF';
    Shadow.DEFAULT_SHADOW_COLOR = '#000000';
    Shadow.DEFAULT_PRESSED_ELEVATION = 2;
    Shadow.DEFAULT_PRESSED_Z = 4;
    return Shadow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NativeShadowDirective = /** @class */ (function () {
    function NativeShadowDirective(el, render) {
        var _this = this;
        this.el = el;
        this.render = render;
        this.loaded = false;
        this.initialized = false;
        this.monkeyPatch = function (val) {
            _this.previousNSFn.call(_this.el.nativeElement, val);
            _this.applyShadow();
        };
        if (isAndroid) {
            this.originalNSFn = this.el.nativeElement._redrawNativeBackground; //always store the original method
        }
    }
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.onLoaded = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.addIosWrapper = /**
     * @return {?}
     */
    function () {
        if (isIOS) {
            var /** @type {?} */ originalElement = /** @type {?} */ (this.el.nativeElement);
            this.iosShadowRapper = /** @type {?} */ (this.render.createElement('StackLayout'));
            // wrappingElement.cssClasses = mainElement.cssClasses;
            var /** @type {?} */ parent_1 = originalElement.parentNode;
            this.render.insertBefore(parent_1, this.iosShadowRapper, originalElement);
            this.render.removeChild(parent_1, originalElement);
            this.render.appendChild(this.iosShadowRapper, originalElement);
        }
    };
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.onUnloaded = /**
     * @return {?}
     */
    function () {
        this.loaded = false;
        if (isAndroid) {
            this.el.nativeElement._redrawNativeBackground = this.originalNSFn; // always revert to the original method
        }
    };
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.addIosWrapper();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NativeShadowDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.applyShadow = /**
     * @return {?}
     */
    function () {
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
        var /** @type {?} */ viewToApplyShadowTo = isIOS
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
    };
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.initializeCommonData = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ tShadow = typeof this.shadow;
        if ((tShadow === 'string' || tShadow === 'number') && !this.elevation) {
            this.elevation = this.shadow ? parseInt(/** @type {?} */ (this.shadow), 10) : 2;
        }
        var /** @type {?} */ tElevation = typeof this.elevation;
        if (tElevation === 'string' || tElevation === 'number') {
            this.elevation = this.elevation
                ? parseInt(/** @type {?} */ (this.elevation), 10)
                : 2;
        }
    };
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.initializeAndroidData = /**
     * @return {?}
     */
    function () {
        if (typeof this.cornerRadius === 'string') {
            this.cornerRadius = parseInt(this.cornerRadius, 10);
        }
        if (typeof this.translationZ === 'string') {
            this.translationZ = parseInt(this.translationZ, 10);
        }
    };
    /**
     * @return {?}
     */
    NativeShadowDirective.prototype.initializeIOSData = /**
     * @return {?}
     */
    function () {
        if (typeof this.shadowOffset === 'string') {
            this.shadowOffset = parseFloat(this.shadowOffset);
        }
        if (typeof this.shadowOpacity === 'string') {
            this.shadowOpacity = parseFloat(this.shadowOpacity);
        }
        if (typeof this.shadowRadius === 'string') {
            this.shadowRadius = parseFloat(this.shadowRadius);
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NativeShadowDirective.prototype.loadFromAndroidData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.elevation = data.elevation || this.elevation;
        this.shape = data.shape || this.shape;
        this.bgcolor = data.bgcolor || this.bgcolor;
        this.cornerRadius = data.cornerRadius || this.cornerRadius;
        this.translationZ = data.translationZ || this.translationZ;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NativeShadowDirective.prototype.loadFromIOSData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.maskToBounds = data.maskToBounds || this.maskToBounds;
        this.shadowColor = data.shadowColor || this.shadowColor;
        this.shadowOffset = data.shadowOffset || this.shadowOffset;
        this.shadowOpacity = data.shadowOpacity || this.shadowOpacity;
        this.shadowRadius = data.shadowRadius || this.shadowRadius;
        this.rasterize = data.rasterize || this.rasterize;
        this.useShadowPath = data.useShadowPath || this.useShadowPath;
    };
    NativeShadowDirective.decorators = [
        { type: Directive, args: [{ selector: '[shadow]' },] },
    ];
    /** @nocollapse */
    NativeShadowDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return NativeShadowDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgShadowModule = /** @class */ (function () {
    function NgShadowModule() {
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
    return NgShadowModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AndroidData = /** @class */ (function () {
    function AndroidData() {
    }
    return AndroidData;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var Elevation = {
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
var IOSData = /** @class */ (function () {
    function IOSData() {
    }
    return IOSData;
}());

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LW5neC1zaGFkb3cuanMubWFwIiwic291cmNlcyI6WyJuZzovL25hdGl2ZXNjcmlwdC1uZ3gtc2hhZG93L25hdGl2ZXNjcmlwdC1uZ3gtc2hhZG93L2NvbW1vbi9zaGFwZS5lbnVtLnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9jb21tb24vc2hhZG93LnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uZy1zaGFkb3cuZGlyZWN0aXZlLnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9saWIubW9kdWxlLnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9jb21tb24vYW5kcm9pZC1kYXRhLm1vZGVsLnRzIiwibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9jb21tb24vaW9zLWRhdGEubW9kZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZW51bSBTaGFwZUVudW0ge1xuICBSRUNUQU5HTEUgPSAnUkVDVEFOR0xFJyxcbiAgT1ZBTCA9ICdPVkFMJyxcbiAgUklORyA9ICdSSU5HJyxcbiAgTElORSA9ICdMSU5FJyxcbn1cblxuZXhwb3J0IHR5cGUgU2hhcGUgPSAnUkVDVEFOR0xFJyB8ICdPVkFMJyB8ICdSSU5HJyB8ICdMSU5FJztcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvcic7XG5cbmltcG9ydCB7IEFuZHJvaWREYXRhIH0gZnJvbSBcIi4vYW5kcm9pZC1kYXRhLm1vZGVsXCI7XG5pbXBvcnQgeyBJT1NEYXRhIH0gZnJvbSBcIi4vaW9zLWRhdGEubW9kZWxcIjtcbmltcG9ydCB7IFNoYXBlRW51bSB9IGZyb20gJy4vc2hhcGUuZW51bSc7XG5pbXBvcnQgeyBMZW5ndGggfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5cbmRlY2xhcmUgY29uc3QgYW5kcm9pZDogYW55O1xuZGVjbGFyZSBjb25zdCBqYXZhOiBhbnk7XG5kZWNsYXJlIGNvbnN0IENHU2l6ZU1ha2U6IGFueTtcbmRlY2xhcmUgY29uc3QgVUlTY3JlZW46IGFueTtcbmRlY2xhcmUgY29uc3QgQXJyYXk6IGFueTtcbmRlY2xhcmUgY29uc3QgVUlCZXppZXJQYXRoOiBhbnk7XG5cbmxldCBMYXllcmVkU2hhZG93O1xubGV0IFBsYWluU2hhZG93O1xuXG5pZiAoaXNBbmRyb2lkKSB7XG4gIExheWVyZWRTaGFkb3cgPSBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkxheWVyRHJhd2FibGUuZXh0ZW5kKHt9KTtcbiAgUGxhaW5TaGFkb3cgPSBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkdyYWRpZW50RHJhd2FibGUuZXh0ZW5kKHt9KTtcbn1cblxuZXhwb3J0IGNsYXNzIFNoYWRvdyB7XG4gIHN0YXRpYyBERUZBVUxUX1NIQVBFID0gU2hhcGVFbnVtLlJFQ1RBTkdMRTtcbiAgc3RhdGljIERFRkFVTFRfQkdDT0xPUiA9ICcjRkZGRkZGJztcbiAgc3RhdGljIERFRkFVTFRfU0hBRE9XX0NPTE9SID0gJyMwMDAwMDAnO1xuICBzdGF0aWMgREVGQVVMVF9QUkVTU0VEX0VMRVZBVElPTiA9IDI7XG4gIHN0YXRpYyBERUZBVUxUX1BSRVNTRURfWiA9IDQ7XG5cbiAgc3RhdGljIGFwcGx5KHRuc1ZpZXc6IGFueSwgZGF0YTogSU9TRGF0YSB8IEFuZHJvaWREYXRhKSB7XG4gICAgY29uc3QgTE9MTElQT1AgPSAyMTtcbiAgICBpZiAoXG4gICAgICB0bnNWaWV3LmFuZHJvaWQgJiZcbiAgICAgIGFuZHJvaWQub3MuQnVpbGQuVkVSU0lPTi5TREtfSU5UID49IExPTExJUE9QXG4gICAgKSB7XG4gICAgICBTaGFkb3cuYXBwbHlPbkFuZHJvaWQodG5zVmlldywgU2hhZG93LmdldERlZmF1bHRzKGRhdGEpKTtcbiAgICB9IGVsc2UgaWYgKHRuc1ZpZXcuaW9zKSB7XG4gICAgICBTaGFkb3cuYXBwbHlPbklPUyh0bnNWaWV3LCBTaGFkb3cuZ2V0RGVmYXVsdHMoZGF0YSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldERlZmF1bHRzKGRhdGE6IElPU0RhdGEgfCBBbmRyb2lkRGF0YSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICBkYXRhLFxuICAgICAge1xuICAgICAgICBzaGFwZTogKGRhdGEgYXMgQW5kcm9pZERhdGEpLnNoYXBlIHx8IFNoYWRvdy5ERUZBVUxUX1NIQVBFLFxuICAgICAgICBwcmVzc2VkRWxldmF0aW9uOiAoZGF0YSBhcyBBbmRyb2lkRGF0YSkucHJlc3NlZEVsZXZhdGlvbiB8fCBTaGFkb3cuREVGQVVMVF9QUkVTU0VEX0VMRVZBVElPTixcbiAgICAgICAgcHJlc3NlZFRyYW5zbGF0aW9uWjogKGRhdGEgYXMgQW5kcm9pZERhdGEpLnByZXNzZWRUcmFuc2xhdGlvblogfHwgU2hhZG93LkRFRkFVTFRfUFJFU1NFRF9FTEVWQVRJT04sXG4gICAgICAgIHNoYWRvd0NvbG9yOiAoZGF0YSBhcyBJT1NEYXRhKS5zaGFkb3dDb2xvciB8fFxuICAgICAgICAgIFNoYWRvdy5ERUZBVUxUX1NIQURPV19DT0xPUixcbiAgICAgICAgdXNlU2hhZG93UGF0aDogKChkYXRhIGFzIElPU0RhdGEpLnVzZVNoYWRvd1BhdGggIT09IHVuZGVmaW5lZCA/IChkYXRhIGFzIElPU0RhdGEpLnVzZVNoYWRvd1BhdGggOiB0cnVlKSxcbiAgICAgICAgcmFzdGVyaXplOiAoKGRhdGEgYXMgSU9TRGF0YSkucmFzdGVyaXplICE9PSB1bmRlZmluZWQgPyAoZGF0YSBhcyBJT1NEYXRhKS5yYXN0ZXJpemUgOiBmYWxzZSlcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzU2hhZG93KGRyYXdhYmxlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKGRyYXdhYmxlIGluc3RhbmNlb2YgTGF5ZXJlZFNoYWRvdyB8fCBkcmF3YWJsZSBpbnN0YW5jZW9mIFBsYWluU2hhZG93KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGFwcGx5T25BbmRyb2lkKHRuc1ZpZXc6IGFueSwgZGF0YTogQW5kcm9pZERhdGEpIHtcbiAgICBjb25zdCBuYXRpdmVWaWV3ID0gdG5zVmlldy5hbmRyb2lkO1xuICAgIGxldCBzaGFwZTtcbiAgICBsZXQgb3ZlcnJpZGVCYWNrZ3JvdW5kID0gdHJ1ZTtcblxuXG4gICAgbGV0IGN1cnJlbnRCZyA9IG5hdGl2ZVZpZXcuZ2V0QmFja2dyb3VuZCgpO1xuXG4gICAgaWYgKGN1cnJlbnRCZyBpbnN0YW5jZW9mIGFuZHJvaWQuZ3JhcGhpY3MuZHJhd2FibGUuUmlwcGxlRHJhd2FibGUpIHsgLy8gcGxheSBuaWNlIGlmIGEgcmlwcGxlIGlzIHdyYXBwaW5nIGEgc2hhZG93XG4gICAgICBsZXQgcmlwcGxlQmcgPSBjdXJyZW50QmcuZ2V0RHJhd2FibGUoMCk7XG4gICAgICBpZiAocmlwcGxlQmcgaW5zdGFuY2VvZiBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkluc2V0RHJhd2FibGUpIHtcbiAgICAgICAgb3ZlcnJpZGVCYWNrZ3JvdW5kID0gZmFsc2U7IC8vIHRoaXMgaXMgYSBidXR0b24gd2l0aCBpdCdzIG93biBzaGFkb3dcbiAgICAgIH0gZWxzZSBpZiAoU2hhZG93LmlzU2hhZG93KHJpcHBsZUJnKSkgeyAvLyBpZiB0aGUgcmlwcGxlIGlzIHdyYXBwaW5nIGEgc2hhZG93LCBzdHJpcCBpdFxuICAgICAgICBjdXJyZW50QmcgPSByaXBwbGVCZztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG92ZXJyaWRlQmFja2dyb3VuZCkge1xuICAgICAgaWYgKFNoYWRvdy5pc1NoYWRvdyhjdXJyZW50QmcpKSB7IC8vIG1ha2Ugc3VyZSB0byBoYXZlIHRoZSByaWdodCBiYWNrZ3JvdW5kXG4gICAgICAgIGN1cnJlbnRCZyA9IGN1cnJlbnRCZyBpbnN0YW5jZW9mIExheWVyZWRTaGFkb3cgPyAvLyBpZiBsYXllcmVkLCBnZXQgdGhlIG9yaWdpbmFsIGJhY2tncm91bmRcbiAgICAgICAgICBjdXJyZW50QmcuZ2V0RHJhd2FibGUoMSkgOiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvdXRlclJhZGlpID0gQXJyYXkuY3JlYXRlKFwiZmxvYXRcIiwgOCk7XG4gICAgICBpZiAoZGF0YS5jb3JuZXJSYWRpdXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXRlclJhZGlpWzBdID0gb3V0ZXJSYWRpaVsxXSA9IExlbmd0aC50b0RldmljZVBpeGVscyh0bnNWaWV3LmJvcmRlclRvcExlZnRSYWRpdXMsIDApO1xuICAgICAgICBvdXRlclJhZGlpWzJdID0gb3V0ZXJSYWRpaVszXSA9IExlbmd0aC50b0RldmljZVBpeGVscyh0bnNWaWV3LmJvcmRlclRvcFJpZ2h0UmFkaXVzLCAwKTtcbiAgICAgICAgb3V0ZXJSYWRpaVs0XSA9IG91dGVyUmFkaWlbNV0gPSBMZW5ndGgudG9EZXZpY2VQaXhlbHModG5zVmlldy5ib3JkZXJCb3R0b21SaWdodFJhZGl1cywgMCk7XG4gICAgICAgIG91dGVyUmFkaWlbNl0gPSBvdXRlclJhZGlpWzddID0gTGVuZ3RoLnRvRGV2aWNlUGl4ZWxzKHRuc1ZpZXcuYm9yZGVyQm90dG9tTGVmdFJhZGl1cywgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqYXZhLnV0aWwuQXJyYXlzLmZpbGwob3V0ZXJSYWRpaSwgU2hhZG93LmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEuY29ybmVyUmFkaXVzIGFzIG51bWJlcikpO1xuICAgICAgfVxuXG4gICAgICAvLyB1c2UgdGhlIHVzZXIgZGVmaW5lZCBjb2xvciBvciB0aGUgZGVmYXVsdCBpbiBjYXNlIHRoZSBjb2xvciBpcyBUUkFOU1BBUkVOVFxuICAgICAgY29uc3QgYmdDb2xvciA9IGN1cnJlbnRCZyA/XG4gICAgICAgIChjdXJyZW50QmcgaW5zdGFuY2VvZiBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkNvbG9yRHJhd2FibGUgJiYgY3VycmVudEJnLmdldENvbG9yKCkgP1xuICAgICAgICAgIGN1cnJlbnRCZy5nZXRDb2xvcigpIDogYW5kcm9pZC5ncmFwaGljcy5Db2xvci5wYXJzZUNvbG9yKGRhdGEuYmdjb2xvciB8fCBTaGFkb3cuREVGQVVMVF9CR0NPTE9SKSkgOlxuICAgICAgICBhbmRyb2lkLmdyYXBoaWNzLkNvbG9yLnBhcnNlQ29sb3IoZGF0YS5iZ2NvbG9yIHx8IFNoYWRvdy5ERUZBVUxUX0JHQ09MT1IpO1xuXG4gICAgICBsZXQgbmV3Qmc7XG5cbiAgICAgIGlmIChkYXRhLnNoYXBlICE9PSBTaGFwZUVudW0uUkVDVEFOR0xFIHx8IGRhdGEuYmdjb2xvciB8fCAhY3VycmVudEJnKSB7IC8vIHJlcGxhY2UgYmFja2dyb3VuZFxuICAgICAgICBzaGFwZSA9IG5ldyBQbGFpblNoYWRvdygpO1xuICAgICAgICBzaGFwZS5zZXRTaGFwZShcbiAgICAgICAgICBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkdyYWRpZW50RHJhd2FibGVbZGF0YS5zaGFwZV0sXG4gICAgICAgICk7XG4gICAgICAgIHNoYXBlLnNldENvcm5lclJhZGlpKG91dGVyUmFkaWkpO1xuICAgICAgICBzaGFwZS5zZXRDb2xvcihiZ0NvbG9yKTtcbiAgICAgICAgbmV3QmcgPSBzaGFwZTtcbiAgICAgIH0gZWxzZSB7IC8vIGFkZCBhIGxheWVyXG4gICAgICAgIGNvbnN0IHIgPSBuZXcgYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5zaGFwZXMuUm91bmRSZWN0U2hhcGUob3V0ZXJSYWRpaSwgbnVsbCwgbnVsbCk7XG4gICAgICAgIHNoYXBlID0gbmV3IGFuZHJvaWQuZ3JhcGhpY3MuZHJhd2FibGUuU2hhcGVEcmF3YWJsZShyKTtcbiAgICAgICAgc2hhcGUuZ2V0UGFpbnQoKS5zZXRDb2xvcihiZ0NvbG9yKTtcbiAgICAgICAgdmFyIGFyciA9IEFycmF5LmNyZWF0ZShhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkRyYXdhYmxlLCAyKTtcbiAgICAgICAgYXJyWzBdID0gc2hhcGU7XG4gICAgICAgIGFyclsxXSA9IGN1cnJlbnRCZztcbiAgICAgICAgY29uc3QgZHJhd2FibGUgPSBuZXcgTGF5ZXJlZFNoYWRvdyhhcnIpO1xuICAgICAgICBuZXdCZyA9IGRyYXdhYmxlO1xuICAgICAgfVxuXG4gICAgICBuYXRpdmVWaWV3LnNldEJhY2tncm91bmREcmF3YWJsZShuZXdCZyk7XG4gICAgfVxuXG4gICAgbmF0aXZlVmlldy5zZXRFbGV2YXRpb24oXG4gICAgICBTaGFkb3cuYW5kcm9pZERpcFRvUHgobmF0aXZlVmlldywgZGF0YS5lbGV2YXRpb24gYXMgbnVtYmVyKSxcbiAgICApO1xuICAgIG5hdGl2ZVZpZXcuc2V0VHJhbnNsYXRpb25aKFxuICAgICAgU2hhZG93LmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEudHJhbnNsYXRpb25aIGFzIG51bWJlciksXG4gICAgKTtcbiAgICBpZiAobmF0aXZlVmlldy5nZXRTdGF0ZUxpc3RBbmltYXRvcigpIHx8IGRhdGEuZm9yY2VQcmVzc0FuaW1hdGlvbikge1xuICAgICAgdGhpcy5vdmVycmlkZURlZmF1bHRBbmltYXRvcihuYXRpdmVWaWV3LCBkYXRhKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBvdmVycmlkZURlZmF1bHRBbmltYXRvcihuYXRpdmVWaWV3OiBhbnksIGRhdGE6IEFuZHJvaWREYXRhKSB7XG4gICAgY29uc3Qgc2xhID0gbmV3IGFuZHJvaWQuYW5pbWF0aW9uLlN0YXRlTGlzdEFuaW1hdG9yKCk7XG5cbiAgICBjb25zdCBPYmplY3RBbmltYXRvciA9IGFuZHJvaWQuYW5pbWF0aW9uLk9iamVjdEFuaW1hdG9yO1xuICAgIGNvbnN0IEFuaW1hdG9yU2V0ID0gYW5kcm9pZC5hbmltYXRpb24uQW5pbWF0b3JTZXQ7XG4gICAgY29uc3Qgc2hvcnRBbmltVGltZSA9IGFuZHJvaWQuUi5pbnRlZ2VyLmNvbmZpZ19zaG9ydEFuaW1UaW1lO1xuXG4gICAgY29uc3QgYnV0dG9uRHVyYXRpb24gPVxuICAgICAgbmF0aXZlVmlldy5nZXRDb250ZXh0KCkuZ2V0UmVzb3VyY2VzKCkuZ2V0SW50ZWdlcihzaG9ydEFuaW1UaW1lKSAvIDI7XG4gICAgY29uc3QgcHJlc3NlZEVsZXZhdGlvbiA9IHRoaXMuYW5kcm9pZERpcFRvUHgobmF0aXZlVmlldywgZGF0YS5wcmVzc2VkRWxldmF0aW9uKTtcbiAgICBjb25zdCBwcmVzc2VkWiA9IHRoaXMuYW5kcm9pZERpcFRvUHgobmF0aXZlVmlldywgZGF0YS5wcmVzc2VkVHJhbnNsYXRpb25aKTtcbiAgICBjb25zdCBlbGV2YXRpb24gPSB0aGlzLmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEuZWxldmF0aW9uKTtcbiAgICBjb25zdCB6ID0gdGhpcy5hbmRyb2lkRGlwVG9QeChuYXRpdmVWaWV3LCBkYXRhLnRyYW5zbGF0aW9uWiB8fCAwKTtcblxuICAgIGNvbnN0IHByZXNzZWRTZXQgPSBuZXcgQW5pbWF0b3JTZXQoKTtcbiAgICBjb25zdCBub3RQcmVzc2VkU2V0ID0gbmV3IEFuaW1hdG9yU2V0KCk7XG4gICAgY29uc3QgZGVmYXVsdFNldCA9IG5ldyBBbmltYXRvclNldCgpO1xuXG4gICAgcHJlc3NlZFNldC5wbGF5VG9nZXRoZXIoamF2YS51dGlsLkFycmF5cy5hc0xpc3QoW1xuICAgICAgT2JqZWN0QW5pbWF0b3Iub2ZGbG9hdChuYXRpdmVWaWV3LCBcInRyYW5zbGF0aW9uWlwiLCBbcHJlc3NlZFpdKVxuICAgICAgICAuc2V0RHVyYXRpb24oYnV0dG9uRHVyYXRpb24pLFxuICAgICAgT2JqZWN0QW5pbWF0b3Iub2ZGbG9hdChuYXRpdmVWaWV3LCBcImVsZXZhdGlvblwiLCBbcHJlc3NlZEVsZXZhdGlvbl0pXG4gICAgICAgIC5zZXREdXJhdGlvbigwKSxcbiAgICBdKSk7XG4gICAgbm90UHJlc3NlZFNldC5wbGF5VG9nZXRoZXIoamF2YS51dGlsLkFycmF5cy5hc0xpc3QoW1xuICAgICAgT2JqZWN0QW5pbWF0b3Iub2ZGbG9hdChuYXRpdmVWaWV3LCBcInRyYW5zbGF0aW9uWlwiLCBbel0pXG4gICAgICAgIC5zZXREdXJhdGlvbihidXR0b25EdXJhdGlvbiksXG4gICAgICBPYmplY3RBbmltYXRvci5vZkZsb2F0KG5hdGl2ZVZpZXcsIFwiZWxldmF0aW9uXCIsIFtlbGV2YXRpb25dKVxuICAgICAgICAuc2V0RHVyYXRpb24oMCksXG4gICAgXSkpO1xuICAgIGRlZmF1bHRTZXQucGxheVRvZ2V0aGVyKGphdmEudXRpbC5BcnJheXMuYXNMaXN0KFtcbiAgICAgIE9iamVjdEFuaW1hdG9yLm9mRmxvYXQobmF0aXZlVmlldywgXCJ0cmFuc2xhdGlvblpcIiwgWzBdKS5zZXREdXJhdGlvbigwKSxcbiAgICAgIE9iamVjdEFuaW1hdG9yLm9mRmxvYXQobmF0aXZlVmlldywgXCJlbGV2YXRpb25cIiwgWzBdKS5zZXREdXJhdGlvbigwKSxcbiAgICBdKSk7XG5cbiAgICBzbGEuYWRkU3RhdGUoXG4gICAgICBbYW5kcm9pZC5SLmF0dHIuc3RhdGVfcHJlc3NlZCwgYW5kcm9pZC5SLmF0dHIuc3RhdGVfZW5hYmxlZF0sXG4gICAgICBwcmVzc2VkU2V0LFxuICAgICk7XG4gICAgc2xhLmFkZFN0YXRlKFthbmRyb2lkLlIuYXR0ci5zdGF0ZV9lbmFibGVkXSwgbm90UHJlc3NlZFNldCk7XG4gICAgc2xhLmFkZFN0YXRlKFtdLCBkZWZhdWx0U2V0KTtcbiAgICBuYXRpdmVWaWV3LnNldFN0YXRlTGlzdEFuaW1hdG9yKHNsYSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhcHBseU9uSU9TKHRuc1ZpZXc6IGFueSwgZGF0YTogSU9TRGF0YSkge1xuICAgIGNvbnN0IG5hdGl2ZVZpZXcgPSB0bnNWaWV3LmlvcztcbiAgICBjb25zdCBlbGV2YXRpb24gPSBwYXJzZUZsb2F0KCgoZGF0YS5lbGV2YXRpb24gYXMgbnVtYmVyKSAtIDApLnRvRml4ZWQoMikpO1xuICAgIG5hdGl2ZVZpZXcubGF5ZXIubWFza1RvQm91bmRzID0gZmFsc2U7XG4gICAgbmF0aXZlVmlldy5sYXllci5zaGFkb3dDb2xvciA9IG5ldyBDb2xvcihkYXRhLnNoYWRvd0NvbG9yKS5pb3MuQ0dDb2xvcjtcbiAgICBuYXRpdmVWaWV3LmxheWVyLnNoYWRvd09mZnNldCA9XG4gICAgICBkYXRhLnNoYWRvd09mZnNldCA/XG4gICAgICAgIENHU2l6ZU1ha2UoMCwgcGFyc2VGbG9hdChTdHJpbmcoZGF0YS5zaGFkb3dPZmZzZXQpKSkgOlxuICAgICAgICBDR1NpemVNYWtlKDAsIDAuNTQgKiBlbGV2YXRpb24gLSAwLjE0KTtcbiAgICBuYXRpdmVWaWV3LmxheWVyLnNoYWRvd09wYWNpdHkgPVxuICAgICAgZGF0YS5zaGFkb3dPcGFjaXR5ID9cbiAgICAgICAgcGFyc2VGbG9hdChTdHJpbmcoZGF0YS5zaGFkb3dPcGFjaXR5KSkgOlxuICAgICAgICAwLjAwNiAqIGVsZXZhdGlvbiArIDAuMjU7XG4gICAgbmF0aXZlVmlldy5sYXllci5zaGFkb3dSYWRpdXMgPVxuICAgICAgZGF0YS5zaGFkb3dSYWRpdXMgP1xuICAgICAgICBwYXJzZUZsb2F0KFN0cmluZyhkYXRhLnNoYWRvd1JhZGl1cykpIDpcbiAgICAgICAgMC42NiAqIGVsZXZhdGlvbiAtIDAuNTtcbiAgICBuYXRpdmVWaWV3LmxheWVyLnNob3VsZFJhc3Rlcml6ZSA9IGRhdGEucmFzdGVyaXplO1xuICAgIG5hdGl2ZVZpZXcubGF5ZXIucmFzdGVyaXphdGlvblNjYWxlID0gc2NyZWVuLm1haW5TY3JlZW4uc2NhbGU7XG4gICAgbGV0IHNoYWRvd1BhdGggPSBudWxsO1xuICAgIGlmKGRhdGEudXNlU2hhZG93UGF0aCkge1xuICAgICAgc2hhZG93UGF0aCA9IFVJQmV6aWVyUGF0aC5iZXppZXJQYXRoV2l0aFJvdW5kZWRSZWN0Q29ybmVyUmFkaXVzKG5hdGl2ZVZpZXcuYm91bmRzLCBuYXRpdmVWaWV3LmxheWVyLnNoYWRvd1JhZGl1cykuY2dQYXRoO1xuICAgIH1cbiAgICBuYXRpdmVWaWV3LmxheWVyLnNoYWRvd1BhdGggPSBzaGFkb3dQYXRoO1xuICB9XG5cbiAgc3RhdGljIGFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXc6IGFueSwgZGlwOiBudW1iZXIpIHtcbiAgICBjb25zdCBtZXRyaWNzID0gbmF0aXZlVmlldy5nZXRDb250ZXh0KCkuZ2V0UmVzb3VyY2VzKCkuZ2V0RGlzcGxheU1ldHJpY3MoKTtcbiAgICByZXR1cm4gYW5kcm9pZC51dGlsLlR5cGVkVmFsdWUuYXBwbHlEaW1lbnNpb24oXG4gICAgICBhbmRyb2lkLnV0aWwuVHlwZWRWYWx1ZS5DT01QTEVYX1VOSVRfRElQLFxuICAgICAgZGlwLFxuICAgICAgbWV0cmljcyxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBSZW5kZXJlcjIsXG4gIEFmdGVyVmlld0luaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybSc7XG5cbmltcG9ydCB7IEFuZHJvaWREYXRhIH0gZnJvbSAnLi9jb21tb24vYW5kcm9pZC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IElPU0RhdGEgfSBmcm9tICcuL2NvbW1vbi9pb3MtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBTaGFkb3cgfSBmcm9tICcuL2NvbW1vbi9zaGFkb3cnO1xuaW1wb3J0IHsgU2hhcGUsIFNoYXBlRW51bSB9IGZyb20gJy4vY29tbW9uL3NoYXBlLmVudW0nO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dCc7XG5kZWNsYXJlIGNvbnN0IGFuZHJvaWQ6IGFueTtcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3NoYWRvd10nIH0pXG5leHBvcnQgY2xhc3MgTmF0aXZlU2hhZG93RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBzaGFkb3c6IHN0cmluZyB8IEFuZHJvaWREYXRhIHwgSU9TRGF0YTtcbiAgQElucHV0KCkgZWxldmF0aW9uPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBwcmVzc2VkRWxldmF0aW9uPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBzaGFwZT86IFNoYXBlO1xuICBASW5wdXQoKSBiZ2NvbG9yPzogc3RyaW5nO1xuICBASW5wdXQoKSBjb3JuZXJSYWRpdXM/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHRyYW5zbGF0aW9uWj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHJlc3NlZFRyYW5zbGF0aW9uWj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgZm9yY2VQcmVzc0FuaW1hdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1hc2tUb0JvdW5kcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNoYWRvd0NvbG9yPzogc3RyaW5nO1xuICBASW5wdXQoKSBzaGFkb3dPZmZzZXQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHNoYWRvd09wYWNpdHk/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHNoYWRvd1JhZGl1cz86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgdXNlU2hhZG93UGF0aD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJhc3Rlcml6ZT86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBsb2FkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIG9yaWdpbmFsTlNGbjogYW55O1xuICBwcml2YXRlIHByZXZpb3VzTlNGbjogYW55O1xuICBwcml2YXRlIGlvc1NoYWRvd1JhcHBlcjogVmlldztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcjogUmVuZGVyZXIyKSB7XG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdGhpcy5vcmlnaW5hbE5TRm4gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuX3JlZHJhd05hdGl2ZUJhY2tncm91bmQ7IC8vYWx3YXlzIHN0b3JlIHRoZSBvcmlnaW5hbCBtZXRob2RcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVDb21tb25EYXRhKCk7XG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplQW5kcm9pZERhdGEoKTtcbiAgICB9IGVsc2UgaWYgKGlzSU9TKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVJT1NEYXRhKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNoYWRvdyAmJiAodGhpcy5zaGFkb3cgYXMgQW5kcm9pZERhdGEgfCBJT1NEYXRhKS5lbGV2YXRpb24pIHtcbiAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgdGhpcy5sb2FkRnJvbUFuZHJvaWREYXRhKHRoaXMuc2hhZG93IGFzIEFuZHJvaWREYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcbiAgICAgICAgdGhpcy5sb2FkRnJvbUlPU0RhdGEodGhpcy5zaGFkb3cgYXMgSU9TRGF0YSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYXBwbHlTaGFkb3coKTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2xvYWRlZCcpXG4gIG9uTG9hZGVkKCkge1xuICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAvLyBXZWlyZGx5IG5nT25Jbml0IGlzbid0IGNhbGxlZCBvbiBpT1Mgb24gZGVtbyBhcHBcbiAgICAvLyBNYW5hZ2VkIHRvIGdldCBpdCB3b3JraW5nIG9uIGlPUyB3aGVuIGFwcGx5aW5nIHRvXG4gICAgLy8gRmxleGJveExheW91dCwgYnV0IG9uIHRoZSBkZW1vIGFwcCwgd2UgYXBwbHkgdG8gYVxuICAgIC8vIExhYmVsLCBhbmQsIGZvciB0aGF0IGNhc2UsIG5nT25Jbml0IGlzbid0IGNhbGxlZFxuXG4gICAgLy8gVGhpcyBpcyBqdXN0IGVuZm9yY2luZyB0aGUgRGlyZWN0aXZlIGlzIGluaXRpYWxpemVkXG4gICAgLy8gYmVmb3JlIGNhbGxpbmcgdGhpcy5hcHBseVNoYWRvdygpXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlTaGFkb3coKTtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLnByZXZpb3VzTlNGbiA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5fcmVkcmF3TmF0aXZlQmFja2dyb3VuZDsgLy8ganVzdCB0byBtYWludGFpbiBjb21wYXRpYmlsaXR5IHdpdGggb3RoZXIgcGF0Y2hlc1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50Ll9yZWRyYXdOYXRpdmVCYWNrZ3JvdW5kID0gdGhpcy5tb25rZXlQYXRjaDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZElvc1dyYXBwZXIoKSB7XG4gICAgaWYgKGlzSU9TKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgYXMgVmlldztcblxuICAgICAgdGhpcy5pb3NTaGFkb3dSYXBwZXIgPSB0aGlzLnJlbmRlci5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnU3RhY2tMYXlvdXQnXG4gICAgICApIGFzIFN0YWNrTGF5b3V0O1xuXG4gICAgICAvLyB3cmFwcGluZ0VsZW1lbnQuY3NzQ2xhc3NlcyA9IG1haW5FbGVtZW50LmNzc0NsYXNzZXM7XG4gICAgICBjb25zdCBwYXJlbnQgPSBvcmlnaW5hbEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIHRoaXMucmVuZGVyLmluc2VydEJlZm9yZShwYXJlbnQsIHRoaXMuaW9zU2hhZG93UmFwcGVyLCBvcmlnaW5hbEVsZW1lbnQpO1xuICAgICAgdGhpcy5yZW5kZXIucmVtb3ZlQ2hpbGQocGFyZW50LCBvcmlnaW5hbEVsZW1lbnQpO1xuICAgICAgdGhpcy5yZW5kZXIuYXBwZW5kQ2hpbGQodGhpcy5pb3NTaGFkb3dSYXBwZXIsIG9yaWdpbmFsRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndW5sb2FkZWQnKVxuICBvblVubG9hZGVkKCkge1xuICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG5cbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuX3JlZHJhd05hdGl2ZUJhY2tncm91bmQgPSB0aGlzLm9yaWdpbmFsTlNGbjsgLy8gYWx3YXlzIHJldmVydCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kXG4gICAgfVxuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmFkZElvc1dyYXBwZXIoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmxvYWRlZCAmJlxuICAgICAgISFjaGFuZ2VzICYmXG4gICAgICAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93JykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZWxldmF0aW9uJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgncHJlc3NlZEVsZXZhdGlvbicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYXBlJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnYmdjb2xvcicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Nvcm5lclJhZGl1cycpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3ByZXNzZWRUcmFuc2xhdGlvblonKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdmb3JjZVByZXNzQW5pbWF0aW9uJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndHJhbnNsYXRpb25aJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnbWFza1RvQm91bmRzJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93Q29sb3InKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFkb3dPZmZzZXQnKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFkb3dPcGFjaXR5JykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93UmFkaXVzJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgncmFzdGVyaXplJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndXNlU2hhZG93TWFwJykpXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYWRvdycpICYmXG4gICAgICAgICFjaGFuZ2VzLmhhc093blByb3BlcnR5KCdlbGV2YXRpb24nKSAmJlxuICAgICAgICB0eXBlb2YgY2hhbmdlcy5zaGFkb3cuY3VycmVudFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuZWxldmF0aW9uID0gY2hhbmdlcy5zaGFkb3cuY3VycmVudFZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXMuc2hhZG93ICYmIGNoYW5nZXMuc2hhZG93LmN1cnJlbnRWYWx1ZS5lbGV2YXRpb24pIHtcbiAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgICAgIHRoaXMubG9hZEZyb21BbmRyb2lkRGF0YSh0aGlzLnNoYWRvdyBhcyBBbmRyb2lkRGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcbiAgICAgICAgICB0aGlzLmxvYWRGcm9tSU9TRGF0YSh0aGlzLnNoYWRvdyBhcyBJT1NEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5hcHBseVNoYWRvdygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9ua2V5UGF0Y2ggPSB2YWwgPT4ge1xuICAgIHRoaXMucHJldmlvdXNOU0ZuLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB2YWwpO1xuICAgIHRoaXMuYXBwbHlTaGFkb3coKTtcbiAgfTtcblxuICBwcml2YXRlIGFwcGx5U2hhZG93KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuc2hhZG93ID09PSBudWxsIHx8XG4gICAgICB0aGlzLnNoYWRvdyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAodGhpcy5zaGFkb3cgPT09ICcnICYmICF0aGlzLmVsZXZhdGlvbilcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGb3Igc2hhZG93cyB0byBiZSBzaG93biBvbiBBbmRyb2lkIHRoZSBTREsgaGFzIHRvIGJlIGdyZWF0ZXJcbiAgICAvLyBvciBlcXVhbCB0aGFuIDIxLCBsb3dlciBTREsgbWVhbnMgbm8gc2V0RWxldmF0aW9uIG1ldGhvZCBpcyBhdmFpbGFibGVcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICBpZiAoYW5kcm9pZC5vcy5CdWlsZC5WRVJTSU9OLlNES19JTlQgPCAyMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgdmlld1RvQXBwbHlTaGFkb3dUbyA9IGlzSU9TXG4gICAgICA/IHRoaXMuaW9zU2hhZG93UmFwcGVyXG4gICAgICA6IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcblxuICAgIGlmICh2aWV3VG9BcHBseVNoYWRvd1RvKSB7XG4gICAgICBTaGFkb3cuYXBwbHkodmlld1RvQXBwbHlTaGFkb3dUbywge1xuICAgICAgICBlbGV2YXRpb246IHRoaXMuZWxldmF0aW9uIGFzIG51bWJlcixcbiAgICAgICAgcHJlc3NlZEVsZXZhdGlvbjogdGhpcy5wcmVzc2VkRWxldmF0aW9uIGFzIG51bWJlcixcbiAgICAgICAgc2hhcGU6IHRoaXMuc2hhcGUsXG4gICAgICAgIGJnY29sb3I6IHRoaXMuYmdjb2xvcixcbiAgICAgICAgY29ybmVyUmFkaXVzOiB0aGlzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgdHJhbnNsYXRpb25aOiB0aGlzLnRyYW5zbGF0aW9uWixcbiAgICAgICAgcHJlc3NlZFRyYW5zbGF0aW9uWjogdGhpcy5wcmVzc2VkVHJhbnNsYXRpb25aLFxuICAgICAgICBmb3JjZVByZXNzQW5pbWF0aW9uOiB0aGlzLmZvcmNlUHJlc3NBbmltYXRpb24sXG4gICAgICAgIG1hc2tUb0JvdW5kczogdGhpcy5tYXNrVG9Cb3VuZHMsXG4gICAgICAgIHNoYWRvd0NvbG9yOiB0aGlzLnNoYWRvd0NvbG9yLFxuICAgICAgICBzaGFkb3dPZmZzZXQ6IHRoaXMuc2hhZG93T2Zmc2V0IGFzIG51bWJlcixcbiAgICAgICAgc2hhZG93T3BhY2l0eTogdGhpcy5zaGFkb3dPcGFjaXR5IGFzIG51bWJlcixcbiAgICAgICAgc2hhZG93UmFkaXVzOiB0aGlzLnNoYWRvd1JhZGl1cyBhcyBudW1iZXIsXG4gICAgICAgIHJhc3Rlcml6ZTogdGhpcy5yYXN0ZXJpemUsXG4gICAgICAgIHVzZVNoYWRvd1BhdGg6IHRoaXMudXNlU2hhZG93UGF0aFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplQ29tbW9uRGF0YSgpIHtcbiAgICBjb25zdCB0U2hhZG93ID0gdHlwZW9mIHRoaXMuc2hhZG93O1xuICAgIGlmICgodFNoYWRvdyA9PT0gJ3N0cmluZycgfHwgdFNoYWRvdyA9PT0gJ251bWJlcicpICYmICF0aGlzLmVsZXZhdGlvbikge1xuICAgICAgdGhpcy5lbGV2YXRpb24gPSB0aGlzLnNoYWRvdyA/IHBhcnNlSW50KHRoaXMuc2hhZG93IGFzIHN0cmluZywgMTApIDogMjtcbiAgICB9XG4gICAgY29uc3QgdEVsZXZhdGlvbiA9IHR5cGVvZiB0aGlzLmVsZXZhdGlvbjtcbiAgICBpZiAodEVsZXZhdGlvbiA9PT0gJ3N0cmluZycgfHwgdEVsZXZhdGlvbiA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuZWxldmF0aW9uID0gdGhpcy5lbGV2YXRpb25cbiAgICAgICAgPyBwYXJzZUludCh0aGlzLmVsZXZhdGlvbiBhcyBzdHJpbmcsIDEwKVxuICAgICAgICA6IDI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplQW5kcm9pZERhdGEoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvcm5lclJhZGl1cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuY29ybmVyUmFkaXVzID0gcGFyc2VJbnQodGhpcy5jb3JuZXJSYWRpdXMsIDEwKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRyYW5zbGF0aW9uWiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25aID0gcGFyc2VJbnQodGhpcy50cmFuc2xhdGlvblosIDEwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVJT1NEYXRhKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zaGFkb3dPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnNoYWRvd09mZnNldCA9IHBhcnNlRmxvYXQodGhpcy5zaGFkb3dPZmZzZXQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuc2hhZG93T3BhY2l0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuc2hhZG93T3BhY2l0eSA9IHBhcnNlRmxvYXQodGhpcy5zaGFkb3dPcGFjaXR5KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNoYWRvd1JhZGl1cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuc2hhZG93UmFkaXVzID0gcGFyc2VGbG9hdCh0aGlzLnNoYWRvd1JhZGl1cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRnJvbUFuZHJvaWREYXRhKGRhdGE6IEFuZHJvaWREYXRhKSB7XG4gICAgdGhpcy5lbGV2YXRpb24gPSBkYXRhLmVsZXZhdGlvbiB8fCB0aGlzLmVsZXZhdGlvbjtcbiAgICB0aGlzLnNoYXBlID0gZGF0YS5zaGFwZSB8fCB0aGlzLnNoYXBlO1xuICAgIHRoaXMuYmdjb2xvciA9IGRhdGEuYmdjb2xvciB8fCB0aGlzLmJnY29sb3I7XG4gICAgdGhpcy5jb3JuZXJSYWRpdXMgPSBkYXRhLmNvcm5lclJhZGl1cyB8fCB0aGlzLmNvcm5lclJhZGl1cztcbiAgICB0aGlzLnRyYW5zbGF0aW9uWiA9IGRhdGEudHJhbnNsYXRpb25aIHx8IHRoaXMudHJhbnNsYXRpb25aO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRnJvbUlPU0RhdGEoZGF0YTogSU9TRGF0YSkge1xuICAgIHRoaXMubWFza1RvQm91bmRzID0gZGF0YS5tYXNrVG9Cb3VuZHMgfHwgdGhpcy5tYXNrVG9Cb3VuZHM7XG4gICAgdGhpcy5zaGFkb3dDb2xvciA9IGRhdGEuc2hhZG93Q29sb3IgfHwgdGhpcy5zaGFkb3dDb2xvcjtcbiAgICB0aGlzLnNoYWRvd09mZnNldCA9IGRhdGEuc2hhZG93T2Zmc2V0IHx8IHRoaXMuc2hhZG93T2Zmc2V0O1xuICAgIHRoaXMuc2hhZG93T3BhY2l0eSA9IGRhdGEuc2hhZG93T3BhY2l0eSB8fCB0aGlzLnNoYWRvd09wYWNpdHk7XG4gICAgdGhpcy5zaGFkb3dSYWRpdXMgPSBkYXRhLnNoYWRvd1JhZGl1cyB8fCB0aGlzLnNoYWRvd1JhZGl1cztcbiAgICB0aGlzLnJhc3Rlcml6ZSA9IGRhdGEucmFzdGVyaXplIHx8IHRoaXMucmFzdGVyaXplO1xuICAgIHRoaXMudXNlU2hhZG93UGF0aCA9IGRhdGEudXNlU2hhZG93UGF0aCB8fCB0aGlzLnVzZVNoYWRvd1BhdGg7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5hdGl2ZVNoYWRvd0RpcmVjdGl2ZSB9IGZyb20gJy4vbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbmctc2hhZG93LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOYXRpdmVTaGFkb3dEaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOYXRpdmVTaGFkb3dEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG59KVxuZXhwb3J0IGNsYXNzIE5nU2hhZG93TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuL3NoYXBlLmVudW0nO1xuXG5leHBvcnQgY2xhc3MgQW5kcm9pZERhdGEge1xuICBlbGV2YXRpb246IG51bWJlcjtcbiAgcHJlc3NlZEVsZXZhdGlvbj86IG51bWJlcjtcbiAgc2hhcGU/OiBTaGFwZTtcbiAgYmdjb2xvcj86IHN0cmluZztcbiAgY29ybmVyUmFkaXVzPzogbnVtYmVyO1xuICB0cmFuc2xhdGlvblo/OiBudW1iZXI7XG4gIHByZXNzZWRUcmFuc2xhdGlvblo/OiBudW1iZXI7XG4gIGZvcmNlUHJlc3NBbmltYXRpb24/OiBib29sZWFuO1xufVxuIiwiZXhwb3J0IGNsYXNzIElPU0RhdGEge1xuICBlbGV2YXRpb246IG51bWJlcjtcbiAgbWFza1RvQm91bmRzPzogYm9vbGVhbjtcbiAgc2hhZG93Q29sb3I/OiBzdHJpbmc7XG4gIHNoYWRvd09mZnNldD86IG51bWJlcjtcbiAgc2hhZG93T3BhY2l0eT86IG51bWJlcjtcbiAgc2hhZG93UmFkaXVzPzogbnVtYmVyO1xuICByYXN0ZXJpemU/OiBib29sZWFuO1xuICB1c2VTaGFkb3dQYXRoPzogYm9vbGVhbjtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztlQUVjLFdBQVc7VUFDaEIsTUFBTTtVQUNOLE1BQU07VUFDTixNQUFNOzs7Ozs7O0FDTGYsQUFlQSxxQkFBSSxhQUFhLENBQUM7QUFDbEIscUJBQUksV0FBVyxDQUFDO0FBRWhCLElBQUksU0FBUyxFQUFFO0lBQ2IsYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkUsV0FBVyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyRTs7Ozs7Ozs7O0lBU1EsWUFBSzs7Ozs7SUFBWixVQUFhLE9BQVksRUFBRSxJQUEyQjtRQUNwRCxxQkFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQ0UsT0FBTyxDQUFDLE9BQU87WUFDZixPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLFFBQ3RDLEVBQUU7WUFDQSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDMUQ7YUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDdEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0tBQ0Y7Ozs7O0lBRWMsa0JBQVc7Ozs7Y0FBQyxJQUEyQjtRQUNwRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQ2xCLEVBQUUsRUFDRixJQUFJLEVBQ0o7WUFDRSxLQUFLLEVBQUUsbUJBQUMsSUFBbUIsR0FBRSxLQUFLLElBQUksTUFBTSxDQUFDLGFBQWE7WUFDMUQsZ0JBQWdC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