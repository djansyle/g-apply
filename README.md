# g-apply
A simple utility that applies the, function's parameter to series of function serially and returns only the last function result.

Ex:
```javascript
function foo(num) {
  console.log('just logging foo: ', num);
}

function bar(num) {
  return num + 2;
}

console.log(apply([foo, bar])(5));
// just logging foo: 5
// 7
```