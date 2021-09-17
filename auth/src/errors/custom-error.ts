// Used abstract class to fullfill the requirements
export abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string){
        super(message)
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    // Returns arrays of objects (field is optional)
    abstract serializeErrors(): {message: string, field?: string}[]
}