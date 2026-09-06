import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { bootstrapNativeShell, hideSplashScreen } from "./native/bootstrap";

createRoot(document.getElementById("root")!).render(<App />);

// Fire-and-forget: these are no-ops on web, and on native they run after the
// initial paint so there's no flash-of-unstyled-content before the splash
// screen is dismissed.
void bootstrapNativeShell();
void hideSplashScreen();
