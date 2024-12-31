export const camelToSnake = (camelCaseStr) => {
  return camelCaseStr
    .replace(/[A-Z]/g, function (match) {
      return "_" + match.toLowerCase();
    })
    .toUpperCase();
};
