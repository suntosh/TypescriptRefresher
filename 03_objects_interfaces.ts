// 03_objects_interfaces.ts
// TypeScript refresher:
// - inline object types
// - nested objects
// - optional properties
// - readonly properties
// - interfaces
// - extending interfaces
// - type aliases vs interfaces
// - arrays of objects
// - function parameters typed with objects/interfaces

// =========================
// 1. INLINE OBJECT TYPES
// =========================

let product: { id: number; name: string; price: number; inStock: boolean } = {
  id: 101,
  name: "Mechanical Keyboard",
  price: 89.99,
  inStock: true,
};

console.log("Product:", product);

// =========================
// 2. NESTED OBJECT TYPES
// =========================

let employee: {
  id: number;
  name: string;
  department: {
    code: string;
    title: string;
  };
} = {
  id: 1,
  name: "Santosh",
  department: {
    code: "ENG",
    title: "Engineering",
  },
};

console.log("\nEmployee with nested object:");
console.log(employee);
console.log("Department title:", employee.department.title);

// =========================
// 3. OPTIONAL PROPERTIES
// =========================

let customer: { id: number; name: string; phone?: string } = {
  id: 200,
  name: "Alice",
};

console.log("\nCustomer without optional phone:", customer);

customer = {
  id: 201,
  name: "Bob",
  phone: "555-1234",
};

console.log("Customer with phone:", customer);

// =========================
// 4. READONLY PROPERTIES
// =========================

interface Book {
  readonly isbn: string;
  title: string;
  author: string;
}

const book: Book = {
  isbn: "978-1-23456-789-0",
  title: "Learning TypeScript",
  author: "Jane Doe",
};

book.title = "Mastering TypeScript";
// book.isbn = "new value"; // Error: cannot assign to readonly property

console.log("\nBook:", book);

// =========================
// 5. BASIC INTERFACE
// =========================

interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

const user1: User = {
  id: 1,
  name: "Charlie",
  isAdmin: false,
};

console.log("\nUser1:", user1);

// =========================
// 6. OPTIONAL + READONLY IN INTERFACES
// =========================

interface Vehicle {
  readonly vin: string;
  make: string;
  model: string;
  year?: number;
}

const car: Vehicle = {
  vin: "1HGCM82633A123456",
  make: "Honda",
  model: "Accord",
  year: 2014,
};

console.log("\nVehicle:", car);

// =========================
// 7. INTERFACES FOR FUNCTION PARAMETERS
// =========================

interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

function printPerson(person: Person): void {
  console.log(`\nPerson: ${person.firstName} ${person.lastName}, Age: ${person.age}`);
}

printPerson({
  firstName: "Santosh",
  lastName: "Ahuja",
  age: 50,
});

// =========================
// 8. FUNCTION RETURNING AN OBJECT
// =========================

interface LoginResult {
  success: boolean;
  token?: string;
  message: string;
}

function login(username: string, password: string): LoginResult {
  if (username === "admin" && password === "pass123") {
    return {
      success: true,
      token: "abc123token",
      message: "Login successful",
    };
  }

  return {
    success: false,
    message: "Invalid credentials",
  };
}

console.log("\nLogin results:");
console.log(login("admin", "pass123"));
console.log(login("user", "wrong"));

// =========================
// 9. ARRAYS OF OBJECTS
// =========================

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [
  { id: 1, title: "Learn basic types", completed: true },
  { id: 2, title: "Practice functions", completed: true },
  { id: 3, title: "Study interfaces", completed: false },
];

console.log("\nTasks:");
for (const task of tasks) {
  console.log(`${task.id}. ${task.title} - completed: ${task.completed}`);
}

// =========================
// 10. EXTENDING INTERFACES
// =========================

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
  barkVolume: number;
}

const dog: Dog = {
  name: "Rex",
  breed: "German Shepherd",
  barkVolume: 8,
};

console.log("\nDog:", dog);

// =========================
// 11. MULTIPLE INTERFACE EXTENSION
// =========================

interface HasId {
  id: number;
}

interface HasTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface Order extends HasId, HasTimestamps {
  total: number;
  status: string;
}

const order: Order = {
  id: 5001,
  total: 249.99,
  status: "Processing",
  createdAt: new Date("2026-03-28T10:00:00"),
  updatedAt: new Date("2026-03-28T12:00:00"),
};

console.log("\nOrder:", order);

// =========================
// 12. TYPE ALIAS FOR OBJECTS
// =========================

// A type alias can also describe object shapes.
type Point = {
  x: number;
  y: number;
};

const origin: Point = { x: 0, y: 0 };
console.log("\nPoint:", origin);

// =========================
// 13. INTERFACE VS TYPE ALIAS
// =========================

// In day-to-day TypeScript:
// - interface is common for object contracts
// - type is useful for unions, intersections, and aliases in general

type Status = "pending" | "approved" | "rejected";

interface RequestItem {
  id: number;
  status: Status;
}

const request: RequestItem = {
  id: 99,
  status: "approved",
};

console.log("\nRequest item:", request);

// =========================
// 14. OBJECT DESTRUCTURING WITH TYPES
// =========================

function printTask({ id, title, completed }: Task): void {
  console.log(`Task => id: ${id}, title: ${title}, completed: ${completed}`);
}

console.log("\nDestructured task print:");
printTask(tasks[0]);

// =========================
// 15. PRACTICE MINI EXAMPLES
// =========================

interface Student {
  id: number;
  name: string;
  grade?: string;
}

const students: Student[] = [
  { id: 1, name: "Ava", grade: "A" },
  { id: 2, name: "Liam" },
  { id: 3, name: "Noah", grade: "B+" },
];

console.log("\nStudents:");
for (const student of students) {
  const gradeText = student.grade ? student.grade : "Not assigned";
  console.log(`${student.name} -> ${gradeText}`);
}

function isCompleted(task: Task): boolean {
  return task.completed;
}

console.log("\nTask completion checks:");
for (const task of tasks) {
  console.log(`${task.title}: ${isCompleted(task)}`);
}

// =========================
// END
// =========================

console.log("\nFinished lesson 03.");
