import { InferSelectModel } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

const userSystemEnum = pgEnum("user_system_enum", ["user", "system"])
export type RoleType = typeof userSystemEnum.enumValues[number]
export const chats = pgTable("chats", {
    id: serial("id").primaryKey(),
    pdfName: text("pdf_name").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    fileKey: text("file_key").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: varchar("user_id", {length: 256}).notNull()
})

export type DrizzleChats = InferSelectModel<typeof chats>

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    chatId: integer("chat_id").references(() => chats.id).notNull(),
    role: userSystemEnum("role").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const subscription = pgTable("subscription", {
    id: serial("subscription").primaryKey(),
    userId: varchar("user_id", {length: 256}).notNull(),
    createdAt: timestamp("create_at").notNull().defaultNow(),
    subcribed: boolean("subscribed").notNull(),
})