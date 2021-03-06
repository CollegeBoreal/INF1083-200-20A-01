# nativescript-exoplayer

# [Participation](.scripts/Participation.md)

:one: create a project, replace b`<`your :id:`>`

:pushpin: for example the project name will be `b300098957` 

|  tns v7.0.1                                                                  |  Patrons                          |
|------------------------------------------------------------------------------|-----------------------------------|
| `$ ns create b`:id:` --template @nativescript/template-blank-ng`             |  Hello World                      |

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
    src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
    autoplay="true"
    height="300"></Video>
``````

:four: Run the app

:pushpin: Using local `Playground`

```
$ ns platform add <android|ios>
```

```
% ns run <android|ios>
```

:pushpin: Using Preview

```
% ns preview
```

## :o: Customization

:iphone: Android

Open up the manifest file `AndroidManifest.xml` (in `App_Resource/Android/src/main`) and add the following to the `<application>` parameter tag:

:keyboard: Dans [VSC](https://code.visualstudio.com/) Ouvrir un fichier -> `Ctrl p` :computer: Windows -> `⌘ p` :apple: MacOS


```xml
	<application
		...
		android:usesCleartextTraffic="true">
```

# References:

https://stackoverflow.com/questions/37819550/java-io-filenotfoundexception-storage-emulated-0-new-file-txt-open-failed-ea

