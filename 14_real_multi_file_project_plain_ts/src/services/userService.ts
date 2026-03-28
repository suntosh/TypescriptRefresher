// src/services/userService.ts

import type { User } from "../models/user";

export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: "Santosh",
      email: "santosh@example.com",
      role: "admin",
      isActive: true,
    },
    {
      id: 2,
      name: "Alice",
      email: "alice@example.com",
      role: "user",
      isActive: true,
    },
    {
      id: 3,
      name: "Bob",
      email: "bob@example.com",
      role: "user",
      isActive: false,
    },
  ];

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getActiveUsers(): User[] {
    return this.users.filter((user) => user.isActive);
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}
