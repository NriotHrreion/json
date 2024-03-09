import { ValueToken } from "./valueToken";

export type ObjectKey = string;
export type ArrayKey = number;
export type AnyKey = ObjectKey | ArrayKey;

export enum JSONValueType {
    OBJECT, ARRAY
}

export abstract class JSONToken<K> extends ValueToken<Map<K, ValueToken<any>>> {
    public forEach(cb: (key: K, value: ValueToken<any>) => void): void {
        this.value.forEach((value, key) => cb(key, value));
    }
}
