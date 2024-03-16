import { JSONToken, ArrayLike } from "./jsonToken";
import { RootToken } from "./rootToken";
import { TokenType } from "./token";

export class ArrayToken<O extends ArrayLike> extends JSONToken<O> {
    public readonly type: TokenType = TokenType.ARRAY;

    public static create(key: string): ArrayToken<ArrayLike> {
        return new ArrayToken(key, []);
    }

    public push(value: RootToken<any>): void {
        this.value.push(value);
    }

    public toRootToken(): RootToken<ArrayLike> {
        var token = RootToken.createArrayRoot();
        token.value = this.value as ArrayLike;
        return token;
    }
}
