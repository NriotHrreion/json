import { ArrayToken } from "./arrayToken";
import { AnyLike, ArrayLike, JSONToken, JSONValueType, ObjectLike } from "./jsonToken";
import { ObjectToken } from "./objectToken";
import { TokenType } from "./token";
import { AllowableValueTypes, ValueToken } from "./valueToken";

const rootKey = "\\";

export class RootToken<T extends AnyLike = AnyLike> extends JSONToken<T> {
    public readonly type: TokenType = TokenType.ROOT;

    private mode: JSONValueType;

    private constructor(key: string, value: T) {
        super(key, value);

        this.mode = Array.isArray(value) ? JSONValueType.ARRAY : JSONValueType.OBJECT;
    }

    public static createObjectRoot<T extends ObjectLike>(): RootToken<T> {
        return new RootToken(rootKey, {} as T);
    }

    public static createArrayRoot<T extends ArrayLike>(): RootToken<T> {
        return new RootToken(rootKey, [] as T);
    }

    public push(value: ValueToken<any> | AllowableValueTypes): void {
        this.mode === JSONValueType.ARRAY
        ? (this.value as ArrayLike).push(value)
        : this.value[(value as ValueToken<any>).key] = value;
    }

    public unsafeToObjectToken(key: string): ObjectToken<ObjectLike> {
        var token = ObjectToken.create(key);
        token.value = this.value as ObjectLike;
        return token;
    }

    public unsafeToArrayToken(key: string): ArrayToken<ArrayLike> {
        var token = ArrayToken.create(key);
        token.value = this.value as ArrayLike;
        return token;
    }
}
