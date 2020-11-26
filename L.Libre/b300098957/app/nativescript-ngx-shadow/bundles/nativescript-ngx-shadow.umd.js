(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tns-core-modules/color'), require('tns-core-modules/ui/page/page'), require('tns-core-modules/platform'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('nativescript-ngx-shadow', ['exports', 'tns-core-modules/color', 'tns-core-modules/ui/page/page', 'tns-core-modules/platform', '@angular/core'], factory) :
    (factory((global['nativescript-ngx-shadow'] = {}),null,null,null,global.ng.core));
}(this, (function (exports,color,page,platform,core) { 'use strict';

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
    if (platform.isAndroid) {
        LayeredShadow = android.graphics.drawable.LayerDrawable.extend({});
        PlainShadow = android.graphics.drawable.GradientDrawable.extend({});
    }
    var Shadow = (function () {
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
                    shape: ((data)).shape || Shadow.DEFAULT_SHAPE,
                    pressedElevation: ((data)).pressedElevation || Shadow.DEFAULT_PRESSED_ELEVATION,
                    pressedTranslationZ: ((data)).pressedTranslationZ || Shadow.DEFAULT_PRESSED_ELEVATION,
                    shadowColor: ((data)).shadowColor ||
                        Shadow.DEFAULT_SHADOW_COLOR,
                    useShadowPath: (((data)).useShadowPath !== undefined ? ((data)).useShadowPath : true),
                    rasterize: (((data)).rasterize !== undefined ? ((data)).rasterize : false)
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
                        outerRadii[0] = outerRadii[1] = page.Length.toDevicePixels(tnsView.borderTopLeftRadius, 0);
                        outerRadii[2] = outerRadii[3] = page.Length.toDevicePixels(tnsView.borderTopRightRadius, 0);
                        outerRadii[4] = outerRadii[5] = page.Length.toDevicePixels(tnsView.borderBottomRightRadius, 0);
                        outerRadii[6] = outerRadii[7] = page.Length.toDevicePixels(tnsView.borderBottomLeftRadius, 0);
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
                var /** @type {?} */ elevation = parseFloat((((data.elevation)) - 0).toFixed(2));
                nativeView.layer.maskToBounds = false;
                nativeView.layer.shadowColor = new color.Color(data.shadowColor).ios.CGColor;
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
                nativeView.layer.rasterizationScale = platform.screen.mainScreen.scale;
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
    var NativeShadowDirective = (function () {
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
            if (platform.isAndroid) {
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
                if (platform.isAndroid) {
                    this.initializeAndroidData();
                }
                else if (platform.isIOS) {
                    this.initializeIOSData();
                }
                if (this.shadow && ((this.shadow)).elevation) {
                    if (platform.isAndroid) {
                        this.loadFromAndroidData(/** @type {?} */ (this.shadow));
                    }
                    else if (platform.isIOS) {
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
                if (platform.isAndroid) {
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
                if (platform.isIOS) {
                    var /** @type {?} */ originalElement = (this.el.nativeElement);
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
                if (platform.isAndroid) {
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
                        if (platform.isAndroid) {
                            this.loadFromAndroidData(/** @type {?} */ (this.shadow));
                        }
                        else if (platform.isIOS) {
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
                if (platform.isAndroid) {
                    if (android.os.Build.VERSION.SDK_INT < 21) {
                        return;
                    }
                }
                var /** @type {?} */ viewToApplyShadowTo = platform.isIOS
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
            { type: core.Directive, args: [{ selector: '[shadow]' },] },
        ];
        /** @nocollapse */
        NativeShadowDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        NativeShadowDirective.propDecorators = {
            shadow: [{ type: core.Input }],
            elevation: [{ type: core.Input }],
            pressedElevation: [{ type: core.Input }],
            shape: [{ type: core.Input }],
            bgcolor: [{ type: core.Input }],
            cornerRadius: [{ type: core.Input }],
            translationZ: [{ type: core.Input }],
            pressedTranslationZ: [{ type: core.Input }],
            forcePressAnimation: [{ type: core.Input }],
            maskToBounds: [{ type: core.Input }],
            shadowColor: [{ type: core.Input }],
            shadowOffset: [{ type: core.Input }],
            shadowOpacity: [{ type: core.Input }],
            shadowRadius: [{ type: core.Input }],
            useShadowPath: [{ type: core.Input }],
            rasterize: [{ type: core.Input }],
            onLoaded: [{ type: core.HostListener, args: ['loaded',] }],
            onUnloaded: [{ type: core.HostListener, args: ['unloaded',] }]
        };
        return NativeShadowDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgShadowModule = (function () {
        function NgShadowModule() {
        }
        NgShadowModule.decorators = [
            { type: core.NgModule, args: [{
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
    var AndroidData = (function () {
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
    var IOSData = (function () {
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

    exports.NgShadowModule = NgShadowModule;
    exports.AndroidData = AndroidData;
    exports.Elevation = Elevation;
    exports.IOSData = IOSData;
    exports.Shadow = Shadow;
    exports.ShapeEnum = ShapeEnum;
    exports.ɵa = NativeShadowDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LW5neC1zaGFkb3cudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9uYXRpdmVzY3JpcHQtbmd4LXNoYWRvdy9jb21tb24vc2hhcGUuZW51bS50cyIsIm5nOi8vbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvY29tbW9uL3NoYWRvdy50cyIsIm5nOi8vbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbmctc2hhZG93LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbGliLm1vZHVsZS50cyIsIm5nOi8vbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvY29tbW9uL2FuZHJvaWQtZGF0YS5tb2RlbC50cyIsIm5nOi8vbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvbmF0aXZlc2NyaXB0LW5neC1zaGFkb3cvY29tbW9uL2lvcy1kYXRhLm1vZGVsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGVudW0gU2hhcGVFbnVtIHtcbiAgUkVDVEFOR0xFID0gJ1JFQ1RBTkdMRScsXG4gIE9WQUwgPSAnT1ZBTCcsXG4gIFJJTkcgPSAnUklORycsXG4gIExJTkUgPSAnTElORScsXG59XG5cbmV4cG9ydCB0eXBlIFNoYXBlID0gJ1JFQ1RBTkdMRScgfCAnT1ZBTCcgfCAnUklORycgfCAnTElORSc7XG4iLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3InO1xuXG5pbXBvcnQgeyBBbmRyb2lkRGF0YSB9IGZyb20gXCIuL2FuZHJvaWQtZGF0YS5tb2RlbFwiO1xuaW1wb3J0IHsgSU9TRGF0YSB9IGZyb20gXCIuL2lvcy1kYXRhLm1vZGVsXCI7XG5pbXBvcnQgeyBTaGFwZUVudW0gfSBmcm9tICcuL3NoYXBlLmVudW0nO1xuaW1wb3J0IHsgTGVuZ3RoIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgaXNBbmRyb2lkLCBzY3JlZW4gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuXG5kZWNsYXJlIGNvbnN0IGFuZHJvaWQ6IGFueTtcbmRlY2xhcmUgY29uc3QgamF2YTogYW55O1xuZGVjbGFyZSBjb25zdCBDR1NpemVNYWtlOiBhbnk7XG5kZWNsYXJlIGNvbnN0IFVJU2NyZWVuOiBhbnk7XG5kZWNsYXJlIGNvbnN0IEFycmF5OiBhbnk7XG5kZWNsYXJlIGNvbnN0IFVJQmV6aWVyUGF0aDogYW55O1xuXG5sZXQgTGF5ZXJlZFNoYWRvdztcbmxldCBQbGFpblNoYWRvdztcblxuaWYgKGlzQW5kcm9pZCkge1xuICBMYXllcmVkU2hhZG93ID0gYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5MYXllckRyYXdhYmxlLmV4dGVuZCh7fSk7XG4gIFBsYWluU2hhZG93ID0gYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5HcmFkaWVudERyYXdhYmxlLmV4dGVuZCh7fSk7XG59XG5cbmV4cG9ydCBjbGFzcyBTaGFkb3cge1xuICBzdGF0aWMgREVGQVVMVF9TSEFQRSA9IFNoYXBlRW51bS5SRUNUQU5HTEU7XG4gIHN0YXRpYyBERUZBVUxUX0JHQ09MT1IgPSAnI0ZGRkZGRic7XG4gIHN0YXRpYyBERUZBVUxUX1NIQURPV19DT0xPUiA9ICcjMDAwMDAwJztcbiAgc3RhdGljIERFRkFVTFRfUFJFU1NFRF9FTEVWQVRJT04gPSAyO1xuICBzdGF0aWMgREVGQVVMVF9QUkVTU0VEX1ogPSA0O1xuXG4gIHN0YXRpYyBhcHBseSh0bnNWaWV3OiBhbnksIGRhdGE6IElPU0RhdGEgfCBBbmRyb2lkRGF0YSkge1xuICAgIGNvbnN0IExPTExJUE9QID0gMjE7XG4gICAgaWYgKFxuICAgICAgdG5zVmlldy5hbmRyb2lkICYmXG4gICAgICBhbmRyb2lkLm9zLkJ1aWxkLlZFUlNJT04uU0RLX0lOVCA+PSBMT0xMSVBPUFxuICAgICkge1xuICAgICAgU2hhZG93LmFwcGx5T25BbmRyb2lkKHRuc1ZpZXcsIFNoYWRvdy5nZXREZWZhdWx0cyhkYXRhKSk7XG4gICAgfSBlbHNlIGlmICh0bnNWaWV3Lmlvcykge1xuICAgICAgU2hhZG93LmFwcGx5T25JT1ModG5zVmlldywgU2hhZG93LmdldERlZmF1bHRzKGRhdGEpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXREZWZhdWx0cyhkYXRhOiBJT1NEYXRhIHwgQW5kcm9pZERhdGEpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgZGF0YSxcbiAgICAgIHtcbiAgICAgICAgc2hhcGU6IChkYXRhIGFzIEFuZHJvaWREYXRhKS5zaGFwZSB8fCBTaGFkb3cuREVGQVVMVF9TSEFQRSxcbiAgICAgICAgcHJlc3NlZEVsZXZhdGlvbjogKGRhdGEgYXMgQW5kcm9pZERhdGEpLnByZXNzZWRFbGV2YXRpb24gfHwgU2hhZG93LkRFRkFVTFRfUFJFU1NFRF9FTEVWQVRJT04sXG4gICAgICAgIHByZXNzZWRUcmFuc2xhdGlvblo6IChkYXRhIGFzIEFuZHJvaWREYXRhKS5wcmVzc2VkVHJhbnNsYXRpb25aIHx8IFNoYWRvdy5ERUZBVUxUX1BSRVNTRURfRUxFVkFUSU9OLFxuICAgICAgICBzaGFkb3dDb2xvcjogKGRhdGEgYXMgSU9TRGF0YSkuc2hhZG93Q29sb3IgfHxcbiAgICAgICAgICBTaGFkb3cuREVGQVVMVF9TSEFET1dfQ09MT1IsXG4gICAgICAgIHVzZVNoYWRvd1BhdGg6ICgoZGF0YSBhcyBJT1NEYXRhKS51c2VTaGFkb3dQYXRoICE9PSB1bmRlZmluZWQgPyAoZGF0YSBhcyBJT1NEYXRhKS51c2VTaGFkb3dQYXRoIDogdHJ1ZSksXG4gICAgICAgIHJhc3Rlcml6ZTogKChkYXRhIGFzIElPU0RhdGEpLnJhc3Rlcml6ZSAhPT0gdW5kZWZpbmVkID8gKGRhdGEgYXMgSU9TRGF0YSkucmFzdGVyaXplIDogZmFsc2UpXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBpc1NoYWRvdyhkcmF3YWJsZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChkcmF3YWJsZSBpbnN0YW5jZW9mIExheWVyZWRTaGFkb3cgfHwgZHJhd2FibGUgaW5zdGFuY2VvZiBQbGFpblNoYWRvdyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhcHBseU9uQW5kcm9pZCh0bnNWaWV3OiBhbnksIGRhdGE6IEFuZHJvaWREYXRhKSB7XG4gICAgY29uc3QgbmF0aXZlVmlldyA9IHRuc1ZpZXcuYW5kcm9pZDtcbiAgICBsZXQgc2hhcGU7XG4gICAgbGV0IG92ZXJyaWRlQmFja2dyb3VuZCA9IHRydWU7XG5cblxuICAgIGxldCBjdXJyZW50QmcgPSBuYXRpdmVWaWV3LmdldEJhY2tncm91bmQoKTtcblxuICAgIGlmIChjdXJyZW50QmcgaW5zdGFuY2VvZiBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLlJpcHBsZURyYXdhYmxlKSB7IC8vIHBsYXkgbmljZSBpZiBhIHJpcHBsZSBpcyB3cmFwcGluZyBhIHNoYWRvd1xuICAgICAgbGV0IHJpcHBsZUJnID0gY3VycmVudEJnLmdldERyYXdhYmxlKDApO1xuICAgICAgaWYgKHJpcHBsZUJnIGluc3RhbmNlb2YgYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5JbnNldERyYXdhYmxlKSB7XG4gICAgICAgIG92ZXJyaWRlQmFja2dyb3VuZCA9IGZhbHNlOyAvLyB0aGlzIGlzIGEgYnV0dG9uIHdpdGggaXQncyBvd24gc2hhZG93XG4gICAgICB9IGVsc2UgaWYgKFNoYWRvdy5pc1NoYWRvdyhyaXBwbGVCZykpIHsgLy8gaWYgdGhlIHJpcHBsZSBpcyB3cmFwcGluZyBhIHNoYWRvdywgc3RyaXAgaXRcbiAgICAgICAgY3VycmVudEJnID0gcmlwcGxlQmc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvdmVycmlkZUJhY2tncm91bmQpIHtcbiAgICAgIGlmIChTaGFkb3cuaXNTaGFkb3coY3VycmVudEJnKSkgeyAvLyBtYWtlIHN1cmUgdG8gaGF2ZSB0aGUgcmlnaHQgYmFja2dyb3VuZFxuICAgICAgICBjdXJyZW50QmcgPSBjdXJyZW50QmcgaW5zdGFuY2VvZiBMYXllcmVkU2hhZG93ID8gLy8gaWYgbGF5ZXJlZCwgZ2V0IHRoZSBvcmlnaW5hbCBiYWNrZ3JvdW5kXG4gICAgICAgICAgY3VycmVudEJnLmdldERyYXdhYmxlKDEpIDogbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3V0ZXJSYWRpaSA9IEFycmF5LmNyZWF0ZShcImZsb2F0XCIsIDgpO1xuICAgICAgaWYgKGRhdGEuY29ybmVyUmFkaXVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3V0ZXJSYWRpaVswXSA9IG91dGVyUmFkaWlbMV0gPSBMZW5ndGgudG9EZXZpY2VQaXhlbHModG5zVmlldy5ib3JkZXJUb3BMZWZ0UmFkaXVzLCAwKTtcbiAgICAgICAgb3V0ZXJSYWRpaVsyXSA9IG91dGVyUmFkaWlbM10gPSBMZW5ndGgudG9EZXZpY2VQaXhlbHModG5zVmlldy5ib3JkZXJUb3BSaWdodFJhZGl1cywgMCk7XG4gICAgICAgIG91dGVyUmFkaWlbNF0gPSBvdXRlclJhZGlpWzVdID0gTGVuZ3RoLnRvRGV2aWNlUGl4ZWxzKHRuc1ZpZXcuYm9yZGVyQm90dG9tUmlnaHRSYWRpdXMsIDApO1xuICAgICAgICBvdXRlclJhZGlpWzZdID0gb3V0ZXJSYWRpaVs3XSA9IExlbmd0aC50b0RldmljZVBpeGVscyh0bnNWaWV3LmJvcmRlckJvdHRvbUxlZnRSYWRpdXMsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgamF2YS51dGlsLkFycmF5cy5maWxsKG91dGVyUmFkaWksIFNoYWRvdy5hbmRyb2lkRGlwVG9QeChuYXRpdmVWaWV3LCBkYXRhLmNvcm5lclJhZGl1cyBhcyBudW1iZXIpKTtcbiAgICAgIH1cblxuICAgICAgLy8gdXNlIHRoZSB1c2VyIGRlZmluZWQgY29sb3Igb3IgdGhlIGRlZmF1bHQgaW4gY2FzZSB0aGUgY29sb3IgaXMgVFJBTlNQQVJFTlRcbiAgICAgIGNvbnN0IGJnQ29sb3IgPSBjdXJyZW50QmcgP1xuICAgICAgICAoY3VycmVudEJnIGluc3RhbmNlb2YgYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5Db2xvckRyYXdhYmxlICYmIGN1cnJlbnRCZy5nZXRDb2xvcigpID9cbiAgICAgICAgICBjdXJyZW50QmcuZ2V0Q29sb3IoKSA6IGFuZHJvaWQuZ3JhcGhpY3MuQ29sb3IucGFyc2VDb2xvcihkYXRhLmJnY29sb3IgfHwgU2hhZG93LkRFRkFVTFRfQkdDT0xPUikpIDpcbiAgICAgICAgYW5kcm9pZC5ncmFwaGljcy5Db2xvci5wYXJzZUNvbG9yKGRhdGEuYmdjb2xvciB8fCBTaGFkb3cuREVGQVVMVF9CR0NPTE9SKTtcblxuICAgICAgbGV0IG5ld0JnO1xuXG4gICAgICBpZiAoZGF0YS5zaGFwZSAhPT0gU2hhcGVFbnVtLlJFQ1RBTkdMRSB8fCBkYXRhLmJnY29sb3IgfHwgIWN1cnJlbnRCZykgeyAvLyByZXBsYWNlIGJhY2tncm91bmRcbiAgICAgICAgc2hhcGUgPSBuZXcgUGxhaW5TaGFkb3coKTtcbiAgICAgICAgc2hhcGUuc2V0U2hhcGUoXG4gICAgICAgICAgYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5HcmFkaWVudERyYXdhYmxlW2RhdGEuc2hhcGVdLFxuICAgICAgICApO1xuICAgICAgICBzaGFwZS5zZXRDb3JuZXJSYWRpaShvdXRlclJhZGlpKTtcbiAgICAgICAgc2hhcGUuc2V0Q29sb3IoYmdDb2xvcik7XG4gICAgICAgIG5ld0JnID0gc2hhcGU7XG4gICAgICB9IGVsc2UgeyAvLyBhZGQgYSBsYXllclxuICAgICAgICBjb25zdCByID0gbmV3IGFuZHJvaWQuZ3JhcGhpY3MuZHJhd2FibGUuc2hhcGVzLlJvdW5kUmVjdFNoYXBlKG91dGVyUmFkaWksIG51bGwsIG51bGwpO1xuICAgICAgICBzaGFwZSA9IG5ldyBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLlNoYXBlRHJhd2FibGUocik7XG4gICAgICAgIHNoYXBlLmdldFBhaW50KCkuc2V0Q29sb3IoYmdDb2xvcik7XG4gICAgICAgIHZhciBhcnIgPSBBcnJheS5jcmVhdGUoYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5EcmF3YWJsZSwgMik7XG4gICAgICAgIGFyclswXSA9IHNoYXBlO1xuICAgICAgICBhcnJbMV0gPSBjdXJyZW50Qmc7XG4gICAgICAgIGNvbnN0IGRyYXdhYmxlID0gbmV3IExheWVyZWRTaGFkb3coYXJyKTtcbiAgICAgICAgbmV3QmcgPSBkcmF3YWJsZTtcbiAgICAgIH1cblxuICAgICAgbmF0aXZlVmlldy5zZXRCYWNrZ3JvdW5kRHJhd2FibGUobmV3QmcpO1xuICAgIH1cblxuICAgIG5hdGl2ZVZpZXcuc2V0RWxldmF0aW9uKFxuICAgICAgU2hhZG93LmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEuZWxldmF0aW9uIGFzIG51bWJlciksXG4gICAgKTtcbiAgICBuYXRpdmVWaWV3LnNldFRyYW5zbGF0aW9uWihcbiAgICAgIFNoYWRvdy5hbmRyb2lkRGlwVG9QeChuYXRpdmVWaWV3LCBkYXRhLnRyYW5zbGF0aW9uWiBhcyBudW1iZXIpLFxuICAgICk7XG4gICAgaWYgKG5hdGl2ZVZpZXcuZ2V0U3RhdGVMaXN0QW5pbWF0b3IoKSB8fCBkYXRhLmZvcmNlUHJlc3NBbmltYXRpb24pIHtcbiAgICAgIHRoaXMub3ZlcnJpZGVEZWZhdWx0QW5pbWF0b3IobmF0aXZlVmlldywgZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgb3ZlcnJpZGVEZWZhdWx0QW5pbWF0b3IobmF0aXZlVmlldzogYW55LCBkYXRhOiBBbmRyb2lkRGF0YSkge1xuICAgIGNvbnN0IHNsYSA9IG5ldyBhbmRyb2lkLmFuaW1hdGlvbi5TdGF0ZUxpc3RBbmltYXRvcigpO1xuXG4gICAgY29uc3QgT2JqZWN0QW5pbWF0b3IgPSBhbmRyb2lkLmFuaW1hdGlvbi5PYmplY3RBbmltYXRvcjtcbiAgICBjb25zdCBBbmltYXRvclNldCA9IGFuZHJvaWQuYW5pbWF0aW9uLkFuaW1hdG9yU2V0O1xuICAgIGNvbnN0IHNob3J0QW5pbVRpbWUgPSBhbmRyb2lkLlIuaW50ZWdlci5jb25maWdfc2hvcnRBbmltVGltZTtcblxuICAgIGNvbnN0IGJ1dHRvbkR1cmF0aW9uID1cbiAgICAgIG5hdGl2ZVZpZXcuZ2V0Q29udGV4dCgpLmdldFJlc291cmNlcygpLmdldEludGVnZXIoc2hvcnRBbmltVGltZSkgLyAyO1xuICAgIGNvbnN0IHByZXNzZWRFbGV2YXRpb24gPSB0aGlzLmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEucHJlc3NlZEVsZXZhdGlvbik7XG4gICAgY29uc3QgcHJlc3NlZFogPSB0aGlzLmFuZHJvaWREaXBUb1B4KG5hdGl2ZVZpZXcsIGRhdGEucHJlc3NlZFRyYW5zbGF0aW9uWik7XG4gICAgY29uc3QgZWxldmF0aW9uID0gdGhpcy5hbmRyb2lkRGlwVG9QeChuYXRpdmVWaWV3LCBkYXRhLmVsZXZhdGlvbik7XG4gICAgY29uc3QgeiA9IHRoaXMuYW5kcm9pZERpcFRvUHgobmF0aXZlVmlldywgZGF0YS50cmFuc2xhdGlvblogfHwgMCk7XG5cbiAgICBjb25zdCBwcmVzc2VkU2V0ID0gbmV3IEFuaW1hdG9yU2V0KCk7XG4gICAgY29uc3Qgbm90UHJlc3NlZFNldCA9IG5ldyBBbmltYXRvclNldCgpO1xuICAgIGNvbnN0IGRlZmF1bHRTZXQgPSBuZXcgQW5pbWF0b3JTZXQoKTtcblxuICAgIHByZXNzZWRTZXQucGxheVRvZ2V0aGVyKGphdmEudXRpbC5BcnJheXMuYXNMaXN0KFtcbiAgICAgIE9iamVjdEFuaW1hdG9yLm9mRmxvYXQobmF0aXZlVmlldywgXCJ0cmFuc2xhdGlvblpcIiwgW3ByZXNzZWRaXSlcbiAgICAgICAgLnNldER1cmF0aW9uKGJ1dHRvbkR1cmF0aW9uKSxcbiAgICAgIE9iamVjdEFuaW1hdG9yLm9mRmxvYXQobmF0aXZlVmlldywgXCJlbGV2YXRpb25cIiwgW3ByZXNzZWRFbGV2YXRpb25dKVxuICAgICAgICAuc2V0RHVyYXRpb24oMCksXG4gICAgXSkpO1xuICAgIG5vdFByZXNzZWRTZXQucGxheVRvZ2V0aGVyKGphdmEudXRpbC5BcnJheXMuYXNMaXN0KFtcbiAgICAgIE9iamVjdEFuaW1hdG9yLm9mRmxvYXQobmF0aXZlVmlldywgXCJ0cmFuc2xhdGlvblpcIiwgW3pdKVxuICAgICAgICAuc2V0RHVyYXRpb24oYnV0dG9uRHVyYXRpb24pLFxuICAgICAgT2JqZWN0QW5pbWF0b3Iub2ZGbG9hdChuYXRpdmVWaWV3LCBcImVsZXZhdGlvblwiLCBbZWxldmF0aW9uXSlcbiAgICAgICAgLnNldER1cmF0aW9uKDApLFxuICAgIF0pKTtcbiAgICBkZWZhdWx0U2V0LnBsYXlUb2dldGhlcihqYXZhLnV0aWwuQXJyYXlzLmFzTGlzdChbXG4gICAgICBPYmplY3RBbmltYXRvci5vZkZsb2F0KG5hdGl2ZVZpZXcsIFwidHJhbnNsYXRpb25aXCIsIFswXSkuc2V0RHVyYXRpb24oMCksXG4gICAgICBPYmplY3RBbmltYXRvci5vZkZsb2F0KG5hdGl2ZVZpZXcsIFwiZWxldmF0aW9uXCIsIFswXSkuc2V0RHVyYXRpb24oMCksXG4gICAgXSkpO1xuXG4gICAgc2xhLmFkZFN0YXRlKFxuICAgICAgW2FuZHJvaWQuUi5hdHRyLnN0YXRlX3ByZXNzZWQsIGFuZHJvaWQuUi5hdHRyLnN0YXRlX2VuYWJsZWRdLFxuICAgICAgcHJlc3NlZFNldCxcbiAgICApO1xuICAgIHNsYS5hZGRTdGF0ZShbYW5kcm9pZC5SLmF0dHIuc3RhdGVfZW5hYmxlZF0sIG5vdFByZXNzZWRTZXQpO1xuICAgIHNsYS5hZGRTdGF0ZShbXSwgZGVmYXVsdFNldCk7XG4gICAgbmF0aXZlVmlldy5zZXRTdGF0ZUxpc3RBbmltYXRvcihzbGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYXBwbHlPbklPUyh0bnNWaWV3OiBhbnksIGRhdGE6IElPU0RhdGEpIHtcbiAgICBjb25zdCBuYXRpdmVWaWV3ID0gdG5zVmlldy5pb3M7XG4gICAgY29uc3QgZWxldmF0aW9uID0gcGFyc2VGbG9hdCgoKGRhdGEuZWxldmF0aW9uIGFzIG51bWJlcikgLSAwKS50b0ZpeGVkKDIpKTtcbiAgICBuYXRpdmVWaWV3LmxheWVyLm1hc2tUb0JvdW5kcyA9IGZhbHNlO1xuICAgIG5hdGl2ZVZpZXcubGF5ZXIuc2hhZG93Q29sb3IgPSBuZXcgQ29sb3IoZGF0YS5zaGFkb3dDb2xvcikuaW9zLkNHQ29sb3I7XG4gICAgbmF0aXZlVmlldy5sYXllci5zaGFkb3dPZmZzZXQgPVxuICAgICAgZGF0YS5zaGFkb3dPZmZzZXQgP1xuICAgICAgICBDR1NpemVNYWtlKDAsIHBhcnNlRmxvYXQoU3RyaW5nKGRhdGEuc2hhZG93T2Zmc2V0KSkpIDpcbiAgICAgICAgQ0dTaXplTWFrZSgwLCAwLjU0ICogZWxldmF0aW9uIC0gMC4xNCk7XG4gICAgbmF0aXZlVmlldy5sYXllci5zaGFkb3dPcGFjaXR5ID1cbiAgICAgIGRhdGEuc2hhZG93T3BhY2l0eSA/XG4gICAgICAgIHBhcnNlRmxvYXQoU3RyaW5nKGRhdGEuc2hhZG93T3BhY2l0eSkpIDpcbiAgICAgICAgMC4wMDYgKiBlbGV2YXRpb24gKyAwLjI1O1xuICAgIG5hdGl2ZVZpZXcubGF5ZXIuc2hhZG93UmFkaXVzID1cbiAgICAgIGRhdGEuc2hhZG93UmFkaXVzID9cbiAgICAgICAgcGFyc2VGbG9hdChTdHJpbmcoZGF0YS5zaGFkb3dSYWRpdXMpKSA6XG4gICAgICAgIDAuNjYgKiBlbGV2YXRpb24gLSAwLjU7XG4gICAgbmF0aXZlVmlldy5sYXllci5zaG91bGRSYXN0ZXJpemUgPSBkYXRhLnJhc3Rlcml6ZTtcbiAgICBuYXRpdmVWaWV3LmxheWVyLnJhc3Rlcml6YXRpb25TY2FsZSA9IHNjcmVlbi5tYWluU2NyZWVuLnNjYWxlO1xuICAgIGxldCBzaGFkb3dQYXRoID0gbnVsbDtcbiAgICBpZihkYXRhLnVzZVNoYWRvd1BhdGgpIHtcbiAgICAgIHNoYWRvd1BhdGggPSBVSUJlemllclBhdGguYmV6aWVyUGF0aFdpdGhSb3VuZGVkUmVjdENvcm5lclJhZGl1cyhuYXRpdmVWaWV3LmJvdW5kcywgbmF0aXZlVmlldy5sYXllci5zaGFkb3dSYWRpdXMpLmNnUGF0aDtcbiAgICB9XG4gICAgbmF0aXZlVmlldy5sYXllci5zaGFkb3dQYXRoID0gc2hhZG93UGF0aDtcbiAgfVxuXG4gIHN0YXRpYyBhbmRyb2lkRGlwVG9QeChuYXRpdmVWaWV3OiBhbnksIGRpcDogbnVtYmVyKSB7XG4gICAgY29uc3QgbWV0cmljcyA9IG5hdGl2ZVZpZXcuZ2V0Q29udGV4dCgpLmdldFJlc291cmNlcygpLmdldERpc3BsYXlNZXRyaWNzKCk7XG4gICAgcmV0dXJuIGFuZHJvaWQudXRpbC5UeXBlZFZhbHVlLmFwcGx5RGltZW5zaW9uKFxuICAgICAgYW5kcm9pZC51dGlsLlR5cGVkVmFsdWUuQ09NUExFWF9VTklUX0RJUCxcbiAgICAgIGRpcCxcbiAgICAgIG1ldHJpY3MsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBBZnRlclZpZXdJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0nO1xuXG5pbXBvcnQgeyBBbmRyb2lkRGF0YSB9IGZyb20gJy4vY29tbW9uL2FuZHJvaWQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBJT1NEYXRhIH0gZnJvbSAnLi9jb21tb24vaW9zLWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgU2hhZG93IH0gZnJvbSAnLi9jb21tb24vc2hhZG93JztcbmltcG9ydCB7IFNoYXBlLCBTaGFwZUVudW0gfSBmcm9tICcuL2NvbW1vbi9zaGFwZS5lbnVtJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQnO1xuZGVjbGFyZSBjb25zdCBhbmRyb2lkOiBhbnk7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tzaGFkb3ddJyB9KVxuZXhwb3J0IGNsYXNzIE5hdGl2ZVNoYWRvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgc2hhZG93OiBzdHJpbmcgfCBBbmRyb2lkRGF0YSB8IElPU0RhdGE7XG4gIEBJbnB1dCgpIGVsZXZhdGlvbj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgcHJlc3NlZEVsZXZhdGlvbj86IG51bWJlciB8IHN0cmluZztcbiAgQElucHV0KCkgc2hhcGU/OiBTaGFwZTtcbiAgQElucHV0KCkgYmdjb2xvcj86IHN0cmluZztcbiAgQElucHV0KCkgY29ybmVyUmFkaXVzPzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSB0cmFuc2xhdGlvblo/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHByZXNzZWRUcmFuc2xhdGlvblo/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvcmNlUHJlc3NBbmltYXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSBtYXNrVG9Cb3VuZHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBzaGFkb3dDb2xvcj86IHN0cmluZztcbiAgQElucHV0KCkgc2hhZG93T2Zmc2V0PzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBzaGFkb3dPcGFjaXR5PzogbnVtYmVyIHwgc3RyaW5nO1xuICBASW5wdXQoKSBzaGFkb3dSYWRpdXM/OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIHVzZVNoYWRvd1BhdGg/OiBib29sZWFuO1xuICBASW5wdXQoKSByYXN0ZXJpemU/OiBib29sZWFuO1xuXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBvcmlnaW5hbE5TRm46IGFueTtcbiAgcHJpdmF0ZSBwcmV2aW91c05TRm46IGFueTtcbiAgcHJpdmF0ZSBpb3NTaGFkb3dSYXBwZXI6IFZpZXc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMikge1xuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgIHRoaXMub3JpZ2luYWxOU0ZuID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Ll9yZWRyYXdOYXRpdmVCYWNrZ3JvdW5kOyAvL2Fsd2F5cyBzdG9yZSB0aGUgb3JpZ2luYWwgbWV0aG9kXG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQ29tbW9uRGF0YSgpO1xuICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUFuZHJvaWREYXRhKCk7XG4gICAgfSBlbHNlIGlmIChpc0lPUykge1xuICAgICAgdGhpcy5pbml0aWFsaXplSU9TRGF0YSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaGFkb3cgJiYgKHRoaXMuc2hhZG93IGFzIEFuZHJvaWREYXRhIHwgSU9TRGF0YSkuZWxldmF0aW9uKSB7XG4gICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgIHRoaXMubG9hZEZyb21BbmRyb2lkRGF0YSh0aGlzLnNoYWRvdyBhcyBBbmRyb2lkRGF0YSk7XG4gICAgICB9IGVsc2UgaWYgKGlzSU9TKSB7XG4gICAgICAgIHRoaXMubG9hZEZyb21JT1NEYXRhKHRoaXMuc2hhZG93IGFzIElPU0RhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFwcGx5U2hhZG93KCk7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdsb2FkZWQnKVxuICBvbkxvYWRlZCgpIHtcbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgLy8gV2VpcmRseSBuZ09uSW5pdCBpc24ndCBjYWxsZWQgb24gaU9TIG9uIGRlbW8gYXBwXG4gICAgLy8gTWFuYWdlZCB0byBnZXQgaXQgd29ya2luZyBvbiBpT1Mgd2hlbiBhcHBseWluZyB0b1xuICAgIC8vIEZsZXhib3hMYXlvdXQsIGJ1dCBvbiB0aGUgZGVtbyBhcHAsIHdlIGFwcGx5IHRvIGFcbiAgICAvLyBMYWJlbCwgYW5kLCBmb3IgdGhhdCBjYXNlLCBuZ09uSW5pdCBpc24ndCBjYWxsZWRcblxuICAgIC8vIFRoaXMgaXMganVzdCBlbmZvcmNpbmcgdGhlIERpcmVjdGl2ZSBpcyBpbml0aWFsaXplZFxuICAgIC8vIGJlZm9yZSBjYWxsaW5nIHRoaXMuYXBwbHlTaGFkb3coKVxuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5U2hhZG93KCk7XG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdGhpcy5wcmV2aW91c05TRm4gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuX3JlZHJhd05hdGl2ZUJhY2tncm91bmQ7IC8vIGp1c3QgdG8gbWFpbnRhaW4gY29tcGF0aWJpbGl0eSB3aXRoIG90aGVyIHBhdGNoZXNcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5fcmVkcmF3TmF0aXZlQmFja2dyb3VuZCA9IHRoaXMubW9ua2V5UGF0Y2g7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRJb3NXcmFwcGVyKCkge1xuICAgIGlmIChpc0lPUykge1xuICAgICAgY29uc3Qgb3JpZ2luYWxFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50IGFzIFZpZXc7XG5cbiAgICAgIHRoaXMuaW9zU2hhZG93UmFwcGVyID0gdGhpcy5yZW5kZXIuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ1N0YWNrTGF5b3V0J1xuICAgICAgKSBhcyBTdGFja0xheW91dDtcblxuICAgICAgLy8gd3JhcHBpbmdFbGVtZW50LmNzc0NsYXNzZXMgPSBtYWluRWxlbWVudC5jc3NDbGFzc2VzO1xuICAgICAgY29uc3QgcGFyZW50ID0gb3JpZ2luYWxFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB0aGlzLnJlbmRlci5pbnNlcnRCZWZvcmUocGFyZW50LCB0aGlzLmlvc1NoYWRvd1JhcHBlciwgb3JpZ2luYWxFbGVtZW50KTtcbiAgICAgIHRoaXMucmVuZGVyLnJlbW92ZUNoaWxkKHBhcmVudCwgb3JpZ2luYWxFbGVtZW50KTtcbiAgICAgIHRoaXMucmVuZGVyLmFwcGVuZENoaWxkKHRoaXMuaW9zU2hhZG93UmFwcGVyLCBvcmlnaW5hbEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3VubG9hZGVkJylcbiAgb25VbmxvYWRlZCgpIHtcbiAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50Ll9yZWRyYXdOYXRpdmVCYWNrZ3JvdW5kID0gdGhpcy5vcmlnaW5hbE5TRm47IC8vIGFsd2F5cyByZXZlcnQgdG8gdGhlIG9yaWdpbmFsIG1ldGhvZFxuICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5hZGRJb3NXcmFwcGVyKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5sb2FkZWQgJiZcbiAgICAgICEhY2hhbmdlcyAmJlxuICAgICAgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYWRvdycpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2VsZXZhdGlvbicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3ByZXNzZWRFbGV2YXRpb24nKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFwZScpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2JnY29sb3InKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdjb3JuZXJSYWRpdXMnKSB8fFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdwcmVzc2VkVHJhbnNsYXRpb25aJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZm9yY2VQcmVzc0FuaW1hdGlvbicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3RyYW5zbGF0aW9uWicpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ21hc2tUb0JvdW5kcycpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYWRvd0NvbG9yJykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93T2Zmc2V0JykgfHxcbiAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2hhZG93T3BhY2l0eScpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NoYWRvd1JhZGl1cycpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3Jhc3Rlcml6ZScpIHx8XG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3VzZVNoYWRvd01hcCcpKVxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzaGFkb3cnKSAmJlxuICAgICAgICAhY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZWxldmF0aW9uJykgJiZcbiAgICAgICAgdHlwZW9mIGNoYW5nZXMuc2hhZG93LmN1cnJlbnRWYWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICkge1xuICAgICAgICB0aGlzLmVsZXZhdGlvbiA9IGNoYW5nZXMuc2hhZG93LmN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLnNoYWRvdyAmJiBjaGFuZ2VzLnNoYWRvdy5jdXJyZW50VmFsdWUuZWxldmF0aW9uKSB7XG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICB0aGlzLmxvYWRGcm9tQW5kcm9pZERhdGEodGhpcy5zaGFkb3cgYXMgQW5kcm9pZERhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzSU9TKSB7XG4gICAgICAgICAgdGhpcy5sb2FkRnJvbUlPU0RhdGEodGhpcy5zaGFkb3cgYXMgSU9TRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwbHlTaGFkb3coKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vbmtleVBhdGNoID0gdmFsID0+IHtcbiAgICB0aGlzLnByZXZpb3VzTlNGbi5jYWxsKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdmFsKTtcbiAgICB0aGlzLmFwcGx5U2hhZG93KCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBhcHBseVNoYWRvdygpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnNoYWRvdyA9PT0gbnVsbCB8fFxuICAgICAgdGhpcy5zaGFkb3cgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgKHRoaXMuc2hhZG93ID09PSAnJyAmJiAhdGhpcy5lbGV2YXRpb24pXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRm9yIHNoYWRvd3MgdG8gYmUgc2hvd24gb24gQW5kcm9pZCB0aGUgU0RLIGhhcyB0byBiZSBncmVhdGVyXG4gICAgLy8gb3IgZXF1YWwgdGhhbiAyMSwgbG93ZXIgU0RLIG1lYW5zIG5vIHNldEVsZXZhdGlvbiBtZXRob2QgaXMgYXZhaWxhYmxlXG4gICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgaWYgKGFuZHJvaWQub3MuQnVpbGQuVkVSU0lPTi5TREtfSU5UIDwgMjEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZpZXdUb0FwcGx5U2hhZG93VG8gPSBpc0lPU1xuICAgICAgPyB0aGlzLmlvc1NoYWRvd1JhcHBlclxuICAgICAgOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAodmlld1RvQXBwbHlTaGFkb3dUbykge1xuICAgICAgU2hhZG93LmFwcGx5KHZpZXdUb0FwcGx5U2hhZG93VG8sIHtcbiAgICAgICAgZWxldmF0aW9uOiB0aGlzLmVsZXZhdGlvbiBhcyBudW1iZXIsXG4gICAgICAgIHByZXNzZWRFbGV2YXRpb246IHRoaXMucHJlc3NlZEVsZXZhdGlvbiBhcyBudW1iZXIsXG4gICAgICAgIHNoYXBlOiB0aGlzLnNoYXBlLFxuICAgICAgICBiZ2NvbG9yOiB0aGlzLmJnY29sb3IsXG4gICAgICAgIGNvcm5lclJhZGl1czogdGhpcy5jb3JuZXJSYWRpdXMsXG4gICAgICAgIHRyYW5zbGF0aW9uWjogdGhpcy50cmFuc2xhdGlvblosXG4gICAgICAgIHByZXNzZWRUcmFuc2xhdGlvblo6IHRoaXMucHJlc3NlZFRyYW5zbGF0aW9uWixcbiAgICAgICAgZm9yY2VQcmVzc0FuaW1hdGlvbjogdGhpcy5mb3JjZVByZXNzQW5pbWF0aW9uLFxuICAgICAgICBtYXNrVG9Cb3VuZHM6IHRoaXMubWFza1RvQm91bmRzLFxuICAgICAgICBzaGFkb3dDb2xvcjogdGhpcy5zaGFkb3dDb2xvcixcbiAgICAgICAgc2hhZG93T2Zmc2V0OiB0aGlzLnNoYWRvd09mZnNldCBhcyBudW1iZXIsXG4gICAgICAgIHNoYWRvd09wYWNpdHk6IHRoaXMuc2hhZG93T3BhY2l0eSBhcyBudW1iZXIsXG4gICAgICAgIHNoYWRvd1JhZGl1czogdGhpcy5zaGFkb3dSYWRpdXMgYXMgbnVtYmVyLFxuICAgICAgICByYXN0ZXJpemU6IHRoaXMucmFzdGVyaXplLFxuICAgICAgICB1c2VTaGFkb3dQYXRoOiB0aGlzLnVzZVNoYWRvd1BhdGhcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUNvbW1vbkRhdGEoKSB7XG4gICAgY29uc3QgdFNoYWRvdyA9IHR5cGVvZiB0aGlzLnNoYWRvdztcbiAgICBpZiAoKHRTaGFkb3cgPT09ICdzdHJpbmcnIHx8IHRTaGFkb3cgPT09ICdudW1iZXInKSAmJiAhdGhpcy5lbGV2YXRpb24pIHtcbiAgICAgIHRoaXMuZWxldmF0aW9uID0gdGhpcy5zaGFkb3cgPyBwYXJzZUludCh0aGlzLnNoYWRvdyBhcyBzdHJpbmcsIDEwKSA6IDI7XG4gICAgfVxuICAgIGNvbnN0IHRFbGV2YXRpb24gPSB0eXBlb2YgdGhpcy5lbGV2YXRpb247XG4gICAgaWYgKHRFbGV2YXRpb24gPT09ICdzdHJpbmcnIHx8IHRFbGV2YXRpb24gPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLmVsZXZhdGlvbiA9IHRoaXMuZWxldmF0aW9uXG4gICAgICAgID8gcGFyc2VJbnQodGhpcy5lbGV2YXRpb24gYXMgc3RyaW5nLCAxMClcbiAgICAgICAgOiAyO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUFuZHJvaWREYXRhKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5jb3JuZXJSYWRpdXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmNvcm5lclJhZGl1cyA9IHBhcnNlSW50KHRoaXMuY29ybmVyUmFkaXVzLCAxMCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy50cmFuc2xhdGlvblogPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnRyYW5zbGF0aW9uWiA9IHBhcnNlSW50KHRoaXMudHJhbnNsYXRpb25aLCAxMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplSU9TRGF0YSgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2hhZG93T2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5zaGFkb3dPZmZzZXQgPSBwYXJzZUZsb2F0KHRoaXMuc2hhZG93T2Zmc2V0KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNoYWRvd09wYWNpdHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnNoYWRvd09wYWNpdHkgPSBwYXJzZUZsb2F0KHRoaXMuc2hhZG93T3BhY2l0eSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zaGFkb3dSYWRpdXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnNoYWRvd1JhZGl1cyA9IHBhcnNlRmxvYXQodGhpcy5zaGFkb3dSYWRpdXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEZyb21BbmRyb2lkRGF0YShkYXRhOiBBbmRyb2lkRGF0YSkge1xuICAgIHRoaXMuZWxldmF0aW9uID0gZGF0YS5lbGV2YXRpb24gfHwgdGhpcy5lbGV2YXRpb247XG4gICAgdGhpcy5zaGFwZSA9IGRhdGEuc2hhcGUgfHwgdGhpcy5zaGFwZTtcbiAgICB0aGlzLmJnY29sb3IgPSBkYXRhLmJnY29sb3IgfHwgdGhpcy5iZ2NvbG9yO1xuICAgIHRoaXMuY29ybmVyUmFkaXVzID0gZGF0YS5jb3JuZXJSYWRpdXMgfHwgdGhpcy5jb3JuZXJSYWRpdXM7XG4gICAgdGhpcy50cmFuc2xhdGlvblogPSBkYXRhLnRyYW5zbGF0aW9uWiB8fCB0aGlzLnRyYW5zbGF0aW9uWjtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEZyb21JT1NEYXRhKGRhdGE6IElPU0RhdGEpIHtcbiAgICB0aGlzLm1hc2tUb0JvdW5kcyA9IGRhdGEubWFza1RvQm91bmRzIHx8IHRoaXMubWFza1RvQm91bmRzO1xuICAgIHRoaXMuc2hhZG93Q29sb3IgPSBkYXRhLnNoYWRvd0NvbG9yIHx8IHRoaXMuc2hhZG93Q29sb3I7XG4gICAgdGhpcy5zaGFkb3dPZmZzZXQgPSBkYXRhLnNoYWRvd09mZnNldCB8fCB0aGlzLnNoYWRvd09mZnNldDtcbiAgICB0aGlzLnNoYWRvd09wYWNpdHkgPSBkYXRhLnNoYWRvd09wYWNpdHkgfHwgdGhpcy5zaGFkb3dPcGFjaXR5O1xuICAgIHRoaXMuc2hhZG93UmFkaXVzID0gZGF0YS5zaGFkb3dSYWRpdXMgfHwgdGhpcy5zaGFkb3dSYWRpdXM7XG4gICAgdGhpcy5yYXN0ZXJpemUgPSBkYXRhLnJhc3Rlcml6ZSB8fCB0aGlzLnJhc3Rlcml6ZTtcbiAgICB0aGlzLnVzZVNoYWRvd1BhdGggPSBkYXRhLnVzZVNoYWRvd1BhdGggfHwgdGhpcy51c2VTaGFkb3dQYXRoO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYXRpdmVTaGFkb3dEaXJlY3RpdmUgfSBmcm9tICcuL25hdGl2ZXNjcmlwdC1uZ3gtc2hhZG93L25nLXNoYWRvdy5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmF0aXZlU2hhZG93RGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmF0aXZlU2hhZG93RGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1NoYWRvd01vZHVsZSB7IH1cbiIsImltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi9zaGFwZS5lbnVtJztcblxuZXhwb3J0IGNsYXNzIEFuZHJvaWREYXRhIHtcbiAgZWxldmF0aW9uOiBudW1iZXI7XG4gIHByZXNzZWRFbGV2YXRpb24/OiBudW1iZXI7XG4gIHNoYXBlPzogU2hhcGU7XG4gIGJnY29sb3I/OiBzdHJpbmc7XG4gIGNvcm5lclJhZGl1cz86IG51bWJlcjtcbiAgdHJhbnNsYXRpb25aPzogbnVtYmVyO1xuICBwcmVzc2VkVHJhbnNsYXRpb25aPzogbnVtYmVyO1xuICBmb3JjZVByZXNzQW5pbWF0aW9uPzogYm9vbGVhbjtcbn1cbiIsImV4cG9ydCBjbGFzcyBJT1NEYXRhIHtcbiAgZWxldmF0aW9uOiBudW1iZXI7XG4gIG1hc2tUb0JvdW5kcz86IGJvb2xlYW47XG4gIHNoYWRvd0NvbG9yPzogc3RyaW5nO1xuICBzaGFkb3dPZmZzZXQ/OiBudW1iZXI7XG4gIHNoYWRvd09wYWNpdHk/OiBudW1iZXI7XG4gIHNoYWRvd1JhZGl1cz86IG51bWJlcjtcbiAgcmFzdGVyaXplPzogYm9vbGVhbjtcbiAgdXNlU2hhZG93UGF0aD86IGJvb2xlYW47XG59XG4iXSwibmFtZXMiOlsiaXNBbmRyb2lkIiwiTGVuZ3RoIiwiQ29sb3IiLCJzY3JlZW4iLCJpc0lPUyIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJSZW5kZXJlcjIiLCJJbnB1dCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7bUJBRWMsV0FBVztjQUNoQixNQUFNO2NBQ04sTUFBTTtjQUNOLE1BQU07Ozs7Ozs7QUNMZixJQWVBLHFCQUFJLGFBQWEsQ0FBQztJQUNsQixxQkFBSSxXQUFXLENBQUM7SUFFaEIsSUFBSUEsa0JBQVMsRUFBRTtRQUNiLGFBQWEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLFdBQVcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDckU7Ozs7Ozs7OztRQVNRLFlBQUs7Ozs7O1lBQVosVUFBYSxPQUFZLEVBQUUsSUFBMkI7Z0JBQ3BELHFCQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLElBQ0UsT0FBTyxDQUFDLE9BQU87b0JBQ2YsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxRQUN0QyxFQUFFO29CQUNBLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7cUJBQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO29CQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7Ozs7O1FBRWMsa0JBQVc7Ozs7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