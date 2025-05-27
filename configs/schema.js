import { pgTable, varchar, timestamp, integer, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(), // Clerk user id
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  image: varchar("image", { length: 255 }).unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productTable = pgTable("products", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  about: varchar("about", { length: 255 }),
  category: varchar("category", { length: 255 }).notNull(),
  imageUrl: varchar("imageUrl").notNull(),
  fileUrl: varchar("fileUrl").notNull(),
  message: varchar("message", { length: 255 }),
  createdBy: varchar("createdBy", { length: 255 }).notNull().references(() => usersTable.email),
});




export const cartTable = pgTable("cart", {
  id: varchar("id", { length: 255 }).primaryKey(), // Keep if using `randomUUID()` in route
  email: varchar("email", { length: 255 }).notNull().references(() => usersTable.email),
  productId: varchar("productId", { length: 255 })
    .notNull()
    .references(() => productTable.id)
});


export const orderTable = pgTable("orders", {
  id: varchar("id", { length: 255 }).primaryKey(), // Keep if using `randomUUID()` in route
  email: varchar("email", { length: 255 }).notNull().references(() => usersTable.email),
  productId: varchar("productId", { length: 255 })
    .notNull()
    .references(() => productTable.id)
})