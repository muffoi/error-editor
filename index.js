const CaughtError = class CaughtError {
    constructor(message="",constr=Error){
        let cons=constr;
        try {new cons()} catch(e) {
            cons=Error;
        }
        this.message=message;
        this.constr=cons;
    }
    throw(){
        let constr = this.constr;
        try {new constr()} catch(e) {
            constr = Error;
        }
        let msg = this.message.toString();
        throw new constr(msg);
    }
}

const _EXPORT = new class ErrorEditor {
    async catchError(value,...params) {
        if(typeof value!="function"&&typeof value!="object"&&typeof value.then!="function")
          throw new TypeError("Argument 'func' is not of type 'function' or a thenable");

        let result;
        try {
            let res = await (typeof value=="function"?value(...params):value);

            if (res instanceof Error) {
                throw res;
            }

            result = res;
        } catch(err) {
            result = new this.CaughtError(err.message,globalThis[err.name]);
        }

        return result;
    }

    catchErrorSync(value,...params) {
        if(typeof value!="function")
          throw new TypeError("Argument 'func' is not of type 'function'");

        let result;
        try {
            let res = value(...params);

            if (res instanceof Error) {
                throw res;
            }

            result = res;
        } catch(err) {
            let er = err instanceof Error?err:{name:'Error',message:err.toString()};
            result = new CaughtError(er.message,globalThis[er.name]);
        }

        return result;
    }

    CaughtError = CaughtError

    version = require("./package.json").version
}

for (let i in _EXPORT) {
    Object.defineProperty(_EXPORT, i, {
        writable:false,
        configurable:false
    });
    let tp = typeof _EXPORT[i];
    if(tp == "function"||tp == "object") Object.freeze(_EXPORT[i]);
}

Object.freeze(_EXPORT);

module.exports = _EXPORT;