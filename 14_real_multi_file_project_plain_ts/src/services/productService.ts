// src/services/productService.ts

import type { Product } from "../models/product";

export class ProductService {
  private products: Product[] = [
    {
      id: 101,
      title: "Mechanical Keyboard",
      price: 129.99,
      inStock: true,
    },
    {
      id: 102,
      title: "Wireless Mouse",
      price: 59.99,
      inStock: true,
    },
    {
      id: 103,
      title: "4K Monitor",
      price: 399.99,
      inStock: false,
    },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  getInStockProducts(): Product[] {
    return this.products.filter((product) => product.inStock);
  }

  getTotalInventoryValue(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }
}
