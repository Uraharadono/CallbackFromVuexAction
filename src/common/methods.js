export const isNullOrWs = function(str) {
  return (
    typeof str === "undefined" ||
    str === null ||
    (typeof str === "string" && str.trim().length === 0)
  );
};

const isValidJson = function(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export function parseUrlParams() {
  const search = window.location.search.substring(1);
  if (!search) return {};

  const str = search.replace(/&/g, '","').replace(/=/g, '":"');
  const json = `{"${str}"}`;
  const transform = (key, value) =>
    isNullOrWs(key) ? value : decodeURIComponent(value);

  return isValidJson(json) ? JSON.parse(json, transform) : {};
}

export function startsWith(str, word) {
  return str.lastIndexOf(word, 0) === 0;
}


export default {
  isNullOrWs: isNullOrWs,
  parseUrlParams: parseUrlParams,
  startsWith: startsWith,
};
