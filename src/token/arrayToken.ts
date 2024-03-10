import { JSONToken, ArrayLike } from "./jsonToken";
import { RootToken } from "./rootToken";
import { TokenType } from "./token";

export class ArrayToken<O extends ArrayLike> extends JSONToken<O> {
    public readonly type: TokenType = TokenType.ARRAY;

    public static create(): ArrayToken<ArrayLike> {
        return;
    }

    public push(value: RootToken<any>): void {
        this.value.push(value);
    }
}
