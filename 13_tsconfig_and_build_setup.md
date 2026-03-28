# 13_tsconfig_and_build_setup.md

## TypeScript Build and Setup Guide

This file explains how to turn the refresher files into a real TypeScript project that you can build, run, and extend.

---

## 1. Recommended project structure

```text
typescript_refresher/
├── src/
│   ├── 01_basics_datatypes_loops.ts
│   ├── 02_functions.ts
│   ├── 03_objects_interfaces.ts
│   ├── 04_classes.ts
│   ├── 05_arrays_higher_order_methods.ts
│   ├── 06_generics.ts
│   ├── 07_enums_unions_intersections_type_aliases.ts
│   ├── 08_error_handling.ts
│   ├── 09_async_await_promises.ts
│   ├── 10_modules_project_structure.ts
│   ├── 11_advanced_types.ts
│   └── 12_js_ts_interview_nuances.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

### Why use `src` and `dist`?

- `src` contains your TypeScript source files
- `dist` contains compiled JavaScript output
- this keeps source and generated output separate

---

## 2. Initialize the project

In the root folder:

```bash
npm init -y
```

This creates a basic `package.json`.

---

## 3. Install TypeScript

Install TypeScript as a development dependency:

```bash
npm install --save-dev typescript
```

Optional but very useful for direct execution during development:

```bash
npm install --save-dev ts-node
```

Optional Node type definitions:

```bash
npm install --save-dev @types/node
```

---

## 4. Create `tsconfig.json`

A solid starting point:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

---

## 5. What the main compiler options mean

### `target`
Controls what JavaScript version TypeScript emits.

Example:

```json
"target": "ES2020"
```

Good default for modern Node.js work.

### `module`
Controls module output style.

Example:

```json
"module": "CommonJS"
```

Use this when running with standard Node.js CommonJS style.

For modern ESM projects you might use:

```json
"module": "NodeNext"
```

but `CommonJS` is simpler for refresher work.

### `rootDir`
Where your TypeScript source code lives.

```json
"rootDir": "./src"
```

### `outDir`
Where compiled JavaScript goes.

```json
"outDir": "./dist"
```

### `strict`
Turns on TypeScript’s strict mode family.

```json
"strict": true
```

This is strongly recommended.

### `noImplicitAny`
Disallows variables or parameters silently becoming `any`.

```json
"noImplicitAny": true
```

### `strictNullChecks`
Makes `null` and `undefined` explicit and safer.

```json
"strictNullChecks": true
```

### `esModuleInterop`
Makes CommonJS interop easier for many imports.

```json
"esModuleInterop": true
```

### `forceConsistentCasingInFileNames`
Prevents casing issues across platforms.

```json
"forceConsistentCasingInFileNames": true
```

### `skipLibCheck`
Speeds up compilation by skipping type checks in dependency declaration files.

```json
"skipLibCheck": true
```

---

## 6. Add package scripts

A practical `package.json` scripts section:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/01_basics_datatypes_loops.js",
    "dev": "ts-node src/01_basics_datatypes_loops.ts",
    "clean": "rmdir /s /q dist"
  }
}
```

### Cross-platform note

That `clean` command is Windows-specific.

For a simpler cross-platform setup, install `rimraf`:

```bash
npm install --save-dev rimraf
```

Then use:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/01_basics_datatypes_loops.js",
    "dev": "ts-node src/01_basics_datatypes_loops.ts",
    "clean": "rimraf dist"
  }
}
```

---

## 7. How to compile

Compile all files:

```bash
npx tsc
```

Or if TypeScript is installed globally:

```bash
tsc
```

Compiled JavaScript will appear in `dist`.

---

## 8. How to run compiled JavaScript

Example:

```bash
node dist/01_basics_datatypes_loops.js
```

Run another lesson:

```bash
node dist/04_classes.js
```

---

## 9. How to run TypeScript directly during development

If `ts-node` is installed:

```bash
npx ts-node src/01_basics_datatypes_loops.ts
```

This is useful while learning because you can run `.ts` files without a separate compile step.

---

## 10. Watch mode

TypeScript can watch files and recompile automatically:

```bash
npx tsc --watch
```

This is very useful while editing multiple files.

---

## 11. Suggested stricter setup later

Once you are comfortable, consider adding:

```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

These help catch common mistakes.

---

## 12. Common beginner mistakes

### Source files outside `rootDir`
If your `.ts` files are not under `src`, the compiler may complain or ignore them.

### Wrong output path
If you run:

```bash
node src/01_basics_datatypes_loops.ts
```

that does **not** run TypeScript directly in standard Node.js.

You either:
- compile first and run the `.js` in `dist`, or
- use `ts-node`

### Mixing module systems
If imports behave strangely, check whether your setup assumes:
- CommonJS
- ESM / NodeNext

Do not mix them casually.

### Import path confusion
Use:

```ts
import { something } from "./utils/mathUtils";
```

not file-system guesses that skip relative path rules.

### Forgetting that TypeScript types disappear at runtime
This is a major interview and practical nuance.

TypeScript checks types during development and compilation, but types are not present in runtime JavaScript.

---

## 13. Minimal working `package.json`

```json
{
  "name": "typescript-refresher",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/01_basics_datatypes_loops.ts",
    "start": "node dist/01_basics_datatypes_loops.js"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.0.0"
  }
}
```

Version numbers can vary.

---

## 14. Minimal working `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

---

## 15. Best practical workflow

A clean workflow is:

1. keep `.ts` files in `src`
2. write or edit code
3. run `npx tsc --watch`
4. run compiled output from `dist`
5. fix type errors immediately instead of ignoring them

---

## 16. Interview-ready understanding

You should be able to explain:

- TypeScript is a superset of JavaScript
- TypeScript compiles to JavaScript
- types are erased at runtime
- `tsconfig.json` controls compilation behavior
- `strict` mode helps catch bugs early
- `rootDir` and `outDir` define source and build layout
- Node runs JavaScript, not raw TypeScript, unless using tools like `ts-node`

---

## 17. Recommended next step

After this setup, the best next file is a real small project with multiple files, such as:

- `models/user.ts`
- `services/userService.ts`
- `utils/logger.ts`
- `app.ts`

That will make the import/export material concrete.

---

## End

Finished setup guide.
