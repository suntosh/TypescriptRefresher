// 07_enums_unions_intersections_type_aliases.ts
// TypeScript refresher:
// - enums
// - union types
// - intersection types
// - type aliases
// - literal types
// - narrowing with typeof, in, and discriminated unions

// =========================
// 1. ENUMS
// =========================

// Numeric enum
enum Status {
  Pending,
  InProgress,
  Done,
}

let currentStatus: Status = Status.InProgress;
console.log("Numeric enum value:", currentStatus);
console.log("Status.Done:", Status.Done);

// String enum
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

const currentRole: Role = Role.Admin;
console.log("\nString enum value:", currentRole);

// =========================
// 2. TYPE ALIASES
// =========================

// Alias for a primitive union
type EmployeeId = string | number;

let employeeId: EmployeeId = 101;
console.log("\nEmployeeId as number:", employeeId);

employeeId = "EMP-101";
console.log("EmployeeId as string:", employeeId);

// Alias for an object shape
type Person = {
  id: number;
  name: string;
  isActive: boolean;
};

const person1: Person = {
  id: 1,
  name: "Santosh",
  isActive: true,
};

console.log("\nPerson object:", person1);

// Alias for a function type
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

console.log("\nAdd:", add(5, 3));
console.log("Multiply:", multiply(5, 3));

// =========================
// 3. UNION TYPES
// =========================

let apiResponse: string | number;

apiResponse = "Success";
console.log("\nUnion as string:", apiResponse);

apiResponse = 200;
console.log("Union as number:", apiResponse);

function printId(id: string | number): void {
  if (typeof id === "string") {
    console.log(`ID is a string with length ${id.length}`);
  } else {
    console.log(`ID is a number with value ${id}`);
  }
}

console.log("\nUnion narrowing with typeof:");
printId("ABC-123");
printId(999);

// =========================
// 4. LITERAL TYPES
// =========================

type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): void {
  console.log(`\nMoving ${direction}`);
}

move("up");
move("left");

// =========================
// 5. INTERSECTION TYPES
// =========================

type HasName = {
  name: string;
};

type HasAge = {
  age: number;
};

type NamedPerson = HasName & HasAge;

const person2: NamedPerson = {
  name: "Alice",
  age: 30,
};

console.log("\nIntersection type object:", person2);

// Another intersection example

type ContactInfo = {
  email: string;
  phone: string;
};

type EmployeeProfile = Person & ContactInfo;

const employeeProfile: EmployeeProfile = {
  id: 2,
  name: "Bob",
  isActive: true,
  email: "bob@example.com",
  phone: "555-0101",
};

console.log("Employee profile:", employeeProfile);

// =========================
// 6. UNIONS OF OBJECT TYPES
// =========================

type Dog = {
  kind: "dog";
  barkVolume: number;
};

type Cat = {
  kind: "cat";
  livesLeft: number;
};

type Pet = Dog | Cat;

function describePet(pet: Pet): void {
  if (pet.kind === "dog") {
    console.log(`\nDog with bark volume: ${pet.barkVolume}`);
  } else {
    console.log(`\nCat with lives left: ${pet.livesLeft}`);
  }
}

describePet({ kind: "dog", barkVolume: 8 });
describePet({ kind: "cat", livesLeft: 7 });

// =========================
// 7. NARROWING WITH THE 'in' OPERATOR
// =========================

type Car = {
  brand: string;
  drive(): void;
};

type Boat = {
  brand: string;
  sail(): void;
};

type Vehicle = Car | Boat;

function useVehicle(vehicle: Vehicle): void {
  if ("drive" in vehicle) {
    console.log("\nUsing car:");
    vehicle.drive();
  } else {
    console.log("\nUsing boat:");
    vehicle.sail();
  }
}

const myCar: Car = {
  brand: "Toyota",
  drive: () => console.log("Driving on the road."),
};

const myBoat: Boat = {
  brand: "Yamaha",
  sail: () => console.log("Sailing on the water."),
};

useVehicle(myCar);
useVehicle(myBoat);

// =========================
// 8. DISCRIMINATED UNIONS
// =========================

type LoadingState = {
  state: "loading";
};

type SuccessState = {
  state: "success";
  data: string[];
};

type ErrorState = {
  state: "error";
  message: string;
};

type RequestState = LoadingState | SuccessState | ErrorState;

function handleRequest(state: RequestState): void {
  switch (state.state) {
    case "loading":
      console.log("\nRequest is loading...");
      break;
    case "success":
      console.log("Request succeeded with data:", state.data);
      break;
    case "error":
      console.log("Request failed with message:", state.message);
      break;
  }
}

handleRequest({ state: "loading" });
handleRequest({ state: "success", data: ["a", "b", "c"] });
handleRequest({ state: "error", message: "Something went wrong." });

// =========================
// 9. COMBINING TYPE ALIASES
// =========================

type BaseResponse = {
  success: boolean;
  timestamp: number;
};

type UserData = {
  userId: number;
  username: string;
};

type UserResponse = BaseResponse & {
  data: UserData;
};

const response: UserResponse = {
  success: true,
  timestamp: Date.now(),
  data: {
    userId: 10,
    username: "santosh_a",
  },
};

console.log("\nCombined alias/intersection response:", response);

// =========================
// 10. PRACTICE MINI EXAMPLES
// =========================

type PaymentMethod = "cash" | "card" | "wire";

function processPayment(method: PaymentMethod, amount: number): void {
  console.log(`\nProcessing ${amount} via ${method}`);
}

processPayment("card", 250);
processPayment("wire", 1200);

type AdminUser = {
  name: string;
  permissions: string[];
};

type RegularUser = {
  name: string;
  email: string;
};

type AppUser = AdminUser | RegularUser;

function printUser(user: AppUser): void {
  console.log(`\nUser: ${user.name}`);

  if ("permissions" in user) {
    console.log("Permissions:", user.permissions.join(", "));
  } else {
    console.log("Email:", user.email);
  }
}

printUser({ name: "Admin Mike", permissions: ["read", "write", "delete"] });
printUser({ name: "Jane", email: "jane@example.com" });

// =========================
// END
// =========================

console.log("\nFinished lesson 07.");
