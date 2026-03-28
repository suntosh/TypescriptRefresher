// src/app.ts

import Logger from "./utils/logger";
import { UserService } from "./services/userService";
import { ProductService } from "./services/productService";
import type { User } from "./models/user";

const logger = new Logger();
const userService = new UserService();
const productService = new ProductService();

logger.log("Starting plain TypeScript multi-file project");

logger.info("All users:");
console.log(userService.getAll());

logger.info("Active users:");
console.log(userService.getActiveUsers());

const newUser: User = {
  id: 4,
  name: "Charlie",
  email: "charlie@example.com",
  role: "user",
  isActive: true,
};

userService.addUser(newUser);

logger.info("Users after adding Charlie:");
console.log(userService.getAll());

logger.info("Find user by ID = 2:");
console.log(userService.getById(2));

logger.info("All products:");
console.log(productService.getAll());

logger.info("In-stock products:");
console.log(productService.getInStockProducts());

logger.info("Find product by ID = 103:");
console.log(productService.getById(103));

logger.info("Total inventory value:");
console.log(productService.getTotalInventoryValue());

logger.log("Finished app.ts");
