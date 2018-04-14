const defaultOptions = {
  Object: {
    mapKeys: true,
    get: true,
    pick: true,
    manipulate: true,
    camelCase: true,
    snakeCase: false
  },
  String: {
    camelCase: true,
    snakeCase: true
  }
};

const { sandbagObjectPrototype } = require("./object");
const { sandbagStringPrototype } = require("./string");

module.exports = function sandbag(options = { Object: {}, String: {} }) {
  const config = { 
    Object: Object.assign({}, defaultOptions.Object, options.Object), 
    String: Object.assign({}, defaultOptions.String, options.String) 
  };
  sandbagObjectPrototype(config);
  sandbagStringPrototype(config);
};