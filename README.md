# Encricle App

## Installation

Run ```expo install``` to install all the packages necessary to get the app to function.

Then run ```expo start``` to get the dev environment started.

You will need to stop the environment to install packages. Use ```expo install <package_name>``` to install the package. It will link it where needed and ensure it plays properly with the metro bundler.

If you want to remove a package, you can just use, ```npm/yarn uninstall <package_name>```. It won't matter to expo at all not to mention it doesn't have an uninstall command.

### iOS

Download the Expo Go app from the App store and use your camera app to scan the QR code that pops up. It will take you to the Expo Go app and build an app preview for you.

### Android

After you follow the tutorial to set up your phone for development and enable USB Debugging, you can just plug your phone into your computer's usb ports and click "Run on Android device/Emulator" and it should push the packages to your phone via USB. You still need to download the Expo Go app. If you would rather be wireless, you can just scan the QR code from within the Expo Go app itself.

Turn on Android Dev Options: https://developer.android.com/studio/debug/dev-options

## Building

To build a version of the App, use expo build:OS

use android for Android and ios for iOS.

You must have an expo account to build a version of the app. Sign up here: https://expo.io/signup

### APK signing

In order to build your APK for android, you don't need a dev account. You do need one to publish to the Play Store, but not to build. But you do need a signed keystore. One should be on Encircles Google Drive and you need only specify to Expo to build with this keystore.

If you need to make a new one for whatever reason, here is the tutorial:

https://help.gamesalad.com/gamesalad-cookbook/publishing/4-android-publishing/4-02-creating-a-keystore/

Expo keystore info:

https://docs.expo.io/distribution/building-standalone-apps/#if-you-choose-to-build-for-android

When you run the build command once the build is queued, you will be given a link to where you can download the application in the console once the build is done. This can take up to 10 mins.