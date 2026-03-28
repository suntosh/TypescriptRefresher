// 04_classes.ts
// TypeScript refresher:
// - basic classes
// - constructors
// - public, private, protected
// - readonly
// - getters and setters
// - static members
// - inheritance
// - method overriding
// - abstract classes

// =========================
// 1. BASIC CLASS
// =========================

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
  }
}

const person1 = new Person("Santosh", 50);
person1.introduce();

// =========================
// 2. ACCESS MODIFIERS
// =========================

class BankAccount {
  public accountHolder: string;
  private balance: number;
  protected accountType: string;

  constructor(accountHolder: string, balance: number, accountType: string) {
    this.accountHolder = accountHolder;
    this.balance = balance;
    this.accountType = accountType;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }

    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account1 = new BankAccount("Alice", 1000, "Checking");
console.log("\nAccount holder:", account1.accountHolder);
account1.deposit(250);
console.log("Balance via method:", account1.getBalance());

// The following would be errors if uncommented:
// console.log(account1.balance);      // private
// console.log(account1.accountType);  // protected

// =========================
// 3. PARAMETER PROPERTIES
// =========================
// TypeScript lets you declare and initialize members directly
// in the constructor parameter list.

class Employee {
  constructor(
    public id: number,
    public name: string,
    private salary: number
  ) {}

  showDetails(): void {
    console.log(`Employee ID: ${this.id}, Name: ${this.name}`);
  }

  getSalary(): number {
    return this.salary;
  }
}

const emp1 = new Employee(101, "Bob", 90000);
console.log("\nEmployee example:");
emp1.showDetails();
console.log("Salary via method:", emp1.getSalary());

// =========================
// 4. READONLY
// =========================

class Product {
  readonly productId: number;
  name: string;

  constructor(productId: number, name: string) {
    this.productId = productId;
    this.name = name;
  }
}

const product1 = new Product(1, "Laptop");
console.log("\nReadonly example:");
console.log(product1.productId, product1.name);

// The following would be an error if uncommented:
// product1.productId = 2;

// =========================
// 5. GETTERS AND SETTERS
// =========================

class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      console.log("Temperature cannot go below absolute zero.");
      return;
    }
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }
}

const temp = new Temperature(25);
console.log("\nGetter/Setter example:");
console.log("Celsius:", temp.celsius);
console.log("Fahrenheit:", temp.fahrenheit);

temp.celsius = 30;
console.log("Updated Celsius:", temp.celsius);
console.log("Updated Fahrenheit:", temp.fahrenheit);

// =========================
// 6. STATIC MEMBERS
// =========================

class MathHelper {
  static pi: number = 3.14159;

  static square(value: number): number {
    return value * value;
  }
}

console.log("\nStatic members:");
console.log("PI:", MathHelper.pi);
console.log("Square of 5:", MathHelper.square(5));

// =========================
// 7. INHERITANCE
// =========================

class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} barks.`);
  }

  override makeSound(): void {
    console.log(`${this.name} says: Woof!`);
  }
}

const dog1 = new Dog("Rocky");
console.log("\nInheritance example:");
dog1.makeSound();
dog1.bark();

// =========================
// 8. PROTECTED IN INHERITANCE
// =========================

class Vehicle {
  constructor(protected brand: string) {}

  showBrand(): void {
    console.log(`Brand: ${this.brand}`);
  }
}

class Car extends Vehicle {
  display(): void {
    console.log(`This car is a ${this.brand}.`);
  }
}

const car1 = new Car("Toyota");
console.log("\nProtected member example:");
car1.showBrand();
car1.display();

// =========================
// 9. ABSTRACT CLASSES
// =========================

abstract class Shape {
  abstract getArea(): number;

  describe(): void {
    console.log("This is a shape.");
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle1 = new Circle(3);
console.log("\nAbstract class example:");
circle1.describe();
console.log("Circle area:", circle1.getArea());

// =========================
// 10. CLASS IMPLEMENTING INTERFACE
// =========================

interface Printable {
  print(): void;
}

class Report implements Printable {
  constructor(private title: string) {}

  print(): void {
    console.log(`Printing report: ${this.title}`);
  }
}

const report1 = new Report("Quarterly Results");
console.log("\nImplements interface example:");
report1.print();

// =========================
// 11. PRACTICE MINI EXAMPLES
// =========================

class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  getValue(): number {
    return this.count;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.decrement();

console.log("\nCounter example:");
console.log("Counter value:", counter.getValue());

class Student {
  constructor(
    public studentId: number,
    public fullName: string,
    public grade: string
  ) {}

  displayInfo(): void {
    console.log(
      `Student ID: ${this.studentId}, Name: ${this.fullName}, Grade: ${this.grade}`
    );
  }
}

const student1 = new Student(501, "Charlie Brown", "A");
console.log("\nStudent example:");
student1.displayInfo();

// =========================
// END
// =========================

console.log("\nFinished lesson 04.");
