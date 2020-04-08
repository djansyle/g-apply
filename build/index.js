"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_promise_1 = __importDefault(require("is-promise"));
const p_map_series_1 = __importDefault(require("p-map-series"));
function isFunction(fn) {
    return typeof fn === 'function';
}
function default_1(fns) {
    if (!Array.isArray(fns)) {
        throw new TypeError('Expecting to be an array of function.');
    }
    const nonValidFn = fns.filter(fn => !isFunction(fn) || (!isFunction(fn) && !is_promise_1.default(fn)));
    if (nonValidFn.length > 0) {
        throw new TypeError('Expecting all item in array is a promise or a function');
    }
    return async (...args) => {
        const res = await p_map_series_1.default(fns, fn => fn.call(fn, args));
        return res[res.length - 1];
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map