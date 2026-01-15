'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

type DataObj = {
  id: string;
  name: string;
};

type SelectLabelProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  className?: string;
};

export function SelectWithLabel<S>({
  fieldTitle,
  nameInSchema,
  data,
  className,
}: SelectLabelProps<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="text-base">
          <FormLabel>{fieldTitle}</FormLabel>

          <Select {...field} onValueChange={(value) => field.onChange(value)}>
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={`w-full max-w-xs ${className}`}
              >
                <SelectValue placeholder={fieldTitle} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-60 overflow-y-auto">
              {data.map((item) => (
                <SelectItem key={`${nameInSchema}_${item.id}`} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
