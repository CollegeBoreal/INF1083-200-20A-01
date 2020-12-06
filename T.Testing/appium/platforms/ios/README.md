# :iphone: iOS

#### :a: Setting up appium with NativeScript

:round_pushpin: Emulator: set `avd` property in `appium.capabilities` to `Device Name`

```
$ ns devices

Connected devices & emulators
Searching for devices...
┌───┬─────────────┬──────────┬──────────────────────────────────────┬──────────┬───────────┬─────────────────┐
│ # │ Device Name │ Platform │ Device Identifier                    │ Type     │ Status    │ Connection Type │
│ 1 │ iPhone 11   │ iOS      │ A5D4EBAB-0802-454F-B1C1-95A6C0ED727C │ Emulator │ Connected │ Local           │
└───┴─────────────┴──────────┴──────────────────────────────────────┴──────────┴───────────┴─────────────────┘
```

- [ ] Edit `appium.capabilities.json` file

```json
    "sim.iPhoneXS": {
        "platformName": "ios",
        "platformVersion": "/12*/",
        "deviceName": "iPhone XS",
        "noReset": false,
        "fullReset": false,
        "app": ""
    },
```

- [ ] Run the test

```
$ npm run e2e -- --runType android28
```

:round_pushpin: Real Device: Set `deviceToken` property in `appium.capabilities` to `Device Identifier`

```
$ ns device% ns devices
Error while loading nativescript-cloud is: Default commands should be required before child commands

Connected devices & emulators
Searching for devices...
┌───┬─────────────┬──────────┬──────────────────────────────────────────┬────────┬───────────┬─────────────────┐
│ # │ Device Name │ Platform │ Device Identifier                        │ Type   │ Status    │ Connection Type │
│ 1 │ myIpad      │ iOS      │ c08f504402034771f5044020344404203489a87c │ Device │ Connected │ Wifi            │
└───┴─────────────┴──────────┴──────────────────────────────────────────┴────────┴───────────┴─────────────────┘
```

- [ ] Edit `appium.capabilities.json` file

```json
    "dev.iPhone12": {
        "platformName": "ios",
        "platformVersion": "14.2",
        "deviceName": "myIpad",
        "deviceToken": "c08f504402034771f5044020344404203489a87c",
        "noReset": false,
        "fullReset": false,
        "app": ""
    },
```

- [ ] Run the test

```
$ npm run e2e -- --runType dev.iPhone12
```

## :b: Separate Testing of Appium Desktop

[Test on real devices](http://appium.io/docs/en/drivers/ios-xcuitest-real-devices)

```
$ brew install carthage
```

Simple Example of Capabilities:

- [ ] Locate your device name

```
$ adb devices
List of devices attached
emulator-5554	device
```

- [ ] Locate your App `Package` and `Activity` name

* run your app on the emulator

* Start tracing the log

```
$ adb logcat > keeplog.txt
```

* Find the App `Package` and `Activity` name

for example `org.nativescript.b300098957/com.tns.NativeScriptActivity` for NS app name called `b300098957`

- [ ] Resulting capability file

```json
{
  "deviceName": "emulator-5554",
  "platformName": "Android",
  "appPackage": "org.nativescript.b300098957",
  "appActivity": "com.tns.NativeScriptActivity",
  "noReset": true
}
```

![image](../images/appium-server.png)

# References

<img src="https://i.stack.imgur.com/f78Go.png" width="477" height="221"></img>

https://stackoverflow.com/questions/46673050/unable-to-boot-device-due-to-insufficient-system-resources-using-xcode-9

http://appium.io/docs/en/drivers/ios-xcuitest-real-devices/ 

https://www.techaheadcorp.com/blog/how-to-install-appium-on-mac/


