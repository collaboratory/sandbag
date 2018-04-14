const { camelCase, snakeCase } = require("./string");
module.exports.sandbagObjectPrototype = function (config) {
  if (config.Object.mapKeys) {
    Object.prototype.mapKeys = function (cb) {
      return Object.keys(this).reduce((obj, key) => {
        obj[cb(key)] = this[key];
        return obj;
      }, {});
    };
  }

  if (config.Object.pick) {
    Object.prototype.pick = function (keys) {
      const source = this;
      return Object.keys(this).filter(key => keys.indexOf(key) !== -1).reduce((obj, key) => {
        obj[key] = source[key];
        return obj;
      }, {});
    };
  }

  if (config.Object.manipulate) {
    Object.prototype.manipulate = function (cb) {
      return manipulate(this, cb);
    };
  }

  if (config.Object.camelCase) {
    Object.prototype.camelCase = function() {
      return manipulate(this, (obj, key, value) => {
        obj[camelCase(key)] = camelCase(value, false);
      });
    };
  }

  if (config.Object.snakeCase) {
    Object.prototype.snakeCase = function() {
      return manipulate(this, (obj, key, value) => {
        obj[snakeCase(key)] = snakeCase(value, false);
      });
    };
  }

  if (config.Object.get) {
    Object.prototype.get = function(key) {
      return key.replace(/[\[\]]+/g, ".").split(".").reduce((obj, part) => {
        try {
          if (part && obj) {
            if (isNaN(part)) {
              return obj[part];
            } else {
              return obj[parseInt(part)];
            }
          }
        } catch(e) {}
        return obj;
      }, this);
    }
  }
};

function manipulate(source, cb) {
  return Object.keys(source).reduce((obj, key) => {
    cb(obj, key, source[key]);
    return obj;
  }, {});
}
module.exports.manipulate = manipulate;