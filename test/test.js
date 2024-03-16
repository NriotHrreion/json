const { JSON } = require("../build/json.js");

console.log(JSON.parse(`
{
    "a": 12.3,
    "b": -99.3,
    "c": "1",
    "test": null,
    "gggg": {
        "a": 12.3,
        "b": -99.3,
        "c": "1",
        "test": null,
        "gggg": true,
        "aaa": false,
        "basdfasdf": {
            "a": 12.3,
            "b": -99.3,
            "c": "1",
            "test": null,
            "gggg": true,
            "aaa": false,
            "basdfasdf": "HelloWorld",
            "testobj": {"a":1,"b":{"q":"a"},"c":"3"},
            "testarr": [123, "abcD", true, false, null, {}, {"a":1,"b":{"q":"a"},"c":"3"}]
        },
        "testobj": {"a":1,"b":{"q":"a"},"c":"3"},
        "testarr": [123, "abcD", true, false, null, {}, {"a":1,"b":{"q":"a"},"c":"3"}]
    },
    "aaa": false,
    "basdfasdf": "HelloWorld",
    "testobj": {"a":1,"b":{"q":"a"},"c":"3"},
    "testarr": [123, "abcD", true, false, null, {}, {"a":1,"b":{"q":"a"},"c":"3"}]
}
`));

console.log(JSON.parse(`
[123, "abcD", true, false, null, {}, {"a":1,"b":{"q":"a"},"c":"3"}]
`));
