import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { customers } from '@/src/db/schema';

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: z.string().min(1, 'First name is required').max(255),
  lastName: z.string().min(1, 'Last name is required').max(255),
  email: z.string().email('Invalid email address').max(255),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .max(20)
    .optional(),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  zip: z
    .string()
    .regex(/^\d{5}$/, 'Zip code must be 5 digits')
    .min(1, 'Zip code is required')
    .max(20),
  city: z.string().min(1, 'City is required').max(100),
  country: z.string().min(1, 'Country is required').max(100),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type SelectCustomer = z.infer<typeof selectCustomerSchema>;
