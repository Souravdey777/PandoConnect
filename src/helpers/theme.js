/**
 * Runtime theme control.
 *
 * Light is the default (:root tokens). Dark tokens live under `body.theme-dark`
 * in variables.css. We toggle that class from here based on the effective
 * theme = stored preference, or the OS setting when the user hasn't chosen.
 * The choice persists in localStorage and a `pando-themechange` event keeps
 * multiple toggles in sync.
 */
const KEY = "pando-theme";
const EVENT = "pando-themechange";

function systemPrefersDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function getStoredTheme() {
  try {
    return localStorage.getItem(KEY); // "light" | "dark" | null (= follow system)
  } catch (e) {
    return null;
  }
}

export function effectiveTheme() {
  return getStoredTheme() || (systemPrefersDark() ? "dark" : "light");
}

function applyEffective() {
  if (typeof document !== "undefined") {
    document.body.classList.toggle("theme-dark", effectiveTheme() === "dark");
  }
}

export function setTheme(theme) {
  try {
    if (theme === "light" || theme === "dark") localStorage.setItem(KEY, theme);
    else localStorage.removeItem(KEY);
  } catch (e) {
    /* ignore */
  }
  applyEffective();
  try {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: effectiveTheme() }));
  } catch (e) {
    /* ignore */
  }
}

/** Flip between light and dark, storing the explicit choice. */
export function toggleTheme() {
  setTheme(effectiveTheme() === "dark" ? "light" : "dark");
}

/** Apply the theme on boot and follow OS changes while unset. */
export function initTheme() {
  applyEffective();
  if (typeof window === "undefined" || !window.matchMedia) return;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => {
    if (!getStoredTheme()) {
      applyEffective();
      try {
        window.dispatchEvent(new CustomEvent(EVENT, { detail: effectiveTheme() }));
      } catch (e) {
        /* ignore */
      }
    }
  };
  if (mq.addEventListener) mq.addEventListener("change", handler);
  else if (mq.addListener) mq.addListener(handler);
}

export const THEME_EVENT = EVENT;
