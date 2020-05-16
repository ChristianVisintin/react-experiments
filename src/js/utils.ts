/**
 * @function getWidth
 * @returns {number} returns the page width
 */

export function getWidth(): number {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

/**
 * @function getHeight
 * @returns {number} returns the page height
 */

export function getHeight(): number {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

/**
 * @function getNavigatorLanguage
 * @description returns the current navigator language, without the region code
 * @returns {string}
 */

export function getNavigatorLanguage(): string {
  return navigator.language.split(/[-_]/)[0]; // language without region code
}
