// 02_functions.ts
// TypeScript refresher:
// - function declarations
// - function expressions
// - arrow functions
// - parameter types
// - optional parameters
// - default parameters
// - rest parameters
// - return types
// - void functions
// - function type aliases
// - overloads

// =========================
// 1. BASIC FUNCTION DECLARATION
// =========================

function add(a: number, b: number): number {
  return a + b;
}

console.log("add(10, 20) =", add(10, 20));

// =========================
// 2. FUNCTION EXPRESSION
// =========================

const subtract = function (a: number, b: number): number {
  return a - b;
};

console.log("subtract(30, 5) =", subtract(30, 5));

// =========================
// 3. ARROW FUNCTION
// =========================

const multiply = (a: number, b: number): number => {
  return a * b;
};

const divide = (a: number, b: number): number => a / b;

console.log("multiply(4, 6) =", multiply(4, 6));
console.log("divide(20, 4) =", divide(20, 4));

// =========================
// 4. PARAMETERS AND RETURN TYPES
// =========================

function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

console.log("Full name:", getFullName("Santosh", "Ahuja"));

// =========================
// 5. OPTIONAL PARAMETERS
// =========================

function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}`;
  }

  return `Hello, ${name}`;
}

console.log(greet("Santosh"));
console.log(greet("Santosh", "Mr."));

// =========================
// 6. DEFAULT PARAMETERS
// =========================

function calculateTax(amount: number, taxRate: number = 0.18): number {
  return amount * taxRate;
}

console.log("Tax on 100 with default rate =", calculateTax(100));
console.log("Tax on 100 with 10% rate =", calculateTax(100, 0.1));

// =========================
// 7. REST PARAMETERS
// =========================

function sumAll(...numbers: number[]): number {
  let total = 0;

  for (const n of numbers) {
    total += n;
  }

  return total;
}

console.log("sumAll(1,2,3,4,5) =", sumAll(1, 2, 3, 4, 5));

// =========================
// 8. VOID RETURN TYPE
// =========================

function logMessage(message: string): void {
  console.log("LOG:", message);
}

logMessage("This function returns nothing.");

// =========================
// 9. FUNCTION TYPE ALIAS
// =========================

// A type alias lets us define the shape of a function once
// and reuse it in multiple places.
type MathOperation = (x: number, y: number) => number;

const addNumbers: MathOperation = (x, y) => x + y;
const multiplyNumbers: MathOperation = (x, y) => x * y;

console.log("addNumbers(7, 8) =", addNumbers(7, 8));
console.log("multiplyNumbers(7, 8) =", multiplyNumbers(7, 8));

// =========================
// 10. FUNCTIONS WITH OBJECT PARAMETERS
// =========================

function printUser(user: { id: number; name: string; isActive: boolean }): void {
  console.log(`User => id: ${user.id}, name: ${user.name}, active: ${user.isActive}`);
}

printUser({ id: 1, name: "Alice", isActive: true });

// =========================
// 11. UNION TYPES IN PARAMETERS
// =========================

function printId(id: number | string): void {
  if (typeof id === "string") {
    console.log("String ID:", id.toUpperCase());
  } else {
    console.log("Numeric ID:", id);
  }
}

printId(101);
printId("emp-202");

// =========================
// 12. FUNCTION OVERLOADS
// =========================

// Overload signatures
function formatValue(value: string): string;
function formatValue(value: number): string;

// Implementation signature
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.trim().toUpperCase();
  }

  return value.toFixed(2);
}

console.log("formatValue(' hello ') =", formatValue(" hello "));
console.log("formatValue(123.456) =", formatValue(123.456));

// =========================
// 13. CALLBACK FUNCTIONS
// =========================

function processNumbers(numbers: number[], operation: (value: number) => number): number[] {
  const results: number[] = [];

  for (const n of numbers) {
    results.push(operation(n));
  }

  return results;
}

const originalNumbers = [1, 2, 3, 4, 5];
const squaredNumbers = processNumbers(originalNumbers, (n) => n * n);

console.log("Original:", originalNumbers);
console.log("Squared:", squaredNumbers);

// =========================
// 14. NEVER (advanced basic exposure)
// =========================

// never means the function never successfully completes.
// It either throws an error or loops forever.
function throwError(message: string): never {
  throw new Error(message);
}

// We will not call throwError here because it would stop the program.
// Example usage:
// throwError("Something went wrong");

// =========================
// 15. PRACTICE MINI EXAMPLES
// =========================

function isEven(value: number): boolean {
  return value % 2 === 0;
}

function findMax(values: number[]): number {
  let max = values[0];

  for (const value of values) {
    if (value > max) {
      max = value;
    }
  }

  return max;
}

function createEmail(name: string, domain: string = "example.com"): string {
  return `${name.toLowerCase()}@${domain}`;
}

console.log("isEven(10) =", isEven(10));
console.log("isEven(7) =", isEven(7));
console.log("findMax([4, 9, 1, 20, 7]) =", findMax([4, 9, 1, 20, 7]));
console.log("createEmail('Santosh') =", createEmail("Santosh"));
console.log("createEmail('Santosh', 'mycompany.com') =", createEmail("Santosh", "mycompany.com"));

// =========================
// END
// =========================

console.log("\nFinished lesson 02.");
