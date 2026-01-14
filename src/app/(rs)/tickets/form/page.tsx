import * as Sentry from '@sentry/nextjs';

import { getCustomer } from '@/src/lib/queries/getCustomer';
import { getTicket } from '@/src/lib/queries/getTicket';
import { BackButton } from '@/src/components/BackButton';
import { TicketForm } from '@/src/app/(rs)/tickets/form/TicketForm';

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl">Ticket id or Customer id not provided</h2>
          <BackButton title="Go back" variant="outline" />
        </div>
      );
    }

    if (customerId) {
      const customer = await getCustomer(Number(customerId));

      if (!customer) {
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl">Customer #{customerId} not found</h2>
            <BackButton title="Go back" className="mt-4" variant="outline">
              Back to Customers
            </BackButton>
          </div>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl">Customer id #{customerId} is inactive</h2>
            <BackButton title="Go back" className="mt-4" variant="outline">
              Back to Customers
            </BackButton>
          </>
        );
      }

      return <TicketForm customer={customer} />;
    }

    if (ticketId) {
      const ticket = await getTicket(Number(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl">Ticket id #{ticketId} not found</h2>
            <BackButton title="Go back" className="mt-4" variant="outline">
              Back to Tickets
            </BackButton>
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);
      return <TicketForm ticket={ticket} customer={customer} />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      console.error('Error fetching ticket:', error.message);
    }
  }
}
