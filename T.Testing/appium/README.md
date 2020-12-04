# ui-tests with Appium



https://docs.nativescript.org/plugins/ui-tests

:one: create a project, replace b`<`your :id:`>`

:pushpin: for example the project name will be `b300098957` 

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --ng                                                    |  Hellow World                     |

* go to your project 

:two: Add the [Appium](http://appium.io) Library using [nativescript-dev-appium](https://github.com/NativeScript/nativescript-dev-appium)

```
$ npm install appium --global 
```

:pushpin: Choose `angular` and `jasmine`

```
$ echo angular | npm install nativescript-dev-appium --save-dev 
...
? What kind of project do you use? (Use arrow keys)
  javascript 
  typescript 
❯ angular 
  vue 
  shared-ng-project 
...
? What kind of project do you use? angular
? Which testing framework do you prefer? (Use arrow keys)
  mocha 
❯ jasmine 
  none 
```

:three: Tree Code

```
b000000000
├── app
├── e2e
    ├── config
        ├── jasmine.opts
        ├── appium.capabilities.json
    ├── sample.e2e-test.ts
    ├── setup.ts
    ├── tsconfig.json
├── ...
├── package.json
├── tsconfig.json
```


```
$ ns build android
```


# References

:apple: On MacOS

```
$ brew install appium --cask 
```

:computer: On Windows

```
PS > choco install appium-desktop
```


# References

[Testing Android Applications With Appium | Appium Tutorial For Mobile Testing | Edureka](https://www.youtube.com/watch?v=i1tQ1pjEFWw)

https://nativescript.org/blog/start-testing-your-nativescript-apps-properly/

http://appium.io/docs/en/drivers/ios-xcuitest-real-devices/ 

https://www.techaheadcorp.com/blog/how-to-install-appium-on-mac/
