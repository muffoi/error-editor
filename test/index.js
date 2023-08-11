const ee = require("error-editor");

let ce = new ee.CaughtError('hi errors!');

ce.constr=Math;

ce.throw();