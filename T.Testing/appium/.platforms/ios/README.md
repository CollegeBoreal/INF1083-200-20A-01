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

There is also a dependency, made necessary by [Facebook's WebDriverAgent](https://github.com/facebook/WebDriverAgent), for the Carthage dependency manager. If you do not have Carthage on your system, it can also be installed with Homebrew

```
$ brew install carthage
```

For real devices we can use xcpretty to make Xcode output more reasonable. This can be installed by

```
$ sudo gem install xcpretty
```

Simple Example of Capabilities:

- [ ] Locate your device name


```
$ xcrun xctrace list devices
```

or

```
% ns devices
Error while loading nativescript-cloud is: Default commands should be required before child commands

Connected devices & emulators
Searching for devices...
┌───┬─────────────┬──────────┬──────────────────────────────────────┬──────────┬───────────┬─────────────────┐
│ # │ Device Name │ Platform │ Device Identifier                    │ Type     │ Status    │ Connection Type │
│ 1 │ iPhone 12   │ iOS      │ 9BDC9951-6D3F-4F1E-9D9E-FF598AFEB09F │ Emulator │ Connected │ Local           │
└───┴─────────────┴──────────┴──────────────────────────────────────┴──────────┴───────────┴─────────────────┘
```

- [ ] Locate your App `Package` and `Activity` name

* run your app on the simulator

locate the `app` file: (for example)

```
$ ls -l /Users/b300098957/Developer/INF1083-200-20A-01/T.Testing/appium/b300098957/platforms/ios/build/Debug-iphonesimulator/b300098957.app
```


- [ ] Resulting capability file

```json
{
  "platformName": "iOS",
  "platformVersion": "14.2",
  "deviceName": "iPhone 12",
  "uuid": "9BDC9951-6D3F-4F1E-9D9E-FF598AFEB09F",
  "app": "/Users/valiha/Developer/INF1083-200-20A-01/T.Testing/appium/b300098957/platforms/ios/build/Debug-iphonesimulator/b300098957.app"
}
```

![image](../../images/appium-iOS-sim.png)

# References

<img src="https://i.stack.imgur.com/f78Go.png" width="477" height="221"></img>

https://stackoverflow.com/questions/46673050/unable-to-boot-device-due-to-insufficient-system-resources-using-xcode-9

http://appium.io/docs/en/drivers/ios-xcuitest-real-devices/ 

https://www.techaheadcorp.com/blog/how-to-install-appium-on-mac/


