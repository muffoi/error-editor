declare module "error-editor" {

    /**
     * Catches an error from `value` parameter and returns a *promise* that resolves to it's `CaughtError` form.
     * @param value A *function* or a *promise* to catch error from.
     * @param params Parameters to pass into `value` when called (if `value` is a *function*). *Optional.*
     * @returns A *promise* that resolves to `CaughtError` form of caught error, 
     * if no error occured resolves to `value`'s return/resolve value.
     */
    function catchError(
        value:Function|Promise<T>|PromiseLike<T>,
        ...params:any[]
    ):Promise<T|CaughtError>

    /**
     * Sync version of the `catchError` function.
     * @param value A *function* to catch error from. **Warning:** Async functions not supported.
     * @param params Parameters to pass into `value` when called. *Optional.*
     * @returns `CaughtError` form of caught error, 
     * if no error occured `value`'s return value.
     */
    function catchErrorSync(
        value:Function,
        ...params:any[]
    ):T|CaughtError

    class CaughtError {

        /**
         * Constructs a new  `CaughtError` instance.
         * @param message The message passed to the error constructor. *Defaults to `""` (empty string).*
         * @param constr The error constructor used to construct the error. *Defaults to `Error`.*
         * @returns New `CaughtError` instance.
         */
        constructor(message:string|void,constr:NewableFunction|void)

        /**
         * Throws an error based on data stored in `CaughtError` object.
         * @throws An error.
         */
        throw():never

        /**
         * The message passed to the error constructor.
         */
        message:string
    
        /**
         * The error constructor used to construct the error.
        */
        constr:NewableFunction

    }

    /**
     * Contains `error-editor` package version info.
     */
    const version:string
}

type T = any;