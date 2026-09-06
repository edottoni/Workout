// =============================================================
// NATIVE BOOTSTRAP — runs the handful of Capacitor calls needed to make
// the packaged Android app feel native (hide splash once React has mounted,
// draw a dark status bar to match the app's theme). Every call is guarded
// so this file is a complete no-op when the app runs as a plain website
// or PWA - `Capacitor.isNativePlatform()` is false there and nothing
// under client/src/native ever gets imported.
// =============================================================

import { Capacitor } from "@capacitor/core";

export async function bootstrapNativeShell(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const { StatusBar, Style } = await import("@capacitor/status-bar");
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: "#0b0b12" });
  } catch (e) {
    // Non-fatal: absence of the plugin/permission shouldn't block app start.
    console.warn("StatusBar setup skipped:", e);
  }

  try {
    const { Keyboard } = await import("@capacitor/keyboard");
    // Resize the WebView content (not just pan it) when the keyboard opens,
    // so fixed-position UI (like the rest-timer overlay) doesn't get hidden
    // behind the keyboard on Android.
    await Keyboard.setResizeMode({ mode: "native" as any });
  } catch (e) {
    console.warn("Keyboard setup skipped:", e);
  }
}

export async function hideSplashScreen(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { SplashScreen } = await import("@capacitor/splash-screen");
    await SplashScreen.hide();
  } catch (e) {
    console.warn("SplashScreen hide skipped:", e);
  }
}
