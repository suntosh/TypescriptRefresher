# 14_real_multi_file_project_plain_ts

A small plain TypeScript multi-file project using:

- models
- services
- utils
- a real app entry point
- `tsconfig.json`
- `package.json`

## Project structure

```text
14_real_multi_file_project_plain_ts/
├── src/
│   ├── app.ts
│   ├── models/
│   │   ├── user.ts
│   │   └── product.ts
│   ├── services/
│   │   ├── userService.ts
│   │   └── productService.ts
│   └── utils/
│       └── logger.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Install

```bash
npm install
```

## Run in dev mode

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Run compiled output

```bash
npm start
```

## What this project teaches

- named exports
- default exports
- type-only imports
- separating models, services, and utils
- compiling TypeScript to JavaScript
- using a single entry point (`app.ts`)
