import { ArrayKey, JSONValueType, ObjectKey } from "./token/jsonToken";
import { TokenManager } from "./tokenManager";

/** @todo backslash escaping */

enum Flag {
    LEFT_BRACE = 123, // {
    RIGHT_BRACE = 125, // }
    LEFT_BRACKET = 91, // [
    RIGHT_BRACKET = 93, // ]
    SINGLE_QUOTE = 39, // '
    DOUBLE_QUOTE = 34, // "
    COLON = 58, // :
    COMMA = 44, // ,
    SPACE = 32, //  
    SLASH = 47, // /
    BACKSLASH = 92, // \
    UNDERSCORE = 95, // _
    HYPHEN = 45, // -
}

enum Keyword {
    TRUE = "true",
    FALSE = "false",
    NULL = "null",
}

export enum ValueType {
    STRING, NUMBER, BOOLEAN, NULL
}

export class JSONCompiler<T = any> {
    private tokenMgr: TokenManager;

    private mode: JSONValueType;
    private layer: number = 0;
    private atKey: boolean = false;
    private atValue: boolean = false;
    private atString: boolean = false;
    private atNumber: boolean = false;

    private tempKey: string = "";
    private tempValue: string = ""; // for any type
    private tempValueType: ValueType;
    private tempKeyword: Keyword;

    public constructor(private jsonStr: string) {
        this.tokenMgr = new TokenManager();

        this.tokenize();
        this.tokenMgr.print(); // for dev
    }

    public tokenize(): void {
        for(let i = 0; i < this.jsonStr.length; i++) {
            const symbol = this.jsonStr[i];
            const code = symbol.charCodeAt(0);

            switch(code) {
                case Flag.LEFT_BRACE:
                    this.layer++;
                    if(i === 0) {
                        this.tokenMgr.createTree<ObjectKey>();
                        this.mode = JSONValueType.OBJECT;
                    }
                    break;
                case Flag.LEFT_BRACKET:
                    this.layer++;
                    if(i === 0) {
                        this.tokenMgr.createTree<ArrayKey>();
                        this.mode = JSONValueType.ARRAY;
                    }
                    break;
                case Flag.RIGHT_BRACE:
                    this.layer--;

                    if(this.atValue) this.atValue = false; // value end
                    this.pushObjectItem();
                    break;
                case Flag.RIGHT_BRACKET:
                    this.layer--;
                    break;
                case Flag.DOUBLE_QUOTE:
                    if(!this.atValue && !this.atKey) { // key start
                        this.atKey = true;
                    } else if(!this.atValue && this.atKey) { // key end
                        this.atKey = false;
                    } else if(this.atValue && !this.atString) { // string start
                        this.atString = true;
                        this.tempValueType = ValueType.STRING;
                    } else if(this.atValue && this.atString) { // string end
                        this.atString = false;
                    } else {
                        // @error unexpected quote
                    }
                    break;
                case Flag.COLON:
                    if(!this.atKey) this.atValue = true; // value start
                    break;
                case Flag.COMMA:
                    if(this.atValue) this.atValue = false; // value end
                    this.pushObjectItem();
                    break;
                /* Number */
                case 48: // 0
                case 49: // 1
                case 50: // 2
                case 51: // 3
                case 52: // 4
                case 53: // 5
                case 54: // 6
                case 55: // 7
                case 56: // 8
                case 57: // 9
                    if(!this.atValue || !this.atNumber) {
                        // @error unexpected number
                    }

                    if(this.tempValue.length === 0) this.tempValueType = ValueType.NUMBER; // number start
                    this.tempValue += symbol;
                    break;
                /* String */
                default:
                    if(this.atKey) {
                        this.tempKey += symbol;
                    } else if(this.atValue && this.atString) {
                        this.tempValue += symbol;
                    } else if(
                        this.atValue &&
                        code === 116                              /*t*/ &&
                        this.jsonStr[i + 1].charCodeAt(0) === 114 /*r*/ &&
                        this.jsonStr[i + 2].charCodeAt(0) === 117 /*u*/ &&
                        this.jsonStr[i + 3].charCodeAt(0) === 101 /*e*/
                    ) {
                        this.tempValueType = ValueType.BOOLEAN;
                        this.tempKeyword = Keyword.TRUE;
                        i += 3;
                        continue;
                    } else if(
                        this.atValue &&
                        code === 102                              /*f*/ &&
                        this.jsonStr[i + 1].charCodeAt(0) === 97  /*a*/ &&
                        this.jsonStr[i + 2].charCodeAt(0) === 108 /*l*/ &&
                        this.jsonStr[i + 3].charCodeAt(0) === 115 /*s*/ &&
                        this.jsonStr[i + 4].charCodeAt(0) === 101 /*e*/
                    ) {
                        this.tempValueType = ValueType.BOOLEAN;
                        this.tempKeyword = Keyword.FALSE;
                        i += 4;
                        continue;
                    } else if(
                        this.atValue &&
                        code === 110                              /*n*/ &&
                        this.jsonStr[i + 1].charCodeAt(0) === 117 /*u*/ &&
                        this.jsonStr[i + 2].charCodeAt(0) === 108 /*l*/ &&
                        this.jsonStr[i + 3].charCodeAt(0) === 108 /*l*/
                    ) {
                        this.tempValueType = ValueType.NULL;
                        this.tempKeyword = Keyword.NULL;
                        i += 3;
                        continue;
                    } else if(!this.atValue && code === Flag.SPACE) {
                        continue;
                    } else {
                        // @error unexpected char
                    }
                    break;
            }
        }
    }

    private pushObjectItem(): void {
        this.tokenMgr.pushObjectItem(this.tempKey, this.tempValue, this.tempValueType);
        this.tempKey = "";
        this.tempValue = "";
        this.tempValueType = undefined;
    }

    public make(): T {
        if(this.mode === JSONValueType.OBJECT) return this.makeObject();
        if(this.mode === JSONValueType.ARRAY) return this.makeArray();
    }

    private makeObject(): T {
        const tree = this.tokenMgr.getTree();
        var obj = new Object();

        tree.forEach((key: ObjectKey, token) => {
            obj[token.key] = token.value;
        });

        return obj as T;
    }

    private makeArray(): T {
        const tree = this.tokenMgr.getTree();
        var arr = new Array();

        tree.forEach((key: ArrayKey, token) => {
            arr[key] = token.value;
        });

        return arr as T;
    }
}
