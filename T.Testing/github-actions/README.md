## Github Actions Examples

https://github.com/nstudio/nativescript-audio/blob/master/.github/workflows/build.yml

Launch Emulator

```
% emulator -avd test -no-audio -no-window &
```

Wait for Emulator to start

```
% adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done; input keyevent 82'
```

Create Test

```
% ns test init --framework mocha
```

Launch Test

```
% ns test android --justlaunch
```

