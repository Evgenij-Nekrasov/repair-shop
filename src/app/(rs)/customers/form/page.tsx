import * as Sentry from '@sentry/nextjs';

import { getCustomer } from '@/src/lib/queries/getCustomer';
import { BackButton } from '@/src/components/BackButton';

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;
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
    } else {
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      console.error('Error fetching customer:', error.message);
    }
  }
}
