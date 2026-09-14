import React from "react";
import { IonIcon } from "@ionic/react";
import { moonOutline, sunnyOutline } from "ionicons/icons";
import {
  effectiveTheme,
  toggleTheme,
  THEME_EVENT,
} from "../../helpers/theme";

/**
 * Light/dark switch. Reflects the effective theme and stays in sync with any
 * other toggle via the pando-themechange event.
 *
 * variant="switch" renders a labelled pill (sidebar); variant="icon" renders a
 * compact icon button.
 */
const ThemeToggle = ({ variant = "switch" }) => {
  const [theme, setTheme] = React.useState(effectiveTheme());

  React.useEffect(() => {
    const sync = () => setTheme(effectiveTheme());
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? "Dark" : "Light";

  function handleToggle() {
    toggleTheme();
    setTheme(effectiveTheme());
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        className="theme-toggle theme-toggle--icon"
        onClick={handleToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        title={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <IonIcon icon={isDark ? sunnyOutline : moonOutline} aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? "is-dark" : "is-light"}`}
      onClick={handleToggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark theme"
    >
      <span className="theme-toggle__icon">
        <IonIcon icon={isDark ? moonOutline : sunnyOutline} aria-hidden="true" />
      </span>
      <span className="theme-toggle__label">{label} mode</span>
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
    </button>
  );
};

export default ThemeToggle;
