import { RootToken } from "./rootToken";
import { ValueToken } from "./valueToken";

export type ObjectLike = { [key: string]: ValueToken<any> };
export type ArrayLike = RootToken<any>[];
export type AnyLike = ObjectLike | ArrayLike;

export enum JSONValueType {
    OBJECT, ARRAY
}

export abstract class JSONToken<O extends AnyLike> extends ValueToken<O> {
    public abstract push(value: ValueToken<any>): void;

    public forEach(cb: (value: ValueToken<any>) => void): void {
        for(let key in this.value) {
            cb(this.value[key] as ValueToken<any>);
        }
    }
}
