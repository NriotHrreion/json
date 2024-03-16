export class JSONStringBuilder {
    private str: string;

    public constructor() {
        this.str = ""; // init
    }

    public get length(): number {
        return this.str.length;
    }

    public add(char: string): void {
        this.str += char;
    }

    public getChar(index: number): string {
        return this.str[index];
    }

    public remove(index: number): void {
        this.str = this.str.slice(0, index) + this.str.slice(index + 1, this.length);
    }

    public pushValue(value: any): void {
        switch(typeof value) {
            case "string":
                this.add(`"${value}"`);
                break;
            case "number":
                this.add(value.toString());
                break;
            case "boolean":
                this.add(value === true ? "true" : "false");
                break;
            default:
                if(value === null) {
                    this.add("null");
                } else {
                    this.add(JSON.stringify(value));
                }
                break;
        }
    }

    public getString(): string {
        return this.str;
    }
}
