const CaughtError = class CaughtError {
    constructor(message="",constr=Error){
        try {throw new constr()} catch(e) {
            if(e.name=="TypeError"&&e.message=="constr is not a constructor") throw new TypeError("'constr' argument is not a constructor")
        }
        this.message=message;
        this.constr=constr;
    }
    throw(){
        try {throw new this.constr()} catch(e) {
            if(e.name=="TypeError"&&e.message=="this.constr is not a constructor") throw new TypeError("'constr' property is not a constructor")
        }
        let msg = this.message.toString();
        throw new this.constr(msg);
    }
}

const _EE = new class ErrorEditor {
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

for (let i in _EE) {
    Object.defineProperty(_EE, i, {
        writable:false,
        configurable:false
    });
    let tp = typeof _EE[i];
    if(tp == "function"||tp == "object") Object.freeze(_EE[i]);
}

Object.freeze(_EE);

module.exports = _EE;