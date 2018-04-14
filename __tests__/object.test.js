const sandbox = require("../src/main");
sandbox({
  Object: {
    mapKeys: true,
    snakeCase: true,
    camelCase: true,
    manipulate: true,
    get: true,
    pick: true
  }
});

const demoObject = {
  test: true,
  test_with_string: "true",
  test_with_number: 1,
  test_with_multiple_words: true,
  test_with_false_string_value: "false",
  foo: {
    bar: {
      baz: [
        true,
        false
      ]
    }
  }
};

describe("Object prototype", () => {
  it("should allow mapping keys", () => {
    expect(demoObject.mapKeys(key => key.toUpperCase())).toMatchObject({
      TEST: true,
      TEST_WITH_STRING: "true",
      TEST_WITH_NUMBER: 1,
      TEST_WITH_MULTIPLE_WORDS: true,
      TEST_WITH_FALSE_STRING_VALUE: "false"
    });
  });

  it("should allow manipulating objects", () => {
    expect(demoObject.manipulate((obj, key, value) => {
      if (value === "false") {
        obj[key.toUpperCase()] = false;
      }
    })).toMatchObject({
      TEST_WITH_FALSE_STRING_VALUE: false
    });
  });

  it("should allow picking of object entries by key", () => {
    const picked = demoObject.pick(["test", "test_with_string"]);
    expect(picked).toMatchObject({
      test: true,
      test_with_string: "true"
    });
    expect(picked).not.toMatchObject({
      test_with_number: 1
    });
  });

  it("should allow conversion of object keys to camelCase", () => {
    const converted = demoObject.camelCase();
    expect(converted).toMatchObject({
      test: true,
      testWithString: "true",
      testWithNumber: 1,
      testWithMultipleWords: true,
      testWithFalseStringValue: "false"
    });
  });

  it("should allow conversion of object keys to snake_case", () => {
    const camelCased = {
      test: true,
      testWithString: "true",
      testWithNumber: 1,
      testWithMultipleWords: true,
      testWithFalseStringValue: "false",
      foo: {
        bar: {
          baz: [
            true,
            false
          ]
        }
      }
    };

    const converted = camelCased.snakeCase();
    expect(converted).toMatchObject(demoObject);
  });

  it("should allow getting of object values by string key", () => {
    const value = demoObject.get("foo.bar.baz");
    expect(Array.isArray(value)).toBe(true);
  });

  it("should allow getting of object values by string keys with array offsets", () => {
    const value = demoObject.get("foo.bar.baz[0]");
    expect(value).toBe(true);
  })
});