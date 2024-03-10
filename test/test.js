const { JSON } = require("../build/bundle.js");

console.log(JSON.parse(`
{
    "a": 12.3,
    "b": -99.3,
    "c": "1",
    "test": null,
    "gggg": true,
    "aaa": false,
    "basdfasdf": "HelloWorld",
    "testobj": {"a":1,"b":{"q":"a"},"c":"3"}
}
`));
