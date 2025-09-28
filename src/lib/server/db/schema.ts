import {
    pgTable,
    serial,
    integer,
    text,
    timestamp,
    boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    balance: integer("balance").default(10).notNull(),
    avatar: text("avatar").notNull(),
    verified: boolean("verified").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
    id: serial("id").primaryKey(),
    token: text("token").notNull(),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at").notNull(),
    used: boolean("used").default(false).notNull(),
});
