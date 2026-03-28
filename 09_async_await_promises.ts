// 09_async_await_promises.ts
// TypeScript refresher:
// - Promise basics
// - resolve and reject
// - .then(), .catch(), .finally()
// - async functions
// - await
// - Promise.all()
// - Promise.allSettled()
// - sequential vs parallel async work
// - practical examples

// Small helper to simulate delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// =========================
// 1. BASIC PROMISE
// =========================

function getWelcomeMessage(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Welcome to async TypeScript.");
    }, 300);
  });
}

console.log("Basic Promise example:");

getWelcomeMessage()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log("Unexpected error:", error);
  })
  .finally(() => {
    console.log("Finished basic Promise example.");
  });

// =========================
// 2. RESOLVE AND REJECT
// =========================

function divideAsync(a: number, b: number): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b === 0) {
        reject(new Error("Division by zero is not allowed."));
        return;
      }

      resolve(a / b);
    }, 300);
  });
}

console.log("\nResolve and reject example:");

divideAsync(20, 4)
  .then((result) => {
    console.log("20 / 4 =", result);
    return divideAsync(10, 0);
  })
  .then((result) => {
    console.log("This line will not run:", result);
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.log("Caught async error:", error.message);
    } else {
      console.log("Caught unknown error:", error);
    }
  });

// =========================
// 3. ASYNC FUNCTION
// =========================

async function getCourseTitle(): Promise<string> {
  await delay(200);
  return "TypeScript Refresher Course";
}

// =========================
// 4. AWAIT
// =========================

async function runAwaitExample(): Promise<void> {
  console.log("\nAsync/await example:");

  try {
    const title = await getCourseTitle();
    console.log("Course title:", title);

    const result = await divideAsync(18, 3);
    console.log("18 / 3 =", result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Await example error:", error.message);
    }
  }
}

// =========================
// 5. SIMULATED API CALL
// =========================

type User = {
  id: number;
  name: string;
  email: string;
};

function fetchUser(userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve({
          id: 1,
          name: "Santosh",
          email: "santosh@example.com",
        });
      } else {
        reject(new Error(`User with id ${userId} not found.`));
      }
    }, 400);
  });
}

async function runFetchUserExample(): Promise<void> {
  console.log("\nSimulated API call example:");

  try {
    const user = await fetchUser(1);
    console.log("Fetched user:", user);

    await fetchUser(99);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Fetch user error:", error.message);
    }
  }
}

// =========================
// 6. SEQUENTIAL ASYNC WORK
// =========================

async function stepOne(): Promise<string> {
  await delay(200);
  return "Step 1 complete";
}

async function stepTwo(): Promise<string> {
  await delay(200);
  return "Step 2 complete";
}

async function stepThree(): Promise<string> {
  await delay(200);
  return "Step 3 complete";
}

async function runSequentialSteps(): Promise<void> {
  console.log("\nSequential async work:");

  const result1 = await stepOne();
  console.log(result1);

  const result2 = await stepTwo();
  console.log(result2);

  const result3 = await stepThree();
  console.log(result3);
}

// =========================
// 7. PARALLEL ASYNC WORK WITH Promise.all
// =========================

async function runParallelSteps(): Promise<void> {
  console.log("\nParallel async work with Promise.all:");

  const results = await Promise.all([stepOne(), stepTwo(), stepThree()]);
  console.log(results);
}

// =========================
// 8. Promise.allSettled
// =========================

function taskSuccess(name: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${name} succeeded`), 250);
  });
}

function taskFailure(name: string): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`${name} failed`)), 250);
  });
}

async function runAllSettledExample(): Promise<void> {
  console.log("\nPromise.allSettled example:");

  const results = await Promise.allSettled([
    taskSuccess("Task A"),
    taskFailure("Task B"),
    taskSuccess("Task C"),
  ]);

  for (const result of results) {
    if (result.status === "fulfilled") {
      console.log("Fulfilled:", result.value);
    } else {
      console.log("Rejected:", result.reason instanceof Error ? result.reason.message : result.reason);
    }
  }
}

// =========================
// 9. RETURNING PROMISES FROM METHODS
// =========================

class DataService {
  async getProducts(): Promise<string[]> {
    await delay(300);
    return ["Laptop", "Mouse", "Keyboard"];
  }

  async getProductCount(): Promise<number> {
    const products = await this.getProducts();
    return products.length;
  }
}

async function runClassAsyncExample(): Promise<void> {
  console.log("\nClass async methods example:");

  const service = new DataService();
  const products = await service.getProducts();
  const count = await service.getProductCount();

  console.log("Products:", products);
  console.log("Product count:", count);
}

// =========================
// 10. TRY/CATCH WITH MULTIPLE AWAITS
// =========================

async function processOrder(orderId: number): Promise<string> {
  await delay(200);

  if (orderId <= 0) {
    throw new Error("Invalid order ID.");
  }

  return `Order ${orderId} processed`;
}

async function sendConfirmation(orderId: number): Promise<string> {
  await delay(200);
  return `Confirmation sent for order ${orderId}`;
}

async function runOrderFlow(orderId: number): Promise<void> {
  console.log(`\nOrder flow for order ${orderId}:`);

  try {
    const processed = await processOrder(orderId);
    console.log(processed);

    const confirmation = await sendConfirmation(orderId);
    console.log(confirmation);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Order flow error:", error.message);
    }
  }
}

// =========================
// 11. PRACTICAL RESULT TYPE EXAMPLE
// =========================

type AsyncResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

async function safeFetchUser(userId: number): Promise<AsyncResult<User>> {
  try {
    const user = await fetchUser(userId);
    return { success: true, data: user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Unknown error occurred." };
  }
}

async function runSafeFetchExample(): Promise<void> {
  console.log("\nSafe async result example:");

  const goodResult = await safeFetchUser(1);
  const badResult = await safeFetchUser(999);

  console.log("Good result:", goodResult);
  console.log("Bad result:", badResult);
}

// =========================
// 12. MAIN RUNNER
// =========================

async function main(): Promise<void> {
  await runAwaitExample();
  await runFetchUserExample();
  await runSequentialSteps();
  await runParallelSteps();
  await runAllSettledExample();
  await runClassAsyncExample();
  await runOrderFlow(1001);
  await runOrderFlow(0);
  await runSafeFetchExample();

  console.log("\nFinished lesson 09.");
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.log("Unhandled main error:", error.message);
  } else {
    console.log("Unhandled unknown error:", error);
  }
});
