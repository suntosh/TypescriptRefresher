// 08_error_handling.ts
// TypeScript refresher:
// - try/catch/finally
// - throwing errors
// - narrowing catch values from unknown
// - custom error classes
// - validation examples
// - async error handling basics

// =========================
// 1. BASIC TRY/CATCH/FINALLY
// =========================

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

console.log("Basic try/catch/finally:");

try {
  const result = divide(10, 2);
  console.log("10 / 2 =", result);
} catch (error) {
  console.log("Something went wrong.");
} finally {
  console.log("Finished divide example.");
}

// =========================
// 2. CATCH VALUE IS UNKNOWN
// =========================
// In modern TypeScript, the caught value should be treated safely.
// Narrow it before using specific properties.

console.log("\nCatch value narrowing:");

try {
  divide(10, 0);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Caught Error object:", error.message);
  } else {
    console.log("Caught non-Error value:", error);
  }
}

// =========================
// 3. THROWING DIFFERENT VALUES
// =========================
// Technically JavaScript allows throwing anything, but throwing Error
// objects is the best practice.

function riskyOperation(value: number): string {
  if (value < 0) {
    throw new Error("Negative values are not allowed.");
  }

  if (value === 0) {
    throw new Error("Zero triggers a special failure.");
  }

  return `Processed value: ${value}`;
}

console.log("\nThrowing errors intentionally:");

try {
  console.log(riskyOperation(5));
  console.log(riskyOperation(0));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Handled risky operation error:", error.message);
  }
}

// =========================
// 4. INPUT VALIDATION EXAMPLE
// =========================

function parseAge(input: string): number {
  const parsed = Number(input);

  if (Number.isNaN(parsed)) {
    throw new Error("Age must be a valid number.");
  }

  if (parsed < 0) {
    throw new Error("Age cannot be negative.");
  }

  return parsed;
}

console.log("\nValidation example:");

const ageInputs = ["42", "abc", "-10"];

for (const input of ageInputs) {
  try {
    const age = parseAge(input);
    console.log(`Parsed age from "${input}":`, age);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Failed to parse "${input}":`, error.message);
    }
  }
}

// =========================
// 5. CUSTOM ERROR CLASS
// =========================

class ValidationError extends Error {
  field: string;

  constructor(field: string, message: string) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function registerUser(username: string, password: string): string {
  if (username.trim().length < 3) {
    throw new ValidationError(
      "username",
      "Username must be at least 3 characters long."
    );
  }

  if (password.length < 8) {
    throw new ValidationError(
      "password",
      "Password must be at least 8 characters long."
    );
  }

  return `User ${username} registered successfully.`;
}

console.log("\nCustom error class example:");

try {
  console.log(registerUser("sa", "12345678"));
} catch (error: unknown) {
  if (error instanceof ValidationError) {
    console.log(
      `Validation failed for field "${error.field}": ${error.message}`
    );
  } else if (error instanceof Error) {
    console.log("General error:", error.message);
  }
}

// =========================
// 6. MULTIPLE CATCH PATHS
// =========================

function findUserById(id: number): { id: number; name: string } {
  if (id <= 0) {
    throw new ValidationError("id", "ID must be greater than 0.");
  }

  if (id !== 1) {
    throw new Error("User not found.");
  }

  return { id: 1, name: "Santosh" };
}

console.log("\nMultiple error paths:");

for (const id of [0, 2, 1]) {
  try {
    const user = findUserById(id);
    console.log("Found user:", user);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      console.log(`ValidationError on ${error.field}: ${error.message}`);
    } else if (error instanceof Error) {
      console.log("Regular error:", error.message);
    } else {
      console.log("Unknown thrown value:", error);
    }
  }
}

// =========================
// 7. RE-THROWING ERRORS
// =========================

function readConfiguration(configText: string): object {
  try {
    return JSON.parse(configText);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Invalid configuration JSON: ${error.message}`);
    }

    throw new Error("Unknown JSON parsing error.");
  }
}

console.log("\nRe-throwing example:");

try {
  const config = readConfiguration('{"env":"prod","debug":false}');
  console.log("Valid config:", config);

  readConfiguration("{ invalid json }");
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Configuration error:", error.message);
  }
}

// =========================
// 8. FINALLY FOR CLEANUP
// =========================

function simulateResourceUse(): void {
  console.log("Opening resource...");

  try {
    console.log("Using resource...");
    throw new Error("Something failed while using the resource.");
  } finally {
    console.log("Closing resource in finally.");
  }
}

console.log("\nFinally cleanup example:");

try {
  simulateResourceUse();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Caught after cleanup:", error.message);
  }
}

// =========================
// 9. ASYNC ERROR HANDLING
// =========================

async function fetchMockUser(userId: number): Promise<string> {
  if (userId !== 1) {
    throw new Error("Async user not found.");
  }

  return Promise.resolve("Async User: Santosh");
}

console.log("\nAsync error handling example:");

async function runAsyncExamples(): Promise<void> {
  try {
    const user = await fetchMockUser(1);
    console.log(user);

    const missingUser = await fetchMockUser(99);
    console.log(missingUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Async error:", error.message);
    }
  }
}

// =========================
// 10. SAFE HELPER FUNCTION
// =========================

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function safeParseJson<T>(jsonText: string): Result<T> {
  try {
    const data = JSON.parse(jsonText) as T;
    return { success: true, data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Unknown parsing error." };
  }
}

console.log("\nSafe helper function example:");

const goodJson = safeParseJson<{ name: string; age: number }>(
  '{"name":"Alice","age":30}'
);

const badJson = safeParseJson<{ name: string; age: number }>(
  '{"name":"Alice","age":}'
);

console.log("Good JSON result:", goodJson);
console.log("Bad JSON result:", badJson);

// =========================
// 11. MINI PRACTICE EXAMPLES
// =========================

function ensureNonEmpty(value: string): string {
  if (value.trim() === "") {
    throw new ValidationError("value", "String cannot be empty.");
  }

  return value;
}

console.log("\nMini practice examples:");

for (const value of ["hello", "   ", "world"]) {
  try {
    const valid = ensureNonEmpty(value);
    console.log("Valid string:", `"${valid}"`);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      console.log(`Validation issue on ${error.field}: ${error.message}`);
    }
  }
}

// Run the async examples at the end
runAsyncExamples().then(() => {
  console.log("\nFinished lesson 08.");
});
