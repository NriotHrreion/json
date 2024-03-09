import { JSONToken, ArrayKey } from "./jsonToken";
import { TokenType } from "./token";

export class ArrayToken extends JSONToken<ArrayKey> {
    public readonly type: TokenType = TokenType.ARRAY;

    public static create(): JSONToken<ArrayKey> {
        return;
    }
}
