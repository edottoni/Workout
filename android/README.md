# Android project (Capacitor)

This folder was hand-scaffolded to mirror what `npx cap add android` generates,
because the environment that assembled it has no network access (couldn't run
`npm install` / `npx cap add android` / download a Gradle distribution here).
Everything is plain, inspectable text except the launcher icon PNGs (generated
locally as flat-color placeholders — swap them for real artwork whenever you like).

## What's intentionally NOT committed

- **`gradle/wrapper/gradle-wrapper.jar`** — this one file is a binary blob that
  ships with each Gradle release. `codemagic.yaml` regenerates it (and refreshes
  `gradlew` / `gradlew.bat` for good measure) as its first Android step:
  ```
  gradle wrapper --gradle-version 8.9 --distribution-type all
  ```
  Codemagic's build images have a system Gradle already installed, so this
  costs nothing extra. If you build locally and don't have Gradle installed,
  run the same command yourself once, or install Gradle 8.9 and use it directly
  instead of `./gradlew` the first time.
- **`app/capacitor.build.gradle`** and **`capacitor.settings.gradle`** — these
  exist as placeholders (matching the plugins declared in `package.json`) so
  the project is Gradle-evaluable out of the box, but they are rewritten by
  `npx cap sync android` on every build. Never hand-edit them.

## Local build

```
pnpm install
pnpm build:web        # vite build -> dist/public
npx cap sync android   # copies dist/public into android/app + wires plugins
cd android
gradle wrapper --gradle-version 8.9 --distribution-type all   # first time only
./gradlew assembleDebug
```

The debug APK lands in `android/app/build/outputs/apk/debug/`.

## Release signing

`app/build.gradle`'s `release` signing config reads from either Gradle
`-P` properties or these environment variables — nothing is hardcoded:

- `CM_KEYSTORE_PATH`
- `CM_KEYSTORE_PASSWORD`
- `CM_KEY_ALIAS`
- `CM_KEY_PASSWORD`

In Codemagic, upload the keystore as a **secure file** and put the four values
above in an environment variable group named `android_signing` (see
`codemagic.yaml`'s `android-release` workflow). If they're absent, `assembleRelease`
still runs but produces an **unsigned** APK — that's expected, not a bug.

## App identity

- Application ID: `com.workoutscheduler.app`
- App name: `Workout Scheduler`
- `versionName` / `versionCode` live in `android/gradle.properties` — bump
  `versionCode` on every release build you intend to publish.
