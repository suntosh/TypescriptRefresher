// 12_js_ts_interview_nuances.ts
// JavaScript / TypeScript interview nuances:
// - var, let, const
// - hoisting
// - temporal dead zone
// - redeclaration vs reassignment
// - function declaration vs function expression
// - scope
// - closures
// - this basics
// - == vs ===
// - null vs undefined
// - event loop overview
// - reference vs value behavior
//
// NOTE:
// Some examples that would crash compilation/runtime are shown as comments.

// =========================
// 1. VAR, LET, CONST
// =========================

console.log("1. var, let, const");

var oldStyle = "var";
let blockScoped = "let";
const constantValue = "const";

oldStyle = "var changed";
blockScoped = "let changed";
// constantValue = "const changed"; // Error: const cannot be reassigned

console.log(oldStyle);
console.log(blockScoped);
console.log(constantValue);

// Key interview points:
// - var is function-scoped
// - let and const are block-scoped
// - const prevents reassignment, not deep immutability

// =========================
// 2. HOISTING
// =========================

console.log("\n2. Hoisting");

// var declaration is hoisted, initialization is not
console.log(hoistedVar); // undefined
var hoistedVar = "Now assigned";

// Function declarations are hoisted with their implementation
sayHello();

function sayHello(): void {
  console.log("Hello from hoisted function declaration");
}

// Function expressions are not callable before assignment
// greet(); // Error at runtime if using var, TDZ error if using let/const
const greet = function (): void {
  console.log("Hello from function expression");
};

greet();

// =========================
// 3. TEMPORAL DEAD ZONE
// =========================

console.log("\n3. Temporal Dead Zone");

// console.log(tdzValue); // ReferenceError: Cannot access before initialization
let tdzValue = 42;
console.log(tdzValue);

// Interview point:
// let/const are hoisted too, but live in the TDZ until initialized.

// =========================
// 4. REDECLARATION VS REASSIGNMENT
// =========================

console.log("\n4. Redeclaration vs reassignment");

var language = "JavaScript";
var language = "TypeScript"; // allowed with var
console.log(language);

let framework = "React";
framework = "Next.js"; // reassignment allowed
console.log(framework);

// let framework = "Vue"; // Error: cannot redeclare in same scope

const version = 1;
// version = 2; // Error: cannot reassign const
console.log(version);

// Important nuance:
// JavaScript does NOT "load the whole file and keep the last declaration"
// in a simplistic way. Hoisting and scope rules apply.
// With var, redeclaration in the same scope is allowed.
// With let/const, same-scope redeclaration is an error.

// =========================
// 5. BLOCK SCOPE VS FUNCTION SCOPE
// =========================

console.log("\n5. Scope");

if (true) {
  var functionScoped = "I escape the block";
  let onlyInsideBlock = "I stay in the block";
  console.log(onlyInsideBlock);
}

console.log(functionScoped);
// console.log(onlyInsideBlock); // Error

function scopeExample(): void {
  var insideFunction = "inside function";
  console.log(insideFunction);
}

scopeExample();
// console.log(insideFunction); // Error

// =========================
// 6. CLOSURES
// =========================

console.log("\n6. Closures");

function makeCounter(): () => number {
  let count = 0;

  return function (): number {
    count++;
    return count;
  };
}

const counterA = makeCounter();
console.log(counterA());
console.log(counterA());
console.log(counterA());

// Interview point:
// A closure is when a function remembers variables from its lexical scope
// even after the outer function has finished executing.

// =========================
// 7. VAR IN LOOPS VS LET IN LOOPS
// =========================

console.log("\n7. var vs let in loops");

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var loop:", i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let loop:", j), 0);
}

// Interview point:
// - var creates one shared binding for the loop
// - let creates a fresh binding per iteration

// =========================
// 8. FUNCTION DECLARATION VS ARROW FUNCTION
// =========================

console.log("\n8. Function declaration vs arrow function");

function regularAdd(a: number, b: number): number {
  return a + b;
}

const arrowAdd = (a: number, b: number): number => a + b;

console.log(regularAdd(2, 3));
console.log(arrowAdd(2, 3));

// Arrow nuance:
// - arrows do not have their own this
// - arrows do not have their own arguments
// - arrows cannot be used as constructors with new

// =========================
// 9. THIS BASICS
// =========================

console.log("\n9. this basics");

const person = {
  name: "Santosh",
  regularMethod() {
    console.log("regularMethod this.name =", this.name);
  },
  arrowMethod: () => {
    // In an object literal, arrow does not bind this to the object
    console.log("arrowMethod this is lexical, not object-bound");
  },
};

person.regularMethod();
person.arrowMethod();

// =========================
// 10. == VS ===
// =========================

console.log("\n10. == vs ===");

console.log(5 == "5");   // true, coercion
console.log(5 === "5");  // false, strict comparison
console.log(null == undefined);  // true
console.log(null === undefined); // false

// Interview point:
// Prefer === and !== unless you deliberately want coercion behavior.

// =========================
// 11. NULL VS UNDEFINED
// =========================

console.log("\n11. null vs undefined");

let notAssigned: string | undefined;
let intentionallyEmpty: null = null;

console.log(notAssigned);       // undefined
console.log(intentionallyEmpty); // null

// Typical nuance:
// - undefined usually means not assigned / missing
// - null usually means intentionally empty

// =========================
// 12. VALUE VS REFERENCE
// =========================

console.log("\n12. Value vs reference");

let a = 10;
let b = a;
b = 20;

console.log(a); // 10
console.log(b); // 20

const obj1 = { x: 1 };
const obj2 = obj1;
obj2.x = 99;

console.log(obj1.x); // 99
console.log(obj2.x); // 99

// Primitive types copy by value.
// Objects/arrays/functions are assigned by reference to the same object.

// =========================
// 13. EVENT LOOP BASICS
// =========================

console.log("\n13. Event loop basics");

console.log("Start");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise microtask");
});

console.log("End");

// Expected order:
// Start
// End
// Promise microtask
// setTimeout callback

// Interview point:
// Promise callbacks (microtasks) run before timer callbacks (macrotasks)
// after the current call stack clears.

// =========================
// 14. TYPE ASSERTION VS ACTUAL RUNTIME CONVERSION
// =========================

console.log("\n14. Type assertion vs runtime conversion");

const rawValue: unknown = "123";

// Type assertion changes what TypeScript believes, not runtime value
const assertedValue = rawValue as string;
console.log(assertedValue.toUpperCase());

// Real conversion:
const numericValue = Number(rawValue);
console.log(numericValue + 1);

// Interview point:
// TypeScript types disappear at runtime.
// Assertions do not transform data.

// =========================
// 15. UNION NARROWING
// =========================

console.log("\n15. Union narrowing");

function printLength(value: string | string[]): void {
  if (typeof value === "string") {
    console.log("String length:", value.length);
  } else {
    console.log("Array length:", value.length);
  }
}

printLength("hello");
printLength(["a", "b", "c"]);

// =========================
// 16. ENUMS VS OBJECTS
// =========================

console.log("\n16. Enums vs objects");

enum Direction {
  Up,
  Down,
}

const DirectionObj = {
  Up: "UP",
  Down: "DOWN",
} as const;

console.log(Direction.Up);
console.log(DirectionObj.Up);

// Interview nuance:
// In TS, enums emit runtime code.
// Plain const objects with `as const` are often lighter-weight alternatives.

// =========================
// 17. TOP-LEVEL SUMMARY
// =========================

const interviewTakeaways = [
  "var is function-scoped; let/const are block-scoped",
  "var is hoisted and initialized to undefined",
  "let/const are hoisted but live in the TDZ until initialized",
  "function declarations are hoisted with body",
  "closures retain access to lexical scope",
  "Promise microtasks run before setTimeout callbacks",
  "Type assertions do not change runtime data",
  "prefer === over ==",
];

console.log("\n17. Interview takeaways:");
for (const item of interviewTakeaways) {
  console.log("-", item);
}

// =========================
// END
// =========================

console.log("\nFinished lesson 12.");
