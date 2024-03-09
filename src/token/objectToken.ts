import { JSONToken, ObjectKey } from "./jsonToken";
import { TokenType } from "./token";

export class ObjectToken extends JSONToken<ObjectKey> {
    public readonly type: TokenType = TokenType.OBJECT;

    public static create(): JSONToken<ObjectKey> {
        return;
    }
}
