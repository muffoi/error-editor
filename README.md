# error-editor ![NPM Package Version](https://img.shields.io/npm/v/error-editor?style=flat-square&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ferror-editor)
Catches errors from functions and promises, allows edits of errors, and throws them again.  
![Dependents](https://img.shields.io/librariesio/dependents/npm/error-editor?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ferror-editor%3FactiveTab%3Ddependents)
<!-- ![Downloads](https://img.shields.io/npm/dt/error-editor) -->

<h2 id="install">Installation</h2>

Through NPM:
```bash
npm install error-editor
```



<h2 id="use">Usage</h2>

Require with CommonJS:
```javascript
const errorEditor = require("error-editor");
```
Or with ES6 `import`:
```javascript
import * as errorEditor from "error-editor";
```



<h2 id="docs">Documentation</h2>

- [`errorEditor.catchError()`](#ee-ce)
- [`errorEditor.catchErrorSync()`](#ee-ces)
- [class `errorEditor.CaughtError`](#ce)
    - [`CaughtError` constructor](#ce-const)
    - [`CaughtError.message`](#ce-msg)
    - [`CaughtError.constr`](#ce-constr)
    - [`CaughtError.throw()`](#ce-throw)
- [`errorEditor.version`](#ee-ver)


<h3 id="ee-ce"><code>errorEditor.catchError(value, ...params)</code> <small><i>from <code>v1.0.0</code></i></small></h3>

**Parameters:**  
- `value: Function|Promise|PromiseLike` - A *function* or a *promise* to catch error from.
- `params: any[]` - Parameters to pass into `value` when called (if `value` is a *function*). *Optional.*

Catches an error from `value` parameter and returns a *promise* that resolves to it's [`CaughtError`](#ce) form, if no error occurs, *promise* resolves to `value`'s return/resolve value.  
If the `value` argument is not a function or a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables" target="_blank">thenable</a>, a `TypeError` will be thrown.

***Note:** `throw` statements that are not called with, and `Promise` rejects with something else than an `Error` or its child are considered as `Error` object with `message` set to that value.*

**Usage:**
```javascript
let foo = async (x = "world") => `Hello, ${x}!`;

let value = await errorEditor.catchError(foo);
value; // "Hello, world!"


let bar = (x = "world") => `Hello, ${x}!`;

let value2 = await errorEditor.catchError(foo, "user");
value2; // "Hello, user!"


let baz = Promise.reject("Error appeared!");

let err = await errorEditor.catchError(baz);
err; // CaughtError {constr: Error, message: "Error appeared!"}
```


<h3 id="ee-ces"><code>errorEditor.catchErrorSync(value, ...params)</code> <small><i>from <code>v1.0.0</code></i></small></h3>

**Parameters:**  
- `value: Function` - A *function* to catch error from. **Warning: Async functions not supported.** 
- `params: any[]` - Parameters to pass into `value` when called. *Optional.*

Catches an error from `value` parameter and returns it's [`CaughtError`](#ce) form, if no error occurs, returns `value`'s return value. *[`errorEditor.catchError()`](#ee-ce)'s sync version.*  
If the `value` argument is not a function, a `TypeError` will be thrown.  
**Usage:**
```javascript
let foo = (x = "world") => `Hello, ${x}!`;

let value = errorEditor.catchErrorSync(foo);
value; // "Hello, world!"


let bar = (x = "world") => `Hello, ${x}!`;

let value2 = errorEditor.catchErrorSync(foo, "user");
value2; // "Hello, user!"


let baz = () => {
    throw new Error("Error appeared!");
};

let err = errorEditor.catchErrorSync(baz);
err; // CaughtError {constr: Error, message: "Error appeared!"}
```


<h3 id="ce">class <code>errorEditor.CaughtError</code> <small><i>from <code>v1.0.0</code></i></small></h3>
<h3 id="ce-const">class constructor</h3>

**Parameters:**
- `message: string|void` - Error's `message` property. *Defaults to `""` (empty string).*
- `constr: NewableFunction|void` - Error's constructor. *Defaults to `Error`.*
If the `constr` argument is not a newable, a `TypeError` will be thrown.


<h3 id="ce-msg"><code>CaughtError.message</code> <small><i>from <code>v1.0.0</code></i></small></h3>

Error message used to construct the error. *Editable.*


<h3 id="ce-constr"><code>CaughtError.constr</code> <small><i>from <code>v1.0.0</code></i></small></h3>

Error constructor used to construct the error. *Editable.*


<h3 id="ce-throw"><code>CaughtError.throw()</code> <small><i>from <code>v1.0.0</code></i></small></h3>

Throws an error based on instance's properties. The `message` property will be stringified.  
If the `constr` property is not a newable, a `TypeError` will be thrown.


<h3 id="ee-ver"><code>errorEditor.version</code> <small><i>from <code>v1.0.0</code></i></small></h3>

Contains `error-editor` package version info. *Read-only.*
