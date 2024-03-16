import { JSONCompiler } from "./compiler";
import { JSONStringBuilder } from "./stringBuilder";

export class JSON {
    public static parse<T = any>(str: string): T {
        var compiler = new JSONCompiler(str);
        return compiler.make();
    }

    public static stringify<T extends Object>(obj: T): string {
        var sb = new JSONStringBuilder();

        if(Array.isArray(obj)) {
            sb.add("[");

            var arr = obj;
            arr.forEach((value, index) => {
                sb.pushValue(value);
                index !== arr.length - 1 && sb.add(",");
            });

            sb.add("]");
        } else {
            sb.add("{");

            for(let key in obj) {
                var value = obj[key];

                sb.add(`"${key}":`);
                sb.pushValue(value);
                sb.add(",");
            }

            if(sb.getChar(sb.length - 1) === ",") sb.remove(sb.length - 1); // remove the last comma
            sb.add("}");
        }

        return sb.getString();
    }
}
