export enum TokenType {
    VALUE, OBJECT, ARRAY, ROOT
}

export abstract class Token<T> {
    public abstract readonly type: TokenType;
    
    protected constructor(public value: T) { }
}
