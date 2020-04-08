import isPromise from 'is-promise';
import mapSeries from 'p-map-series';

function isFunction(fn: any) {
  return typeof fn === 'function';
}
export default function <T extends (...a: any[]) => any, R = any>(fns: Array<T>): ((...any: any[]) => Promise<R>) {
  if (!Array.isArray(fns)) {
    throw new TypeError('Expecting to be an array of function.');
  }

  const nonValidFn = fns.filter(fn => !isFunction(fn) || (!isFunction(fn) && !isPromise(fn)));
  if (nonValidFn.length > 0) {
    throw new TypeError('Expecting all item in array is a promise or a function')
  }

  return async (...args: any[]) => {
    const res = await mapSeries(fns, fn => fn.call(fn, args));
    return res[res.length - 1];
  }
}
