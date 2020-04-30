
/**
 * @function importFrom
 * @description import all the modules contained in argument
 * @param {*} r 
 * @returns {Object}
 */

export function importFrom(r) {
  return r.keys().map(r);
}

/**
 * @function getWidth
 * @returns {Number} returns the page width
 */

export function getWidth() {
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
 * @returns {Number} returns the page height
 */

export function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}
