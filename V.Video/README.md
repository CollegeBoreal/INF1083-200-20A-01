# nativescript-evoplayer

:one: create a project, replace b<mon ID> by b`<`your :id:`>`

:pushpin: for example the project name will be `b300098957-blank-ng` 

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-blank-ng`             |  Hellow World                     |

* go to your project 


:two: Add the [exoplayer](https://www.npmjs.com/package/@nstudio/nativescript-exoplayer) plugin

```
$ ns plugin add @nstudio/nativescript-exoplayer
```




:three: Add some code

:pushpin: Add the below `import` and `registration` to the `home` component file `home.component.ts`

```typescript
// somewhere at top of your component or bootstrap file
import { registerElement } from "@nativescript/angular";
import { Video } from '@nstudio/nativescript-exoplayer';
registerElement("Video", () => Video);
```

:pushpin: Add the below snippet to the `home` template file `home.component.html`


```html
    <!-- Add your page content here -->
    <Video
        src="https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        autoplay="true"
        height="300"></Video>
``````

:four: Run the app

:pushpin: Using local `Playground`

```
% ns run
```

:pushpin: Using Preview

```
% ns preview
```


# [Participation](Participation.md)
