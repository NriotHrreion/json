import { Token, TokenType } from "./token";

export type AllowableValueTypes = string | number | boolean | null;

export class ValueToken<T> extends Token<T> {
    public readonly type: TokenType = TokenType.VALUE;
    
    public constructor(public key: string, value: T) {
        super(value);
    }
}
