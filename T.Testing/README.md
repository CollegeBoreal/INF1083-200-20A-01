# ui-tests



https://docs.nativescript.org/plugins/ui-tests

:one: create a project, replace b`<`your :id:`>`

:pushpin: for example the project name will be `b300098957` 

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-blank-ng`             |  Hellow World                     |

* go to your project 


:two: Add the [Appium](http://appium.io) Library using [nativescript-dev-appium](https://github.com/NativeScript/nativescript-dev-appium)

```
$ npm install --save-dev nativescript-dev-appium
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

:three: Add some code

:pushpin: Add the below `import` and `registration` to the `home` component file `home.component.ts`

```
my-plugin
├── demo
|   └── app
|   └── e2e
└── src
```
