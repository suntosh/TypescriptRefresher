// 10_modules_project_structure.ts
// TypeScript refresher:
// - what modules are
// - export and import syntax
// - named exports
// - default exports
// - type-only imports
// - namespace import
// - re-export pattern
// - suggested project structure
//
// NOTE:
// This file is intentionally self-contained so it can be read on its own.
// Real import/export examples are shown as commented snippets because actual
// modules usually live in separate files.

// =========================
// 1. WHAT IS A MODULE?
// =========================
//
// In TypeScript, a file becomes a module when it has at least one:
// - export
// - import
//
// Modules help you:
// - organize code
// - avoid global naming collisions
// - separate concerns
// - scale projects more cleanly

console.log("Lesson 10: Modules and Project Structure");

// =========================
// 2. NAMED EXPORTS
// =========================
//
// Example file: mathUtils.ts
//
// export function add(a: number, b: number): number {
//   return a + b;
// }
//
// export function subtract(a: number, b: number): number {
//   return a - b;
// }
//
// export const pi = 3.14159;
//
// Example usage:
// import { add, subtract, pi } from "./mathUtils";
//
// console.log(add(5, 3));
// console.log(subtract(10, 4));
// console.log(pi);

function addExample(a: number, b: number): number {
  return a + b;
}

function subtractExample(a: number, b: number): number {
  return a - b;
}

console.log("\nNamed export pattern:");
console.log("addExample(5, 3) =", addExample(5, 3));
console.log("subtractExample(10, 4) =", subtractExample(10, 4));

// =========================
// 3. DEFAULT EXPORTS
// =========================
//
// Example file: logger.ts
//
// export default class Logger {
//   log(message: string): void {
//     console.log(`[LOG]: ${message}`);
//   }
// }
//
// Example usage:
// import Logger from "./logger";
//
// const logger = new Logger();
// logger.log("Application started");

class LoggerExample {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

console.log("\nDefault export pattern:");
const logger = new LoggerExample();
logger.log("Application started");

// =========================
// 4. EXPORTING TYPES
// =========================
//
// Example file: models.ts
//
// export type User = {
//   id: number;
//   name: string;
//   email: string;
// };
//
// export interface Product {
//   id: number;
//   title: string;
//   price: number;
// }
//
// Example usage:
// import type { User, Product } from "./models";
//
// const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

type User = {
  id: number;
  name: string;
  email: string;
};

interface Product {
  id: number;
  title: string;
  price: number;
}

const sampleUser: User = {
  id: 1,
  name: "Santosh",
  email: "santosh@example.com",
};

const sampleProduct: Product = {
  id: 101,
  title: "Mechanical Keyboard",
  price: 129.99,
};

console.log("\nExporting types pattern:");
console.log("User:", sampleUser);
console.log("Product:", sampleProduct);

// =========================
// 5. TYPE-ONLY IMPORTS
// =========================
//
// TypeScript supports importing only types.
//
// Example:
// import type { User } from "./models";
//
// This is useful because it makes intent clear and can reduce runtime output
// depending on compiler settings.

function printUser(user: User): void {
  console.log(`User => ${user.id}, ${user.name}, ${user.email}`);
}

console.log("\nType-only import concept:");
printUser(sampleUser);

// =========================
// 6. NAMESPACE IMPORT
// =========================
//
// Example file: stringUtils.ts
//
// export function toUpper(value: string): string {
//   return value.toUpperCase();
// }
//
// export function toLower(value: string): string {
//   return value.toLowerCase();
// }
//
// export function capitalize(value: string): string {
//   return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
// }
//
// Example usage:
// import * as StringUtils from "./stringUtils";
//
// console.log(StringUtils.toUpper("hello"));

const StringUtilsExample = {
  toUpper(value: string): string {
    return value.toUpperCase();
  },
  toLower(value: string): string {
    return value.toLowerCase();
  },
  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  },
};

console.log("\nNamespace import pattern:");
console.log(StringUtilsExample.toUpper("hello"));
console.log(StringUtilsExample.toLower("WORLD"));
console.log(StringUtilsExample.capitalize("tYPESCRIPT"));

// =========================
// 7. RE-EXPORT / BARREL FILES
// =========================
//
// A barrel file gathers exports from multiple files.
//
// Example: index.ts
//
// export * from "./mathUtils";
// export * from "./models";
// export { default as Logger } from "./logger";
//
// Then consumers can write:
// import { add, Logger, type User } from "./index";
//
// This can make imports cleaner in medium-size projects.

console.log("\nRe-export pattern:");
console.log("Use index.ts to centralize exports from multiple files.");

// =========================
// 8. COMMON PROJECT STRUCTURE
// =========================
//
// Example:
//
// my-typescript-app/
// ├── src/
// │   ├── models/
// │   │   ├── user.ts
// │   │   └── product.ts
// │   ├── services/
// │   │   ├── userService.ts
// │   │   └── productService.ts
// │   ├── utils/
// │   │   ├── mathUtils.ts
// │   │   └── stringUtils.ts
// │   ├── types/
// │   │   └── common.ts
// │   ├── index.ts
// │   └── app.ts
// ├── dist/
// ├── package.json
// ├── tsconfig.json
// └── README.md

const suggestedStructure: string[] = [
  "src/models/user.ts",
  "src/models/product.ts",
  "src/services/userService.ts",
  "src/services/productService.ts",
  "src/utils/mathUtils.ts",
  "src/utils/stringUtils.ts",
  "src/types/common.ts",
  "src/index.ts",
  "src/app.ts",
  "tsconfig.json",
  "package.json",
  "README.md",
];

console.log("\nSuggested project structure:");
for (const entry of suggestedStructure) {
  console.log("-", entry);
}

// =========================
// 9. SAMPLE SERVICE PATTERN
// =========================

class UserService {
  getUserById(id: number): User | undefined {
    const users: User[] = [
      { id: 1, name: "Santosh", email: "santosh@example.com" },
      { id: 2, name: "Alice", email: "alice@example.com" },
    ];

    return users.find((user) => user.id === id);
  }
}

console.log("\nService pattern:");
const userService = new UserService();
console.log("User 1:", userService.getUserById(1));
console.log("User 99:", userService.getUserById(99));

// =========================
// 10. TSConfig BASICS
// =========================
//
// Typical tsconfig.json:
//
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "CommonJS",
//     "rootDir": "./src",
//     "outDir": "./dist",
//     "strict": true,
//     "esModuleInterop": true,
//     "forceConsistentCasingInFileNames": true,
//     "skipLibCheck": true
//   },
//   "include": ["src/**/*"]
// }

const importantTsconfigOptions = [
  "target",
  "module",
  "rootDir",
  "outDir",
  "strict",
  "esModuleInterop",
  "forceConsistentCasingInFileNames",
  "skipLibCheck",
];

console.log("\nImportant tsconfig options:");
for (const option of importantTsconfigOptions) {
  console.log("-", option);
}

// =========================
// 11. PACKAGE.JSON SCRIPTS
// =========================
//
// Example package.json scripts:
//
// {
//   "scripts": {
//     "build": "tsc",
//     "start": "node dist/app.js",
//     "dev": "ts-node src/app.ts"
//   }
// }

const packageScripts = {
  build: "tsc",
  start: "node dist/app.js",
  dev: "ts-node src/app.ts",
};

console.log("\nCommon package.json scripts:");
console.log(packageScripts);

// =========================
// 12. MINI PRACTICE EXAMPLE
// =========================

type Order = {
  id: number;
  total: number;
};

class OrderService {
  private orders: Order[] = [
    { id: 1, total: 250 },
    { id: 2, total: 450 },
    { id: 3, total: 125 },
  ];

  getAll(): Order[] {
    return this.orders;
  }

  getById(id: number): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }
}

console.log("\nMini practice example:");
const orderService = new OrderService();
console.log("All orders:", orderService.getAll());
console.log("Order 2:", orderService.getById(2));

// =========================
// 13. FINAL GUIDANCE
// =========================
//
// Good practice:
// - keep one main responsibility per file
// - export only what should be public
// - keep types near the domain they belong to
// - use barrel files sparingly
// - prefer clear folder names over clever ones
// - keep app.ts or index.ts as the entry point

const bestPractices = [
  "Keep one main responsibility per file",
  "Export only what should be public",
  "Keep related types close to their domain",
  "Use clear folder names",
  "Have a clear application entry point",
];

console.log("\nBest practices:");
for (const item of bestPractices) {
  console.log("-", item);
}

// =========================
// END
// =========================

console.log("\nFinished lesson 10.");
