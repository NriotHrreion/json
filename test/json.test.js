const { JSON } = require("../build/json.js");

describe("JSON tests", () => {
    it("Object parsing", () => {
        expect(
            JSON.parse(`
{
    "testnum": -99.3,
    "teststr": "Hello World 123 \\"\\"",
    "empty": null,
    "testbool1":true,
    "testbool2":      false,
    "testobj": {"a":1,"b":{"q":      "a","p":null     ,      "r":true},"c":"3"},
    "testarr": [123, "abcD 1234 \\"", true,false   , null, {}, [[  []] ]  , {"a":1,"b":{"q":"a","p":null  ,"r":true},"c":"3"}]
}
`)
        ).toEqual({
            "testnum": -99.3,
            "teststr": "Hello World 123 \"\"",
            "empty": null,
            "testbool1": true,
            "testbool2": false,
            "testobj": {"a": 1, "b": {"q": "a", "p": null, "r": true}, "c": "3"},
            "testarr": [123, "abcD 1234 \"", true, false, null, {}, [[[]]], {"a": 1, "b": {"q": "a", "p": null, "r": true}, "c": "3"}]
        });
    });

    it("Array parsing", () => {
        expect(
            JSON.parse(`
[123, "abcD 1234 \\"", true,false   , null, {}, [[  []] ]  , {"a":1,"b":{"q":"a","p":null  ,"r":true},"c":"3"}]
`)
        ).toEqual([123, "abcD 1234 \"", true, false, null, {}, [[[]]], {"a": 1, "b": {"q": "a", "p": null, "r": true}, "c": "3"}]);
    });

    it("Object stringify", () => {
        expect(JSON.stringify({
            "testnum": -99.3,
            "teststr": "Hello World 123 \"\"",
            "empty": null,
            "testbool1": true,
            "testbool2": false,
            "testobj": {"a": 1, "b": {"q": "a", "p": null, "r": true}, "c": "3"},
            "testarr": [123, "abcD 1234 \"", true, false, null, {}, [[[]]], {"a": 1, "b": {"q": "a", "p": null, "r": true}, "c": "3"}]
        })).toBe(`{"testnum":-99.3,"teststr":"Hello World 123 \\"\\"","empty":null,"testbool1":true,"testbool2":false,"testobj":{"a":1,"b":{"q":"a","p":null,"r":true},"c":"3"},"testarr":[123,"abcD 1234 \\"",true,false,null,{},[[[]]],{"a":1,"b":{"q":"a","p":null,"r":true},"c":"3"}]}`);
    });

    it("Array stringify", () => {
        expect(
            JSON.stringify([123, "abcD 1234 \"", true, false, null, {}, [[[]]], {"a": 1, "b": {"q": "a", "p": null, "r": true}, "c": "3"}])
        ).toBe(`[123,"abcD 1234 \\"",true,false,null,{},[[[]]],{"a":1,"b":{"q":"a","p":null,"r":true},"c":"3"}]`);
    });
});
