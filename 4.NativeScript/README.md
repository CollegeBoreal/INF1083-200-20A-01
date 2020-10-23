# 4.NativeScript

https://github.com/CollegeBoreal/Tutoriels/tree/master/W.Web/T.NativeScript


## TNS CLI

### Créer un nouveau projet en remplacant b<mon ID> par votre :id:

* [Création](https://docs.nativescript.org/tooling/docs-cli/project/creation/create)

|  tns v6.5.1                                                       |            |
|-------------------------------------------------------------------|------------|
| `$ tns create b`:id:` --template tns-template-hello-world-ng`     |            |
| `$ tns create b`:id:` --template tns-template-tab-navigation-ng`  |            |


|  tns v7.0.1                                                                 |                                   |
|-----------------------------------------------------------------------------|-----------------------------------|
| `$ tns create b`:id:` --template @nativescript/template-blank-ng`           |                                   |
| `$ tns create b`:id:` --template @nativescript/template-tab-navigation-ng`  |                                   |


* Émulation

- [x] Ajouter la plateforme désirée ([ios] ou [android])

```
$  tns platform add <plateforme>
```

- [x] Lancer l'application

```
$ tns run <plateforme>
```

## [Participation](Participation.md)


## References

https://github.com/CocoaPods/CocoaPods/issues/7314

#### :x: Error

https://github.com/NativeScript/NativeScript/issues/8807

NDK Mismatch

```
No version of NDK matched the requested version 20.0.5594570. Versions available locally: 20.1.5948944
```

Install the old NDK version

```
$ sdkmanager 'ndk;20.0.5594570'
```
