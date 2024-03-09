import { AnyKey, JSONToken, JSONValueType } from "./jsonToken";
import { TokenType } from "./token";
import { ValueToken } from "./valueToken";

const rootKey = "\\";

export class RootToken<T extends AnyKey = AnyKey> extends JSONToken<T> {
    public readonly type: TokenType = TokenType.ROOT;

    public static create<T extends AnyKey>(): RootToken<T> {
        return new RootToken(rootKey, new Map());
    }
}
