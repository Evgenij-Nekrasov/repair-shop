'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  insertCustomerSchema,
  InsertCustomer,
  SelectCustomer,
} from '@/src/zod-schemas/customer';
import { Form } from '@/components/ui';

type CustomerFormProps = {
  customer?: SelectCustomer | null;
};

export function CustomerForm({ customer }: CustomerFormProps) {
  const defaultValues: InsertCustomer = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    address1: customer?.address1 ?? '',
    address2: customer?.address2 ?? '',
    zip: customer?.zip ?? '',
    city: customer?.city ?? '',
    country: customer?.country ?? '',
    email: customer?.email ?? '',
    phone: customer?.phone ?? '',
  };

  const form = useForm<InsertCustomer>({
    resolver: zodResolver(insertCustomerSchema),
    mode: 'onBlur',
    defaultValues,
  });

  async function onSubmit(data: InsertCustomer) {
    console.log('Form submitted:', data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold ">
          {customer?.id ? 'Edit' : 'New'} Customer Form
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6"
          >
            <p>{JSON.stringify(form.getValues())}</p>
          </form>
        </Form>
      </div>
    </div>
  );
}
