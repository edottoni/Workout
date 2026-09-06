import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.workoutscheduler.app",
  appName: "Workout Scheduler",
  // Must match vite's build.outDir in vite.config.ts (build.outDir: "dist/public")
  webDir: "dist/public",
  server: {
    // Allows cleartext during local `cap run android` dev sessions only.
    // Has no effect on the packaged APK, which always loads the bundled webDir.
    androidScheme: "https",
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 400,
      backgroundColor: "#0b0b12",
      androidSplashResourceName: "splash",
      showSpinner: false,
    },
  },
};

export default config;
