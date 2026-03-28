// 11_advanced_types.ts
// TypeScript refresher:
// - keyof
// - typeof in type positions
// - indexed access types
// - mapped types
// - conditional types
// - infer
// - utility types
// - template literal types
// - satisfies
// - practical examples

// =========================
// 1. KEYOF
// =========================

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

type UserKeys = keyof User; // "id" | "name" | "email" | "isAdmin"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user1: User = {
  id: 1,
  name: "Santosh",
  email: "santosh@example.com",
  isAdmin: true,
};

console.log("keyof example:");
console.log(getProperty(user1, "name"));
console.log(getProperty(user1, "email"));

// =========================
// 2. TYPEOF IN TYPE POSITIONS
// =========================

const appConfig = {
  appName: "TS Refresher",
  version: 1,
  debug: true,
};

type AppConfig = typeof appConfig;

const configCopy: AppConfig = {
  appName: "TS Refresher",
  version: 2,
  debug: false,
};

console.log("\ntypeof in type position:");
console.log(configCopy);

// =========================
// 3. INDEXED ACCESS TYPES
// =========================

type UserNameType = User["name"]; // string
type UserAdminType = User["isAdmin"]; // boolean

const sampleName: UserNameType = "Alice";
const sampleAdmin: UserAdminType = false;

console.log("\nIndexed access types:");
console.log(sampleName, sampleAdmin);

// =========================
// 4. MAPPED TYPES
// =========================

type Optional<T> = {
  [K in keyof T]?: T[K];
};

type ReadOnlyVersion<T> = {
  readonly [K in keyof T]: T[K];
};

type UserOptional = Optional<User>;
type UserReadonly = ReadOnlyVersion<User>;

const partialUser: UserOptional = {
  name: "Bob",
};

const readonlyUser: UserReadonly = {
  id: 2,
  name: "Charlie",
  email: "charlie@example.com",
  isAdmin: false,
};

console.log("\nMapped types:");
console.log(partialUser);
console.log(readonlyUser);

// =========================
// 5. CONDITIONAL TYPES
// =========================

type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

const isStringResult1: Test1 = true;
const isStringResult2: Test2 = false;

console.log("\nConditional types:");
console.log(isStringResult1, isStringResult2);

// =========================
// 6. INFER
// =========================

type ReturnTypeOf<T> = T extends (...args: never[]) => infer R ? R : never;

function createOrder() {
  return {
    orderId: 101,
    total: 250,
  };
}

type Order = ReturnTypeOf<typeof createOrder>;

const order1: Order = {
  orderId: 202,
  total: 500,
};

console.log("\ninfer example:");
console.log(order1);

// =========================
// 7. UTILITY TYPES
// =========================

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

type ProductPreview = Pick<Product, "id" | "title" | "price">;
type ProductDescriptionOnly = Omit<Product, "id" | "title" | "price">;
type ProductPartial = Partial<Product>;
type ProductRequired = Required<Product>;

const preview: ProductPreview = {
  id: 1,
  title: "Laptop",
  price: 1200,
};

const descriptionOnly: ProductDescriptionOnly = {
  description: "High-performance laptop",
};

const partialProduct: ProductPartial = {
  title: "Mouse",
};

const requiredProduct: ProductRequired = {
  id: 2,
  title: "Keyboard",
  price: 80,
  description: "Mechanical keyboard",
};

console.log("\nUtility types:");
console.log(preview);
console.log(descriptionOnly);
console.log(partialProduct);
console.log(requiredProduct);

// =========================
// 8. RECORD
// =========================

type Role = "admin" | "user" | "guest";

const roleLabels: Record<Role, string> = {
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest User",
};

console.log("\nRecord:");
console.log(roleLabels);

// =========================
// 9. EXCLUDE / EXTRACT / NONNULLABLE
// =========================

type Primitive = string | number | boolean | null | undefined;
type WithoutNullish = NonNullable<Primitive>;

type Letters = "a" | "b" | "c";
type RemovedB = Exclude<Letters, "b">;
type OnlyBOrC = Extract<Letters, "b" | "c">;

const value1: WithoutNullish = "hello";
const value2: RemovedB = "a";
const value3: OnlyBOrC = "c";

console.log("\nExclude / Extract / NonNullable:");
console.log(value1, value2, value3);

// =========================
// 10. TEMPLATE LITERAL TYPES
// =========================

type HttpMethod = "GET" | "POST";
type Route = "/users" | "/orders";

type ApiEndpoint = `${HttpMethod} ${Route}`;

const endpoint1: ApiEndpoint = "GET /users";
const endpoint2: ApiEndpoint = "POST /orders";

console.log("\nTemplate literal types:");
console.log(endpoint1, endpoint2);

// =========================
// 11. SATISFIES
// =========================

type ThemeConfig = {
  mode: "light" | "dark";
  fontSize: number;
};

const theme = {
  mode: "dark",
  fontSize: 16,
} satisfies ThemeConfig;

console.log("\nsatisfies:");
console.log(theme);

// =========================
// 12. DISCRIMINATED UNION WITH EXHAUSTIVENESS
// =========================

type Square = {
  kind: "square";
  size: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Circle = {
  kind: "circle";
  radius: number;
};

type Shape = Square | Rectangle | Circle;

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    default:
      return assertNever(shape);
  }
}

console.log("\nExhaustive discriminated union:");
console.log(area({ kind: "square", size: 4 }));
console.log(area({ kind: "rectangle", width: 3, height: 5 }));
console.log(area({ kind: "circle", radius: 2 }));

// =========================
// 13. PRACTICAL API RESPONSE EXAMPLE
// =========================

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

function handleResponse<T>(response: ApiResponse<T>): void {
  if (response.success) {
    console.log("Success response:", response.data);
  } else {
    console.log("Failure response:", response.error);
  }
}

console.log("\nPractical API response example:");
handleResponse<User>({ success: true, data: user1 });
handleResponse<User>({ success: false, error: "User not found" });

// =========================
// 14. PRACTICAL PATCH TYPE
// =========================

type UpdateUserRequest = Partial<Pick<User, "name" | "email" | "isAdmin">>;

function updateUser(user: User, patch: UpdateUserRequest): User {
  return { ...user, ...patch };
}

console.log("\nPractical patch type:");
console.log(updateUser(user1, { name: "Updated Santosh", isAdmin: false }));

// =========================
// END
// =========================

console.log("\nFinished lesson 11.");
