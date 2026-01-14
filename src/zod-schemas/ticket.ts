import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { tickets } from '@/src/db/schema';

export const insertTicketSchema = createInsertSchema(tickets, {
  customerId: z.union([z.number(), z.literal('New')]),
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required'),
  completed: z.boolean().optional(),
  tech: z.email('Invalid email address').optional(),
});

export const selectTicketSchema = createSelectSchema(tickets);

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type SelectTicket = z.infer<typeof selectTicketSchema>;
