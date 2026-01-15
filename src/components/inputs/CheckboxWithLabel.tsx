'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Checkbox } from '@/src/components/ui/checkbox';

type CheckboxWithLabelProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  message?: string;
};

export function CheckboxWithLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
}: CheckboxWithLabelProps<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="w-full flex items-center space-x-3 space-y-0">
          <FormLabel className="text-base">{fieldTitle}</FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                id={nameInSchema}
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            {message && (
              <span className="text-sm text-muted-foreground">{message}</span>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
