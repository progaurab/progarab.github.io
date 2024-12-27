# Understanding JavaScript Closures

A closure is the combination of a function and the lexical environment within which that function was declared...

## More Information

- **JavaScript**: Closures are an important feature of JavaScript.
- **Example**:
  ```javascript
  function outer() {
    let count = 0;
    return function inner() {
      count++;
      console.log(count);
    }
  }
  const counter = outer();
  counter(); // 1
  counter(); // 2
