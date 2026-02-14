import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // stored in cents
  image: text("image").notNull(),
  serviceType: text("service_type").notNull(), // 'food', 'grocery', 'medicine', 'parcel'
  category: text("category").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  items: jsonb("items").notNull(), // Array of { productId, quantity, price }
  total: integer("total").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'confirmed', 'delivered'
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, status: true });

// === TYPES ===

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type CartItem = Product & { quantity: number };

// API Types
export type OrderRequest = {
  items: { productId: number; quantity: number; price: number }[];
  total: number;
};
