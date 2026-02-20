import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// 🔹 Simple in-memory user store (prototype)
// ⚠️ Later move to database
type User = {
  id: number;
  phone: string;
  name?: string;
  role?: string;
};

const users: User[] = [];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ================= PRODUCTS =================

  app.get(api.products.list.path, async (req, res) => {
    const serviceType = req.query.serviceType as string | undefined;
    const products = await storage.getProducts(serviceType);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  // ================= ORDERS =================

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.orders.list.path, async (req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  // ================= AUTH ROUTES =================

  // 🔐 Register
  app.post("/api/auth/register", async (req, res) => {
    const schema = z.object({
      phone: z.string().min(10),
      name: z.string().min(2),
      role: z.string().optional(),
    });

    try {
      const data = schema.parse(req.body);

      const existing = users.find((u) => u.phone === data.phone);
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user: User = {
        id: users.length + 1,
        ...data,
      };

      users.push(user);

      res.json({
        message: "User registered",
        user,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // 🔐 Login
  app.post("/api/auth/login", async (req, res) => {
    const schema = z.object({
      phone: z.string().min(10),
    });

    try {
      const { phone } = schema.parse(req.body);

      const user = users.find((u) => u.phone === phone);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "Login successful",
        user,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // ================= SEED =================

  await seedDatabase();

  return httpServer;
}

// ================= SEED FUNCTION =================

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    console.log("Seeding database...");
    
    const products = [
      // Food
      { name: "Margherita Pizza", description: "Classic tomato and cheese", price: 1200, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80", serviceType: "food", category: "Pizza" },
      { name: "Chicken Burger", description: "Crispy chicken patty with lettuce", price: 800, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", serviceType: "food", category: "Burger" },
      { name: "Pasta Alfredo", description: "Creamy white sauce pasta", price: 1500, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80", serviceType: "food", category: "Pasta" },

      // Grocery
      { name: "Fresh Apples (1kg)", description: "Sweet red apples", price: 300, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80", serviceType: "grocery", category: "Fruits" },
      { name: "Organic Milk (1L)", description: "Farm fresh milk", price: 150, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80", serviceType: "grocery", category: "Dairy" },
      { name: "Whole Wheat Bread", description: "Freshly baked bread", price: 200, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", serviceType: "grocery", category: "Bakery" },

      // Medicine
      { name: "Paracetamol 500mg", description: "For fever and pain relief", price: 50, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80", serviceType: "medicine", category: "General" },
      { name: "Vitamin C Tablets", description: "Immunity booster", price: 300, image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&q=80", serviceType: "medicine", category: "Supplements" },
      { name: "First Aid Kit", description: "Basic emergency supplies", price: 1500, image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80", serviceType: "medicine", category: "Essentials" },

      // Parcel
      { name: "Standard Delivery", description: "Within city limits (up to 5kg)", price: 400, image: "https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=800&q=80", serviceType: "parcel", category: "Local" },
      { name: "Express Delivery", description: "Same day delivery", price: 800, image: "https://images.unsplash.com/photo-1620455003858-54c01b1a788d?w=800&q=80", serviceType: "parcel", category: "Express" },
    ];

    for (const p of products) {
      await storage.createProduct(p);
    }
    console.log("Seeding complete!");
  }
}
