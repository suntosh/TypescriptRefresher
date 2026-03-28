// 06_generics.ts
// TypeScript refresher:
// - generic functions
// - generic interfaces
// - generic type aliases
// - generic classes
// - constraints with extends
// - keyof with generics
// - reusable utility-style patterns

// =========================
// 1. WHY GENERICS?
// =========================
// Generics let us write reusable code while preserving type safety.
// Instead of writing one function for string, another for number,
// and another for some custom type, we can write one generic version.

// Non-generic version: only works for string
function wrapString(value: string): string[] {
  return [value];
}

console.log("wrapString:", wrapString("hello"));

// Generic version: works for any type T
function wrapInArray<T>(value: T): T[] {
  return [value];
}

console.log("\nwrapInArray examples:");
console.log(wrapInArray<number>(123));
console.log(wrapInArray<string>("TypeScript"));
console.log(wrapInArray<boolean>(true));

// Type inference usually means you do not need to explicitly provide T
const inferredNumberArray = wrapInArray(999);
const inferredStringArray = wrapInArray("inferred");

console.log(inferredNumberArray);
console.log(inferredStringArray);

// =========================
// 2. GENERIC FUNCTION WITH MULTIPLE TYPES
// =========================

function makePair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair1 = makePair<string, number>("age", 50);
const pair2 = makePair("active", true);

console.log("\nmakePair examples:");
console.log(pair1);
console.log(pair2);

// =========================
// 3. GENERIC FUNCTION RETURNING OBJECTS
// =========================

function createResponse<T>(data: T) {
  return {
    success: true,
    data,
  };
}

const userResponse = createResponse({ id: 1, name: "Santosh" });
const scoresResponse = createResponse([10, 20, 30]);

console.log("\ncreateResponse examples:");
console.log(userResponse);
console.log(scoresResponse);

// =========================
// 4. GENERIC INTERFACES
// =========================

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

const employeeApiResponse: ApiResponse<{ id: number; name: string }> = {
  success: true,
  data: { id: 101, name: "Bob" },
  message: "Employee fetched successfully",
};

const numbersApiResponse: ApiResponse<number[]> = {
  success: true,
  data: [1, 2, 3, 4, 5],
  message: "Numbers fetched successfully",
};

console.log("\nGeneric interface examples:");
console.log(employeeApiResponse);
console.log(numbersApiResponse);

// =========================
// 5. GENERIC TYPE ALIASES
// =========================

type Box<T> = {
  value: T;
};

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

console.log("\nGeneric type alias examples:");
console.log(stringBox);
console.log(numberBox);

// Another example with two generic parameters
type KeyValuePair<K, V> = {
  key: K;
  value: V;
};

const setting: KeyValuePair<string, boolean> = {
  key: "darkMode",
  value: true,
};

console.log(setting);

// =========================
// 6. GENERIC CLASSES
// =========================

class StorageBox<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const numberStorage = new StorageBox<number>();
numberStorage.add(10);
numberStorage.add(20);
numberStorage.add(30);

const stringStorage = new StorageBox<string>();
stringStorage.add("A");
stringStorage.add("B");

console.log("\nGeneric class examples:");
console.log(numberStorage.getAll());
console.log(stringStorage.getAll());

// =========================
// 7. GENERIC CONSTRAINTS WITH extends
// =========================
// Sometimes we do not want "any type whatsoever".
// We want only types that have specific properties.

interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): T {
  console.log("Length is:", value.length);
  return value;
}

console.log("\nConstraint examples:");
logLength("hello");
logLength([1, 2, 3, 4]);
logLength({ length: 99, description: "custom object" });

// This would fail if uncommented because number has no .length
// logLength(123);

// =========================
// 8. keyof WITH GENERICS
// =========================
// keyof lets us safely access object properties.

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: "Alice",
  active: true,
};

console.log("\nkeyof examples:");
console.log(getProperty(user, "id"));
console.log(getProperty(user, "name"));
console.log(getProperty(user, "active"));

// This would fail if uncommented because "salary" is not a key of user
// console.log(getProperty(user, "salary"));

// =========================
// 9. GENERIC FUNCTION FOR MERGING OBJECTS
// =========================

function mergeObjects<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const mergedUser = mergeObjects(
  { id: 1, name: "Charlie" },
  { role: "Engineer", remote: true }
);

console.log("\nmergeObjects example:");
console.log(mergedUser);
console.log(mergedUser.name);
console.log(mergedUser.role);

// =========================
// 10. GENERIC DEFAULT TYPES
// =========================
// You can provide default generic types for flexibility.

interface State<T = string> {
  value: T;
}

const defaultState: State = { value: "ready" };
const numericState: State<number> = { value: 100 };

console.log("\nDefault generic type examples:");
console.log(defaultState);
console.log(numericState);

// =========================
// 11. REUSABLE PATTERN: PAGINATED RESULT
// =========================

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

const usersPage: PaginatedResult<{ id: number; name: string }> = {
  items: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ],
  total: 25,
  page: 1,
  pageSize: 2,
};

console.log("\nPaginated result example:");
console.log(usersPage);

// =========================
// 12. REUSABLE PATTERN: IDENTITY FUNCTION
// =========================
// Very common interview and refresher example.

function identity<T>(value: T): T {
  return value;
}

console.log("\nIdentity examples:");
console.log(identity<number>(123));
console.log(identity<string>("abc"));
console.log(identity({ id: 99, tag: "demo" }));

// =========================
// 13. PRACTICE MINI EXAMPLES
// =========================

function getFirstElement<T>(items: T[]): T | undefined {
  return items[0];
}

console.log("\ngetFirstElement examples:");
console.log(getFirstElement([10, 20, 30]));
console.log(getFirstElement(["x", "y", "z"]));
console.log(getFirstElement([]));

function printTwice<T>(value: T): void {
  console.log(value);
  console.log(value);
}

console.log("\nprintTwice example:");
printTwice("echo");

class Queue<T> {
  private data: T[] = [];

  enqueue(item: T): void {
    this.data.push(item);
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }

  getItems(): T[] {
    return this.data;
  }
}

const taskQueue = new Queue<string>();
taskQueue.enqueue("compile");
taskQueue.enqueue("test");
taskQueue.enqueue("deploy");

console.log("\nQueue example:");
console.log(taskQueue.getItems());
console.log("Dequeued:", taskQueue.dequeue());
console.log(taskQueue.getItems());

// =========================
// 14. WHEN TO USE GENERICS
// =========================
// Use generics when:
// - the same logic should work across many types
// - you want strong type safety without duplication
// - you are building reusable helpers, containers, APIs, or utilities
// - you want TypeScript to preserve the relationship between input and output types

console.log("\nFinished lesson 06.");
