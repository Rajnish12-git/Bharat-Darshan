'use client';

import { useState, useTransition, useEffect } from 'react';
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
import { Loader, Search as SearchIcon } from 'lucide-react';
import type { StateData, DetailItem } from '@/lib/heritage-data';
import SearchResults from './search-results';

const formSchema = z.object({
  query: z.string(),
});

export default function SearchRefinement() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<{
    states: StateData[];
    monuments: DetailItem[];
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  const query = form.watch('query');

  useEffect(() => {
    const fetchSuggestions = () => {
      if (query.length < 2) {
        setResults(null);
        return;
      }
      startTransition(async () => {
        const response = await search({ query });
        setResults(response);
      });
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.query.length < 2) {
      setResults(null);
      return;
    }
    startTransition(async () => {
      const response = await search({ query: values.query });
      setResults(response);
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
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Start typing to search for monuments or states..."
                      className="pl-10"
                      {...field}
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

      {!isPending && query.length > 1 && (
        <SearchResults results={results} />
      )}
    </div>
  );
}
