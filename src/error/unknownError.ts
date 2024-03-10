import { JSONError } from "./error";

export class UnknownError extends JSONError {
    public constructor(message: string, where: number) {
        super("UnknwonError", message +" at "+ where +".");
    }
}
