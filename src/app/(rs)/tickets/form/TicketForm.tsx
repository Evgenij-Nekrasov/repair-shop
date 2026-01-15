'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/src/components/ui/form';
import { Button } from '@/src/components/ui/button';

import {
  insertTicketSchema,
  InsertTicket,
  SelectTicket,
} from '@/src/zod-schemas/ticket';
import { SelectCustomer } from '@/src/zod-schemas/customer';

import { InputWithLabel } from '@/src/components/inputs/InputWithLabel';
import { TextAreaWithLabel } from '@/src/components/inputs/TextAreaWithLabel';
import { CheckboxWithLabel } from '@/src/components/inputs/CheckboxWithLabel';

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
            className="space-y-8 flex flex-col md:flex-row  md:gap-x-6"
          >
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <InputWithLabel<InsertTicket>
                fieldTitle="Title"
                nameInSchema="title"
              />

              <InputWithLabel<InsertTicket>
                fieldTitle="Tech"
                nameInSchema="tech"
                readOnly={true}
              />

              <CheckboxWithLabel<InsertTicket>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
              />

              <div className="mt-4 space-y-2">
                <h3 className="text-lg">Customer Details</h3>
                <hr className="w-4/5" />
                <p>
                  {customer?.firstName} {customer?.lastName}
                </p>
                <p>{customer?.address1}</p>
                <p>{customer?.address2 ? customer.address2 : ''}</p>
                <p>
                  {customer?.city}, {customer?.zip}
                </p>
                <hr className="w-4/5" />
                <p>{customer?.email}</p>
                <p>{customer?.phone}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <TextAreaWithLabel<InsertTicket>
                fieldTitle="Description"
                nameInSchema="description"
                className="h-96 max-h-100"
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4 cursor-pointer"
                  variant="default"
                  title="Save Ticket"
                >
                  Save
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  title="Reset Form"
                  className="cursor-pointer"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
