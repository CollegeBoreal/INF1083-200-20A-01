# 4.NativeScript

https://github.com/CollegeBoreal/Tutoriels/tree/master/W.Web/T.NativeScript


## TNS CLI

### Créer un nouveau projet en remplacant b<mon ID> par votre :id:

* Création

```
$  tns create b<mon ID> --template tns-template-tab-navigation-ng
```

* Émulation

```
$  tns run
```

## [Participation](Participation.md)


```typescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module'

export default {
  id: 'org.nativescript.Blank',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  appPath: 'src',
} as NativeScriptModule
```
