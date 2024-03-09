const { JSON } = require("../build/bundle.js");

console.log(JSON.parse('{"a":123, "test": null,         "gggg": true, "aaa": false,"ab": "\\\"",      "basdfasdf": "HelloWorld"}'));
