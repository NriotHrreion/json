const { JSON } = require("../build/json.js");

describe("General tests", () => {
    it("Object parsing", () => {
        expect(JSON.parse("{}")).toEqual({});
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
        expect(JSON.parse("[]")).toEqual([]);
        expect(
            JSON.parse(`
[123, "abcD 1234 \\"", true,false   , null, {}, [[  []] ]  , {"a":1,"b":{"q":"a","p":null  ,"r":true},"c":"3"}]
`)
        ).toEqual([123, "abcD 1234 \"", true, false, null, {}, [[[]]], {"a": 1, "b": {"q": "a", "p": null, "r": true}, "c": "3"}]);
    });

    it("Object stringifying", () => {
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

    it("Array stringifying", () => {
        expect(
            JSON.stringify([123, "abcD 1234 \"", true, false, null, {}, [[[]]], {"a": 1, "b": {"q": "a", "p": null, "r": true}, "c": "3"}])
        ).toBe(`[123,"abcD 1234 \\"",true,false,null,{},[[[]]],{"a":1,"b":{"q":"a","p":null,"r":true},"c":"3"}]`);
    });
});

/** @todo */
// describe("Special tests", () => {
//     it("Single value parsing", () => {
//         // String
//         expect(JSON.parse(`"Hello World"`)).toBe("Hello World");
//         // Number
//         expect(JSON.parse("123.5")).toBe(123.5);
//         expect(JSON.parse("-99.3")).toBe(-99.3);
//         // Boolean
//         expect(JSON.parse("true")).toBeTruthy();
//         expect(JSON.parse("false")).toBeFalsy();
//         // Null
//         expect(JSON.parse("null")).toBeNull();
//     });

//     it("Single value stringifying", () => {
//         // String
//         expect(JSON.stringify("Hello World")).toBe(`"Hello World"`);
//         // Number
//         expect(JSON.stringify(123.5)).toBe("123.5");
//         expect(JSON.stringify(-99.3)).toBe("-99.3");
//         // Boolean
//         expect(JSON.stringify(true)).toBe("true");
//         expect(JSON.stringify(false)).toBe("false");
//         // Null
//         expect(JSON.stringify(null)).toBe("null");
//     });
// });
