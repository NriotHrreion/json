export abstract class JSONError extends Error {
    protected constructor(
        public type: string,
        public message: string
    ) {
        super(`JSON ${type}: ${message}`);
    }
}
