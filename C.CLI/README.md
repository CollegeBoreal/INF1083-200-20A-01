# Angular CLI


```
% npm install @angular/cli --global
```

```
% npm install  typescript@4
```

```
% npm install @schematics/angular @nativescript/schematics tslint --save-dev
```

```
% ng generate module login
CREATE src/app/login/login.module.ts (191 bytes)
CREATE src/app/login/login.module.tns.ts (270 bytes)
CREATE src/app/login/login.common.ts (177 bytes)
```

```
% ng generate component login/page
Option "entryComponent" is deprecated: Since version 9.0.0 with Ivy, entryComponents is no longer necessary.
            Failed to generate remapped imports! Please see: https://docs.nativescript.org/angular/code-sharing/intro#remapped-imports
CREATE src/app/login/page/page.component.css (0 bytes)
CREATE src/app/login/page/page.component.html (19 bytes)
CREATE src/app/login/page/page.component.spec.ts (612 bytes)
CREATE src/app/login/page/page.component.ts (266 bytes)
CREATE src/app/login/page/page.component.tns.css (49 bytes)
CREATE src/app/login/page/page.component.tns.html (60 bytes)
UPDATE src/app/login/login.module.ts (259 bytes)
UPDATE src/app/login/login.module.tns.ts (338 bytes)
```

# References

https://market.nativescript.org/plugins/@nativescript/schematics/

https://github.com/NativeScript/NativeScript/issues/8994
