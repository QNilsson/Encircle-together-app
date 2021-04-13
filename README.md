# Encricle App

## Installation

Run ```expo install``` to install all the packages necessary to get the app to function.

Then run ```expo start``` to get the dev environment started.

### iOS

Download the Expo Go app from the App store and take a picture of the QR Code that pops up. It will take you to the Expo Go app and build an app preview for you.

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