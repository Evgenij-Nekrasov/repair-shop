'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  insertTicketSchema,
  InsertTicket,
  SelectTicket,
} from '@/src/zod-schemas/ticket';
import { SelectCustomer } from '@/src/zod-schemas/customer';
import { Form } from '@/components/ui';

type TicketFormProps = {
  customer?: SelectCustomer | null;
  ticket?: SelectTicket | null;
};

export function TicketForm({ customer, ticket }: TicketFormProps) {
  const defaultValues: InsertTicket = {
    id: ticket?.id ?? 0,
    customerId: customer?.id ?? 0,
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? 'example@example.com',
  };

  const form = useForm<InsertTicket>({
    resolver: zodResolver(insertTicketSchema),
    mode: 'onBlur',
    defaultValues,
  });

  async function onSubmit(data: InsertTicket) {
    console.log('Form submitted:', data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold ">
          {ticket?.id ? `Ticket #${ticket.id}` : 'New Ticket Form'}
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
