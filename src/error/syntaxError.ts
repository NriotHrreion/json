import { JSONError } from "./error";

export class SyntaxError extends JSONError {
    public constructor(message: string, where: number) {
        super("SyntaxError", message +" at "+ where +".");
    }
}
