import { JSONToken, ObjectLike } from "./jsonToken";
import { RootToken } from "./rootToken";
import { TokenType } from "./token";
import { ValueToken } from "./valueToken";

export class ObjectToken<O extends ObjectLike> extends JSONToken<O> {
    public readonly type: TokenType = TokenType.OBJECT;

    public static create(key: string): ObjectToken<ObjectLike> {
        return new ObjectToken(key, {});
    }

    public push(value: ValueToken<any>): void {
        (this.value as ObjectLike)[value.key] = value;
    }

    public toRootToken(): RootToken<ObjectLike> {
        var token = RootToken.createObjectRoot();
        token.value = this.value as ObjectLike;
        return token;
    }
}
