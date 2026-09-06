# Add project specific ProGuard rules here.
# By default, release builds in this project have minifyEnabled=false (see app/build.gradle),
# so these rules are inactive until minification is turned on. Keep Capacitor's bridge and
# plugin classes if you do enable it, since they're invoked via reflection from the WebView:
-keep class com.getcapacitor.** { *; }
-keep public class * extends com.getcapacitor.Plugin
-keepclassmembers class * {
    @com.getcapacitor.annotation.CapacitorPlugin <methods>;
}
