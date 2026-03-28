// 05_arrays_higher_order_methods.ts
// TypeScript refresher:
// - arrays
// - array typing
// - iteration patterns
// - map, filter, reduce
// - find, some, every
// - sort
// - chaining methods

// =========================
// 1. BASIC ARRAYS
// =========================

const numbers: number[] = [10, 20, 30, 40, 50];
const names: string[] = ["Santosh", "Alice", "Bob", "Charlie"];

console.log("Numbers:", numbers);
console.log("Names:", names);

// =========================
// 2. ARRAY ITERATION
// =========================

console.log("\nfor...of:");
for (const n of numbers) {
  console.log(n);
}

console.log("\nforEach:");
names.forEach((name, index) => {
  console.log(`${index}: ${name}`);
});

// =========================
// 3. MAP
// =========================
// map creates a new array by transforming each element.

const doubled: number[] = numbers.map((n) => n * 2);
console.log("\nDoubled:", doubled);

const nameLengths: number[] = names.map((name) => name.length);
console.log("Name lengths:", nameLengths);

// =========================
// 4. FILTER
// =========================
// filter keeps only elements that match a condition.

const greaterThan25: number[] = numbers.filter((n) => n > 25);
console.log("\nNumbers > 25:", greaterThan25);

const longNames: string[] = names.filter((name) => name.length > 4);
console.log("Names with length > 4:", longNames);

// =========================
// 5. REDUCE
// =========================
// reduce combines all elements into a single value.

const sum: number = numbers.reduce((acc, current) => acc + current, 0);
console.log("\nSum:", sum);

const max: number = numbers.reduce((acc, current) =>
  current > acc ? current : acc
);
console.log("Max:", max);

// =========================
// 6. FIND
// =========================
// find returns the first matching element, or undefined.

const firstOver30: number | undefined = numbers.find((n) => n > 30);
console.log("\nFirst number > 30:", firstOver30);

const firstNameStartingWithB: string | undefined = names.find((name) =>
  name.startsWith("B")
);
console.log("First name starting with B:", firstNameStartingWithB);

// =========================
// 7. SOME AND EVERY
// =========================

const hasLargeNumber: boolean = numbers.some((n) => n > 45);
console.log("\nHas number > 45:", hasLargeNumber);

const allPositive: boolean = numbers.every((n) => n > 0);
console.log("All numbers positive:", allPositive);

// =========================
// 8. SORT
// =========================
// sort mutates the original array, so copy first if needed.

const unsorted: number[] = [5, 1, 40, 12, 3];
const sortedAscending: number[] = [...unsorted].sort((a, b) => a - b);
const sortedDescending: number[] = [...unsorted].sort((a, b) => b - a);

console.log("\nOriginal unsorted:", unsorted);
console.log("Sorted ascending:", sortedAscending);
console.log("Sorted descending:", sortedDescending);

// =========================
// 9. ARRAYS OF OBJECTS
// =========================

interface Employee {
  id: number;
  name: string;
  salary: number;
  active: boolean;
}

const employees: Employee[] = [
  { id: 1, name: "Alice", salary: 90000, active: true },
  { id: 2, name: "Bob", salary: 75000, active: false },
  { id: 3, name: "Charlie", salary: 120000, active: true },
  { id: 4, name: "Diana", salary: 105000, active: true },
];

console.log("\nEmployees:");
console.log(employees);

// map over objects
const employeeNames: string[] = employees.map((emp) => emp.name);
console.log("Employee names:", employeeNames);

// filter active employees
const activeEmployees: Employee[] = employees.filter((emp) => emp.active);
console.log("Active employees:", activeEmployees);

// find one employee
const foundEmployee: Employee | undefined = employees.find((emp) => emp.id === 3);
console.log("Employee with id 3:", foundEmployee);

// reduce salaries
const totalSalary: number = employees.reduce((acc, emp) => acc + emp.salary, 0);
console.log("Total salary:", totalSalary);

// =========================
// 10. CHAINING METHODS
// =========================
// A common real-world pattern: filter -> map -> sort

const activeEmployeeNamesSorted: string[] = employees
  .filter((emp) => emp.active)
  .map((emp) => emp.name)
  .sort();

console.log("\nActive employee names sorted:", activeEmployeeNamesSorted);

// Another chain: active employees with salary > 100000
const highPaidActiveEmployees: Employee[] = employees
  .filter((emp) => emp.active)
  .filter((emp) => emp.salary > 100000);

console.log("High-paid active employees:", highPaidActiveEmployees);

// =========================
// 11. PRACTICAL MINI EXAMPLES
// =========================

const prices: number[] = [19.99, 49.99, 9.99, 29.99];

const discountedPrices: number[] = prices.map((price) => Number((price * 0.9).toFixed(2)));
console.log("\nDiscounted prices:", discountedPrices);

const totalPrice: number = prices.reduce((acc, price) => acc + price, 0);
console.log("Total price:", totalPrice.toFixed(2));

const words: string[] = ["typescript", "array", "map", "filter", "reduce"];
const upperWords: string[] = words.map((word) => word.toUpperCase());
console.log("Uppercase words:", upperWords);

const shortWords: string[] = words.filter((word) => word.length <= 5);
console.log("Short words:", shortWords);

// =========================
// 12. IMPORTANT NOTES
// =========================
// - map returns a transformed array.
// - filter returns a smaller or equal-size array.
// - reduce returns one final accumulated value.
// - find returns the first match or undefined.
// - some checks if at least one element matches.
// - every checks if all elements match.
// - sort mutates the array.

// =========================
// END
// =========================

console.log("\nFinished lesson 05.");
