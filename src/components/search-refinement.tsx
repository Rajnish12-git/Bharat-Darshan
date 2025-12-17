"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { refineSearch } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Loader, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function SearchRefinement() {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchFilters, setSearchFilters] = useState<string>("");
  const [initialQuery, setInitialQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const hasStarted = messages.length > 0;

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }
  }, [messages]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const userMessage = values.message;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    if (!hasStarted) {
      setInitialQuery(userMessage);
    }

    startTransition(async () => {
      const response = await refineSearch({
        initialQuery: hasStarted ? initialQuery : userMessage,
        userMessage: hasStarted ? userMessage : undefined,
        searchFilters: searchFilters,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.refinedQuery },
      ]);
      setSearchFilters(response.searchFilters);
      setSearchResults(response.searchResults);
    });

    form.reset();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col h-[70vh]">
        <ScrollArea className="flex-1 mb-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {!hasStarted && (
              <div className="text-center text-muted-foreground p-8">
                <Bot className="mx-auto h-10 w-10 mb-4" />
                <p>Hello! What would you like to discover today?</p>
                <p className="text-sm">Try "forts in Rajasthan" or "temples in South India".</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex items-start gap-3", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={16}/></AvatarFallback>
                    </Avatar>
                )}
                <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  <p className="text-sm">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><User size={16}/></AvatarFallback>
                    </Avatar>
                )}
              </div>
            ))}
            {isPending && (
                <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={16}/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-muted flex items-center">
                        <Loader className="h-4 w-4 animate-spin"/>
                    </div>
                </div>
            )}
            {searchResults && (
                <div className="p-4 border-t">
                    <h3 className="font-bold mb-2">Search Results</h3>
                    <p className="text-sm text-muted-foreground">{searchResults}</p>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={hasStarted ? "e.g., 'show me ones built before 1600'" : "Search for monuments or states..."} {...field} disabled={isPending}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader className="h-4 w-4 animate-spin"/> : "Send"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
