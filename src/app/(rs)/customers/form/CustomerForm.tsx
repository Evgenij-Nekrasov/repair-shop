'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/src/components/ui/form';
import { Button } from '@/src/components/ui/button';

import {
  insertCustomerSchema,
  InsertCustomer,
  SelectCustomer,
} from '@/src/zod-schemas/customer';
import { InputWithLabel } from '@/src/components/inputs/InputWithLabel';
import { TextAreaWithLabel } from '@/src/components/inputs/TextAreaWithLabel';
import { SelectWithLabel } from '@/src/components/inputs/SelectWithLabel';
import { StatesArray } from '@/src/constants/StatesArray';

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
    notes: customer?.notes ?? '',
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
            className="space-y-8 flex flex-col md:flex-row  md:gap-x-6"
          >
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <InputWithLabel<InsertCustomer>
                fieldTitle="First Name"
                nameInSchema="firstName"
              />

              <InputWithLabel<InsertCustomer>
                fieldTitle="Last Name"
                nameInSchema="lastName"
              />

              <InputWithLabel<InsertCustomer>
                fieldTitle="Address 1"
                nameInSchema="address1"
              />

              <InputWithLabel<InsertCustomer>
                fieldTitle="Address 2"
                nameInSchema="address2"
              />

              <InputWithLabel<InsertCustomer>
                fieldTitle="City"
                nameInSchema="city"
              />

              <SelectWithLabel<InsertCustomer>
                fieldTitle="Country"
                nameInSchema="country"
                data={StatesArray}
              />
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <InputWithLabel<InsertCustomer>
                fieldTitle="Zip Code"
                nameInSchema="zip"
              />

              <InputWithLabel<InsertCustomer>
                fieldTitle="Email"
                nameInSchema="email"
              />

              <InputWithLabel<InsertCustomer>
                fieldTitle="Phone"
                nameInSchema="phone"
              />

              <TextAreaWithLabel<InsertCustomer>
                fieldTitle="Notes"
                nameInSchema="notes"
                className="h-30 max-h-50"
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4 cursor-pointer"
                  variant="default"
                  title="Save Customer"
                >
                  Save
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  title="Reset Form"
                  className="cursor-pointer"
                  onClick={() => form.reset(defaultValues)}
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
