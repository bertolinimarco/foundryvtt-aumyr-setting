// Minimal bootstrap. Ensures i18n dictionaries are loaded and exposes a helper.
Hooks.once("init", () => {
  console.log("Aumyr | init");
});

/**
 * Localize helper: game.i18n.localize with safe fallback.
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
  return game.i18n.localize(key) ?? key;
}
