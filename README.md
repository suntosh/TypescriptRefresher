# TypeScript Refresher

This folder is a practical TypeScript refresher, similar in spirit to a structured C# refresher.

## Goal

Build back TypeScript fluency by covering:

1. basics, data types, and loops
2. functions
3. objects and interfaces
4. classes and access modifiers
5. arrays and higher-order methods
6. generics
7. enums, unions, intersections, and type aliases
8. error handling
9. async/await and promises
10. modules and project structure

## Prerequisites

Install Node.js, then install TypeScript globally if needed:

```bash
npm install -g typescript
```

Check installation:

```bash
tsc --version
node --version
```

## Running a file

Compile a `.ts` file into JavaScript:

```bash
tsc 01_basics_datatypes_loops.ts
```

Run the compiled JavaScript:

```bash
node 01_basics_datatypes_loops.js
```

## Suggested tsconfig.json later

When you are ready to move beyond single files:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "outDir": "./dist"
  }
}
```

Then compile all files:

```bash
tsc
```

## File naming convention

- `01_basics_datatypes_loops.ts`
- `02_functions.ts`
- `03_objects_interfaces.ts`
- `04_classes.ts`

## Notes

- Prefer `const` by default, use `let` when reassignment is needed.
- Avoid `any` unless you truly need to opt out of type checking.
- Prefer `unknown` over `any` when the type is not yet known.
- Keep examples small and executable.

## First lesson

Start with:

- variables
- primitive types
- arrays and tuples
- unions
- `any` vs `unknown`
- conditionals
- loops
