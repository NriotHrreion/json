import { ValueType } from "./compiler";
import { AnyKey } from "./token/jsonToken";
import { RootToken } from "./token/rootToken";
import { AllowableValueTypes, ValueToken } from "./token/valueToken";

export class TokenManager {
    private tree: RootToken;

    public createTree<T extends AnyKey>(): void {
        if(this.tree) return;

        this.tree = RootToken.create<T>();
    }

    public getTree(): RootToken {
        return this.tree;
    }

    public pushObjectItem(key: string, value: string, type: ValueType): void {
        if(this.isExist(key)) return; // @error
        this.tree.value.set(key, new ValueToken(key, this.transformToType(value, type)));
    }

    public pushArrayValue(value: string, type: ValueType): void {
        /** @todo */
    }

    public isExist(key: string): boolean {
        return this.tree.value.has(key);
    }

    public print(): void {
        console.log(this.tree);
    }

    private transformToType(value: string, type: ValueType): AllowableValueTypes {
        switch(type) {
            case ValueType.STRING:
                return value;
            case ValueType.NUMBER:
                return parseFloat(value);
            case ValueType.BOOLEAN:
                return !!value;
            case ValueType.NULL:
                return null;
        }
    }
}
