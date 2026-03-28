# JS_runtime_mental_model.md

## JavaScript Runtime Mental Model

A compact one-pager for interviews and real debugging.

---

## 1. The core idea

JavaScript is:

- single-threaded at the language execution level
- event-driven
- dynamically typed
- lexically scoped
- prototype-based

TypeScript does **not** change JavaScript runtime behavior.  
It only adds compile-time checking.

So the right mental model is:

**First understand how JavaScript executes. Then layer TypeScript types on top.**

---

## 2. Execution happens in two broad phases

A useful simplification:

### Phase 1: setup / creation
JavaScript registers declarations before line-by-line execution starts.

This is why hoisting exists.

### Phase 2: execution
Then code runs top to bottom.

But not all declarations behave the same.

---

## 3. Hoisting: what actually happens

### `var`
- declaration is hoisted
- initialized to `undefined`

Example:

```js
console.log(x); // undefined
var x = 10;
```

Conceptually:

```js
var x;
console.log(x);
x = 10;
```

### `let` and `const`
- declaration is hoisted
- but not initialized for access
- they exist in the **Temporal Dead Zone** until execution reaches the declaration

Example:

```js
console.log(y); // ReferenceError
let y = 20;
```

### function declarations
They are hoisted with their implementation.

```js
sayHi(); // works

function sayHi() {
  console.log("hi");
}
```

### function expressions
They behave according to the variable used to store them.

```js
greet(); // error
const greet = function () {};
```

---

## 4. Temporal Dead Zone (TDZ)

The TDZ is the period between entering scope and reaching the `let` or `const` declaration.

During that window, access is illegal.

This is why:

```js
{
  console.log(a); // ReferenceError
  let a = 5;
}
```

This is one of the most tested interview concepts.

---

## 5. Scope model

JavaScript uses **lexical scope**.

That means scope is determined by where code is written, not where it is called from.

### `var`
- function-scoped

### `let` and `const`
- block-scoped

Example:

```js
if (true) {
  var a = 1;
  let b = 2;
}

console.log(a); // 1
console.log(b); // ReferenceError
```

---

## 6. Redeclaration vs reassignment

### `var`
- can be redeclared in the same scope
- can be reassigned

```js
var x = 1;
var x = 2; // allowed
x = 3;     // allowed
```

### `let`
- cannot be redeclared in the same scope
- can be reassigned

```js
let y = 1;
y = 2; // allowed
// let y = 3; // error
```

### `const`
- cannot be redeclared in the same scope
- cannot be reassigned

```js
const z = 1;
// z = 2; // error
```

Important nuance:

`const` does **not** make objects deeply immutable.

```js
const obj = { a: 1 };
obj.a = 2; // allowed
```

It only means the binding cannot point to a different object.

---

## 7. Does JavaScript “read the whole file and keep the last declaration”?

Not exactly.

More accurate model:

- declarations are processed before execution
- hoisting rules differ by declaration type
- execution still happens top to bottom
- redeclaration rules depend on `var`, `let`, `const`, and scope boundaries

So this statement is too simplistic and often wrong.

---

## 8. Closures

A closure is when a function retains access to variables from its lexical scope even after the outer function has returned.

Example:

```js
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

Why this matters:
- private state
- callbacks
- async behavior
- interview favorite

---

## 9. `this` mental model

`this` is determined by **how a function is called**, not where it is defined.

### Regular function
`this` depends on the call site.

### Arrow function
Arrow functions do **not** get their own `this`.  
They capture `this` lexically from the surrounding scope.

Example:

```js
const obj = {
  name: "Santosh",
  regular() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this);
  }
};
```

Interview rule of thumb:
- use regular methods for object methods when you need object-bound `this`
- use arrows when you want lexical `this`

---

## 10. Primitives vs objects

Primitive values:
- string
- number
- boolean
- null
- undefined
- bigint
- symbol

Objects:
- object literals
- arrays
- functions
- dates
- maps
- sets

### Primitive assignment
Copies the value.

```js
let a = 10;
let b = a;
b = 20;

console.log(a); // 10
```

### Object assignment
Copies the reference to the same object.

```js
const x = { value: 1 };
const y = x;
y.value = 99;

console.log(x.value); // 99
```

This is a huge debugging concept.

---

## 11. Equality: `==` vs `===`

### `===`
Strict equality
- no coercion

### `==`
Loose equality
- allows coercion

Examples:

```js
5 == "5"    // true
5 === "5"   // false

null == undefined   // true
null === undefined  // false
```

Default interview-safe rule:

**Prefer `===` and `!==` unless you explicitly want coercion.**

---

## 12. `null` vs `undefined`

### `undefined`
Usually means:
- not assigned
- missing
- default absence

### `null`
Usually means:
- intentionally empty

Example:

```js
let x;
console.log(x); // undefined

let y = null;
console.log(y); // null
```

---

## 13. The call stack, Web APIs, callbacks, and event loop

JavaScript itself runs one thing at a time on the call stack.

### Mental model
- synchronous code goes on the call stack
- async browser/Node facilities are handled outside the stack
- completed callbacks are queued
- event loop moves queued work onto the stack when the stack is empty

This is why async code does not interrupt currently running synchronous code.

---

## 14. Microtasks vs macrotasks

### Microtasks
Examples:
- `Promise.then`
- `queueMicrotask`

### Macrotasks
Examples:
- `setTimeout`
- `setInterval`
- I/O callbacks

Important rule:

**After current synchronous code finishes, microtasks run before the next macrotask.**

Example:

```js
console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("end");
```

Output:

```js
start
end
promise
timeout
```

This is one of the highest-value interview questions.

---

## 15. Promises mental model

A Promise represents a value that may be:
- pending
- fulfilled
- rejected

`async/await` is just cleaner syntax over Promise-based flow.

Important:
- `await` pauses the async function, not the whole program
- Promise callbacks are microtasks

---

## 16. Arrays and objects are mutable

Example:

```js
const arr = [1, 2, 3];
arr.push(4); // allowed
```

`const` only protects reassignment of the binding.

Not mutation of the referenced object.

---

## 17. Prototypes in one sentence

JavaScript objects can inherit behavior from other objects through the prototype chain.

You do **not** need deep theory for most interviews, but you should know:

- objects can delegate property lookup through prototypes
- classes in JS are syntax over prototype-based behavior

---

## 18. TypeScript’s place in this model

TypeScript adds:
- static type checking
- interfaces
- generics
- unions
- narrowing
- utility types

TypeScript does **not** add:
- runtime type enforcement by default
- different hoisting behavior
- different closure behavior
- different event loop semantics

At runtime, it is still JavaScript.

---

## 19. Fast interview answers to remember

### Hoisting
“Declarations are processed before execution, but behavior differs by declaration type. `var` is hoisted and initialized to undefined; `let` and `const` are hoisted but inaccessible before initialization due to the TDZ.”

### Closure
“A closure is a function that retains access to variables from its lexical scope even after the outer function returns.”

### `this`
“`this` depends on call site for regular functions. Arrow functions capture lexical `this`.”

### Event loop
“After synchronous code completes, microtasks like Promise callbacks run before macrotasks like `setTimeout`.”

### `var` vs `let` vs `const`
“`var` is function-scoped and redeclarable. `let` and `const` are block-scoped. `const` prevents reassignment, not mutation of objects.”

### TypeScript vs JavaScript
“TypeScript is compile-time only for types. Runtime behavior is still JavaScript.”

---

## 20. The minimal mental model

If you remember only this:

1. JS runs synchronously on a call stack
2. declarations are registered before execution
3. `var` hoists to `undefined`; `let`/`const` have TDZ
4. scope is lexical
5. closures preserve outer variables
6. `this` depends on call style unless using arrow functions
7. objects are reference-based
8. Promise microtasks run before timer callbacks
9. TypeScript does not change runtime semantics

---

## End
