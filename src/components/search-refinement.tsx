'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { search } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Loader, Search } from 'lucide-react';
import type { StateData, DetailItem } from '@/lib/heritage-data';
import SearchResults from './search-results';

const formSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters.'),
});

export default function SearchRefinement() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<{
    states: StateData[];
    monuments: DetailItem[];
  } | null>(null);
  const [searched, setSearched] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const response = await search({ query: values.query });
      setResults(response);
      setSearched(true);
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mb-12">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search for monuments or states..."
                      className="pl-10"
                      {...field}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              'Search'
            )}
          </Button>
        </form>
      </Form>

      {isPending && (
        <div className="flex justify-center items-center py-16">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isPending && searched && (
        <SearchResults results={results} />
      )}
    </div>
  );
}
