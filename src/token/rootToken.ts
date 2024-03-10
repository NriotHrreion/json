import { AnyLike, ArrayLike, JSONToken, JSONValueType, ObjectLike } from "./jsonToken";
import { ObjectToken } from "./objectToken";
import { TokenType } from "./token";
import { ValueToken } from "./valueToken";

const rootKey = "\\";

export class RootToken<T extends AnyLike = AnyLike> extends JSONToken<T> {
    public readonly type: TokenType = TokenType.ROOT;

    public static createObjectRoot<T extends ObjectLike>(): RootToken<T> {
        return new RootToken(rootKey, {} as T);
    }

    public static createArrayRoot<T extends ArrayLike>(): RootToken<T> {
        return new RootToken(rootKey, [] as T);
    }

    public push(value: ValueToken<any>): void {
        this.value[value.key] = value;
    }

    public unsafeToObjectToken(key: string): ObjectToken<ObjectLike> {
        var token = ObjectToken.create(key);
        token.value = this.value as ObjectLike;
        return token;
    }
}
