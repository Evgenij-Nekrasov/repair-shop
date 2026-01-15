'use client';

import { TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Textarea } from '@/src/components/ui/textarea';

type TextAreaWithLabelProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...textAreaProps
}: TextAreaWithLabelProps<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="text-base mb-2">
          <FormLabel>{fieldTitle}</FormLabel>
          <FormControl>
            <Textarea
              id={nameInSchema}
              className={className}
              {...field}
              {...textAreaProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
