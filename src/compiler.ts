import { JSONValueType } from "./token/jsonToken";
import { TokenManager } from "./tokenManager";
import { SyntaxError } from "./error/syntaxError";

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
    POINT = 46, // .
    SPACE = 32, //  
    SLASH = 47, // /
    BACKSLASH = 92, // \
    UNDERSCORE = 95, // _
    HYPHEN = 45, // -
    NEWLINE = 10, // \n
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
    private atObject: boolean = false;
    private atArray: boolean = false;

    private tempKey: string = "";
    private tempValue: string = ""; // for any type
    private tempValueType: ValueType;
    private tempLayer: number;
    private tempObject: string = "";
    private tempArray: string = "";

    public constructor(private jsonStr: string) {
        this.tokenMgr = new TokenManager();

        this.jsonStr = this.jsonStr.trim();

        this.tokenize();
        this.tokenMgr.print(); // for dev
    }

    public tokenize(): void {
        for(let i = 0; i < this.jsonStr.length; i++) {
            const symbol = this.jsonStr[i];
            const code = this.getCharCode(i);

            if(this.atObject) {
                this.tempObject += symbol;

                switch(code) {
                    case Flag.LEFT_BRACE:
                    case Flag.LEFT_BRACKET:
                        this.layer++;
                        break;
                    case Flag.RIGHT_BRACE:
                    case Flag.RIGHT_BRACKET:
                        if(this.layer === this.tempLayer) {
                            this.atObject = false;
                            this.tempLayer = undefined;
                        }
                        this.layer--;
                        break;
                }
                continue;
            }

            switch(code) {
                case Flag.LEFT_BRACE:
                    this.layer++;
                    if(i === 0) {
                        this.tokenMgr.createObjectTree();
                        this.mode = JSONValueType.OBJECT;
                    } else if(!this.atObject) { // object start
                        this.atObject = true;
                        this.tempLayer = this.layer;
                        this.tempObject += symbol;
                    }
                    break;
                case Flag.LEFT_BRACKET:
                    this.layer++;
                    if(i === 0) {
                        this.tokenMgr.createArrayTree();
                        this.mode = JSONValueType.ARRAY;
                    }
                    break;
                case Flag.RIGHT_BRACE:
                    if(this.atValue && this.tempObject.length === 0) {
                        this.atNumber = false; // number end
                        this.atValue = false; // value end
                        this.pushObjectItem();
                    } else if(this.tempObject.length !== 0) { // object end
                        this.pushObject();
                    }

                    this.layer--;
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
                        throw new SyntaxError("Unexpected quote", i);
                    }
                    break;
                case Flag.COLON:
                    if(!this.atKey) this.atValue = true; // value start
                    break;
                case Flag.COMMA:
                    if(this.atValue && this.tempObject.length === 0 && this.tempArray.length === 0) {
                        this.atNumber = false; // number end
                        this.atValue = false; // value end
                        this.pushObjectItem();
                    } else if(this.tempObject.length !== 0) { // object end
                        this.atValue = false;
                        this.pushObject();
                    } else if(this.tempArray.length !== 0) { // array end
                        this.atValue = false;
                        /** @todo */
                    } else {
                        throw new SyntaxError("Unexpected comma", i);
                    }
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
                    if(!this.atValue && !this.atNumber) {
                        throw new SyntaxError("Unexpected number \""+ symbol +"\"", i);
                    }

                    if(this.atString) {
                        this.tempValue += symbol;
                        continue;
                    }

                    if(this.tempValue.length === 0) { // number start
                        this.tempValueType = ValueType.NUMBER;
                        this.atNumber = true;
                    }
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
                        !this.atString &&
                        code === Flag.HYPHEN
                    ) { // negative sign
                        if(this.tempValue.length !== 0) {
                            throw new SyntaxError("Invalid number", i);
                        }
                        this.tempValueType = ValueType.NUMBER;
                        this.atNumber = true;
                        this.tempValue += symbol;
                    } else if(
                        this.atValue &&
                        this.atNumber &&
                        code === Flag.POINT
                    ) {
                        if(this.tempValue.includes(".")) {
                            throw new SyntaxError("Invalid number", i);
                        }
                        this.tempValue += symbol;
                    } else if(
                        this.atValue &&
                        code === 116                    /*t*/ &&
                        this.getCharCode(i + 1) === 114 /*r*/ &&
                        this.getCharCode(i + 2) === 117 /*u*/ &&
                        this.getCharCode(i + 3) === 101 /*e*/
                    ) {
                        this.tempValueType = ValueType.BOOLEAN;
                        this.tempValue = Keyword.TRUE;
                        i += 3;
                        continue;
                    } else if(
                        this.atValue &&
                        code === 102                    /*f*/ &&
                        this.getCharCode(i + 1) === 97  /*a*/ &&
                        this.getCharCode(i + 2) === 108 /*l*/ &&
                        this.getCharCode(i + 3) === 115 /*s*/ &&
                        this.getCharCode(i + 4) === 101 /*e*/
                    ) {
                        this.tempValueType = ValueType.BOOLEAN;
                        this.tempValue = Keyword.FALSE;
                        i += 4;
                        continue;
                    } else if(
                        this.atValue &&
                        code === 110                    /*n*/ &&
                        this.getCharCode(i + 1) === 117 /*u*/ &&
                        this.getCharCode(i + 2) === 108 /*l*/ &&
                        this.getCharCode(i + 3) === 108 /*l*/
                    ) {
                        this.tempValueType = ValueType.NULL;
                        this.tempValue = Keyword.NULL;
                        i += 3;
                        continue;
                    } else if(code === Flag.SPACE || code === Flag.NEWLINE) {
                        continue;
                    } else {
                        throw new SyntaxError("Unexpected char \""+ symbol +"\"", i);
                    }
                    break;
            }
        }
    }

    private getCharCode(index: number): number {
        return this.jsonStr[index].charCodeAt(0);
    }

    private pushObjectItem(): void {
        this.tokenMgr.pushObjectItem(this.tempKey, this.tempValue, this.tempValueType);
        this.tempKey = "";
        this.tempValue = "";
        this.tempValueType = undefined;
    }

    private pushObject(): void {
        var compiler = new JSONCompiler(this.tempObject);
        this.tokenMgr.pushObjectItem(this.tempKey, compiler.tokenMgr.getTree().unsafeToObjectToken(this.tempKey));
        this.tempKey = "";
        this.tempObject = "";
    }

    public make(): T {
        if(this.mode === JSONValueType.OBJECT) return this.makeObject();
        if(this.mode === JSONValueType.ARRAY) return this.makeArray();
    }

    private makeObject(): T {
        const tree = this.tokenMgr.getTree();
        var obj = new Object();

        tree.forEach((token) => {
            var value = token.value;

            obj[token.key] = value;
        });

        return obj as T;
    }

    private makeArray(): T {
        const tree = this.tokenMgr.getTree();
        var arr = new Array();

        tree.forEach((token) => {
            arr[token.key] = token.value;
        });

        return arr as T;
    }
}
