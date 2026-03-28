// 01_basics_datatypes_loops.ts
// TypeScript refresher:
// - variables
// - primitive data types
// - arrays and tuples
// - objects
// - enums
// - any vs unknown
// - unions
// - conditionals
// - loops

// =========================
// 1. VARIABLES
// =========================

// const: cannot be reassigned
const appName: string = "TypeScript Refresher";

// let: can be reassigned
let lessonNumber: number = 1;
lessonNumber = 2;

// =========================
// 2. PRIMITIVE TYPES
// =========================

let firstName: string = "Santosh";
let age: number = 50;
let isLearning: boolean = true;

// Type inference: TypeScript can infer the type
let city = "Richardson"; // inferred as string

console.log("App:", appName);
console.log("Lesson number:", lessonNumber);
console.log("Name:", firstName);
console.log("Age:", age);
console.log("Learning now:", isLearning);
console.log("City:", city);

// =========================
// 3. ARRAYS
// =========================

// Array of numbers
let scores: number[] = [95, 88, 76, 100];

// Another array syntax
let technologies: Array<string> = ["TypeScript", "Node.js", "React"];

console.log("\nScores:");
for (const score of scores) {
  console.log(score);
}

console.log("\nTechnologies:");
for (const tech of technologies) {
  console.log(tech);
}

// =========================
// 4. TUPLES
// =========================

// Tuple: fixed number of elements with fixed types
let employee: [number, string] = [101, "Alice"];

console.log("\nEmployee tuple:");
console.log("ID:", employee[0]);
console.log("Name:", employee[1]);

// =========================
// 5. OBJECT TYPES
// =========================

let user: { id: number; name: string; active: boolean } = {
  id: 1,
  name: "Bob",
  active: true,
};

console.log("\nUser object:");
console.log(user);

// =========================
// 6. ENUMS
// =========================

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Left;
console.log("\nDirection enum value:", move);
console.log("Direction.Left numeric value:", Direction.Left);

// =========================
// 7. ANY VS UNKNOWN
// =========================

// any: disables type safety for that variable
let looseValue: any = "Hello";
looseValue = 123;
looseValue = true;

// unknown: safer than any
let uncertainValue: unknown = "Maybe a string";
uncertainValue = 42;

// With unknown, you must narrow the type before using it
if (typeof uncertainValue === "number") {
  console.log("\nUnknown narrowed to number:", uncertainValue + 10);
}

// =========================
// 8. UNION TYPES
// =========================

let id: string | number;

id = 1001;
console.log("\nUnion ID as number:", id);

id = "EMP-1001";
console.log("Union ID as string:", id);

// =========================
// 9. CONDITIONALS
// =========================

let temperature: number = 28;

if (temperature > 30) {
  console.log("\nIt is hot.");
} else if (temperature >= 20) {
  console.log("\nWeather is moderate.");
} else {
  console.log("\nIt is cold.");
}

// Ternary operator
let accessMessage: string = isLearning ? "Keep going." : "Start today.";
console.log(accessMessage);

// =========================
// 10. LOOPS
// =========================

// for loop
console.log("\nFor loop:");
for (let i = 0; i < 5; i++) {
  console.log(`i = ${i}`);
}

// for...of loop (great for arrays)
console.log("\nFor...of loop:");
for (const tech of technologies) {
  console.log(tech);
}

// while loop
console.log("\nWhile loop:");
let count: number = 0;
while (count < 3) {
  console.log(`count = ${count}`);
  count++;
}

// do...while loop
console.log("\nDo...while loop:");
let x: number = 0;
do {
  console.log(`x = ${x}`);
  x++;
} while (x < 2);

// =========================
// 11. BREAK AND CONTINUE
// =========================

console.log("\nBreak example:");
for (let i = 0; i < 10; i++) {
  if (i === 4) {
    break;
  }
  console.log(i);
}

console.log("\nContinue example:");
for (let i = 0; i < 6; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}

// =========================
// 12. PRACTICE MINI EXAMPLES
// =========================

// Example: sum numbers in an array
let numbers: number[] = [10, 20, 30, 40];
let sum: number = 0;

for (const n of numbers) {
  sum += n;
}

console.log("\nSum of numbers:", sum);

// Example: print only even numbers
console.log("\nEven numbers:");
for (const n of numbers) {
  if (n % 2 === 0) {
    console.log(n);
  }
}

// Example: union type in a function-like flow
let inputValue: string | number = "250";

if (typeof inputValue === "string") {
  console.log("\nInput is a string with length:", inputValue.length);
} else {
  console.log("\nInput is a number squared:", inputValue * inputValue);
}

// =========================
// END
// =========================

console.log("\nFinished lesson 01.");
