# 4.NativeScript

https://github.com/CollegeBoreal/Tutoriels/tree/master/W.Web/T.NativeScript


## TNS CLI

### Créer un nouveau projet en remplacant b<mon ID> par votre :id:

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-tab-navigation-ng`    |  Application avec onglets         |

* Émulation

- [x] Ajouter la plateforme désirée ([ios] ou [android])

```
$  ns platform add <plateforme>
```

- [x] Lancer l'application

```
$ ns run <plateforme>
```

## [Participation](.scripts/Participation.md)


## References

https://github.com/CocoaPods/CocoaPods/issues/7314

#### :x: Known Error

https://github.com/NativeScript/NativeScript/issues/8807

NDK Mismatch for Android

```
No version of NDK matched the requested version 20.0.5594570. Versions available locally: 20.1.5948944
```

Install the old NDK version

```
$ sdkmanager 'ndk;20.0.5594570'
```

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-blank-ng`             |  Hellow World                     |
| `$ ns create b`:id:` --template @nativescript/template-drawer-navigation-ng` |  Application avec menu            |

