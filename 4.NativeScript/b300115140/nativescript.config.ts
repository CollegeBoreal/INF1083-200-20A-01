import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.b300115140',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;