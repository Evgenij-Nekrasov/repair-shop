import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  address1: text('address1').notNull(),
  address2: text('address2'),
  zip: varchar('zip', { length: 20 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  active: boolean('active').default(true).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});

export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .notNull()
    .references(() => customers.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  completed: boolean('completed').default(false).notNull(),
  tech: varchar('tech', { length: 255 }).notNull().default('unassigned'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});

// Create relations
export const customerRelations = relations(customers, ({ many }) => ({
  tickets: many(tickets),
}));

export const ticketRelations = relations(tickets, ({ one }) => ({
  customer: one(customers, {
    fields: [tickets.customerId],
    references: [customers.id],
  }),
}));
