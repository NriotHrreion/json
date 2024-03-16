import { ValueType } from "./compiler";
import { ArrayToken } from "./token/arrayToken";
import { ObjectToken } from "./token/objectToken";
import { RootToken } from "./token/rootToken";
import { AllowableValueTypes, ValueToken } from "./token/valueToken";

export class TokenManager {
    private tree: RootToken;

    public createObjectTree(): void {
        this.tree = RootToken.createObjectRoot();
    }

    public createArrayTree(): void {
        this.tree = RootToken.createArrayRoot();
    }

    public getTree(): RootToken {
        return this.tree;
    }

    public pushObjectItem(key: string, value: string | ObjectToken<any> | ArrayToken<any>, type?: ValueType): void {
        if(typeof value === "string") {
            this.tree.push(new ValueToken(key, TokenManager.transformToType(value, type)));
        } else {
            this.tree.push(value);
        }
    }

    public pushArrayItem(value: string | ObjectToken<any> | ArrayToken<any>, type?: ValueType): void {
        if(typeof value === "string") {
            this.tree.push(TokenManager.transformToType(value, type));
        } else {
            this.tree.push(value);
        }
    }

    public isExist(key: string): boolean {
        if(this.tree.value.hasOwnProperty) return this.tree.value.hasOwnProperty(key);
    }

    public print(): void {
        console.log(this.tree);
    }

    public static transformToType(value: string, type: ValueType): AllowableValueTypes {
        switch(type) {
            case ValueType.STRING:
                return value;
            case ValueType.NUMBER:
                return parseFloat(value);
            case ValueType.BOOLEAN:
                return value === "true" ? true : false;
            case ValueType.NULL:
                return null;
        }
    }
}
