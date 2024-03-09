import { JSONCompiler } from "./compiler";

export class JSON {
    public static parse<T = any>(str: string): T {
        var compiler = new JSONCompiler(str);
        return compiler.make();
    }

    public static stringify<T>(obj: T): string {
        return "";
    }
}
