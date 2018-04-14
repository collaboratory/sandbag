module.exports.sandbagStringPrototype = function (config) {
  String.prototype.hasSandbag = true;

  if (config.String.camelCase) {
    String.prototype.camelCase = function() {
      return camelCase(this);
    }

    String.prototype.snakeCase = function() {
      return snakeCase(this);
    };
  }
};

function camelCase(thing) {
  if (Array.isArray(thing)) {
    return thing.map(camelCase);
  } else if (typeof thing.camelCase === "object" && thing.camelCase) {
    return thing.camelCase ? thing.camelCase() : thing;
  }
  return (tok => tok.shift() + tok.map(w => w ? `${w[0].toUpperCase()}${w.substring(1)}` : '').join(''))
    (`${thing}`.replace(/([^a-zA-Z0-9]+)/g, " ").split(" "));
}
module.exports.camelCase = camelCase;

function snakeCase(thing) {
  if (Array.isArray(thing)) {
    return thing.map(camelCase);
  } else if (typeof thing.camelCase === "object") {
    return thing.snakeCase ? thing.snakeCase() : thing;
  }
  return `${thing}`.replace(/([^a-zA-Z0-9]+)/g, "_").split(/(?=[A-Z_])/).join("_").replace(/__/g, "_").toLowerCase();
}
module.exports.snakeCase = snakeCase;