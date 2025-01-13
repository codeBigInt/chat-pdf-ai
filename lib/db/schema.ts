import { InferSelectModel } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

// Define enums
export const userSystemEnum = pgEnum("user_system_enum", ["user", "system"]);
export const planTypeEnum = pgEnum("plan_type_enum", ["free", "premium", "pro"]);

export type RoleType = typeof userSystemEnum.enumValues[number];

export const chats = pgTable("chats", {
    id: serial("id").primaryKey(),
    pdfName: text("pdf_name").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    fileKey: text("file_key").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: varchar("user_id", {length: 256}).notNull()
});
export type DrizzleChats = InferSelectModel<typeof chats>;
export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    chatId: integer("chat_id").references(() => chats.id).notNull(),
    role: userSystemEnum("role").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type DrizzleSubscriptions = InferSelectModel<typeof subscriptions>

export const subscriptions = pgTable("subscriptions", { // Changed table name to plural
    id: serial("id").primaryKey(),
    userId: varchar("user_id", {length: 256}).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    subscribed: boolean("subscribed").notNull().default(false),
    plan: planTypeEnum("plan").notNull().default("free"), // Changed column name
    limit: integer("limit").notNull().default(3)
});