"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { updateBooking } from "@/hooks/use-bookings";
import architecturalMarvels from "@/lib/architectural-marvels.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const bookingSchema = z
  .object({
    monumentName: z.string({ required_error: "Please select a monument." }),
    bookingType: z.enum(["hotel", "guide"], {
      required_error: "Please select a booking type.",
    }),
    visitDate: z.date({ required_error: "Please select a visit date." }),
    peopleCount: z.coerce.number().min(1, "At least one person is required."),
    userName: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().min(10, "Please enter a valid phone number."),
    hotelCategory: z.enum(["budget", "standard", "luxury"]).optional(),
    nights: z.coerce.number().min(1).optional(),
    guideLanguage: z.string().min(2).optional(),
    tourDuration: z.enum(["half-day", "full-day"]).optional(),
  })
  .refine((data) => !(data.bookingType === "hotel" && !data.hotelCategory), {
    message: "Hotel category is required.",
    path: ["hotelCategory"],
  })
  .refine((data) => !(data.bookingType === "hotel" && !data.nights), {
    message: "Number of nights is required.",
    path: ["nights"],
  })
  .refine((data) => !(data.bookingType === "guide" && !data.guideLanguage), {
    message: "Language preference is required.",
    path: ["guideLanguage"],
  })
  .refine((data) => !(data.bookingType === "guide" && !data.tourDuration), {
    message: "Tour duration is required.",
    path: ["tourDuration"],
  });

export default function EditBookingModal({ booking, isOpen, onOpenChange }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMonument, setSelectedMonument] = useState(null);

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      ...booking,
      visitDate: new Date(booking.visitDate),
    },
  });

  useEffect(() => {
    if (booking) {
      form.reset({
        ...booking,
        visitDate: new Date(booking.visitDate),
      });
      const monument = architecturalMarvels.find(
        (m) => m.name === booking.monumentName,
      );
      if (monument) setSelectedMonument(monument);
    }
  }, [booking, form]);

  const bookingType = form.watch("bookingType");

  const handleMonumentChange = (monumentName) => {
    const monument = architecturalMarvels.find((m) => m.name === monumentName);
    if (monument) {
      setSelectedMonument(monument);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const bookingData = {
      ...data,
      visitDate: data.visitDate.toISOString(),
      city: selectedMonument?.location.split(",")[0].trim() || "",
      state: selectedMonument?.location.split(",")[1]?.trim() || "",
    };
    try {
      await updateBooking(booking.id, bookingData);
      toast({
        title: "Booking Updated",
        description: "Your booking has been successfully updated.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          "There was a problem updating your booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">
            Edit Your Booking
          </DialogTitle>
          <DialogDescription>
            Modify the details for your visit to{" "}
            <span className="font-semibold text-primary">
              {booking.monumentName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="bg-card p-8 rounded-xl">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monumentName">Select Monument</Label>
                <Controller
                  control={form.control}
                  name="monumentName"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleMonumentChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="monumentName">
                        <SelectValue placeholder="Select a monument" />
                      </SelectTrigger>
                      <SelectContent>
                        {architecturalMarvels.map((marvel) => (
                          <SelectItem key={marvel.name} value={marvel.name}>
                            {marvel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {form.formState.errors.monumentName && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.monumentName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cityState">City / State</Label>
                <Input
                  id="cityState"
                  value={selectedMonument?.location || ""}
                  disabled
                  placeholder="Auto-filled based on monument"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Booking Type</Label>
              <Controller
                control={form.control}
                name="bookingType"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4 pt-2"
                  >
                    <Label className="flex items-center gap-2 font-normal border p-3 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer flex-1 justify-center">
                      <RadioGroupItem value="hotel" id="hotel" /> Hotel
                    </Label>
                    <Label className="flex items-center gap-2 font-normal border p-3 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer flex-1 justify-center">
                      <RadioGroupItem value="guide" id="guide" /> Tour Guide
                    </Label>
                  </RadioGroup>
                )}
              />

              {form.formState.errors.bookingType && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.bookingType.message}
                </p>
              )}
            </div>

            {bookingType === "hotel" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-background">
                <div className="space-y-2">
                  <Label>Hotel Category</Label>
                  <Controller
                    control={form.control}
                    name="hotelCategory"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {form.formState.errors.hotelCategory && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.hotelCategory.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nights">Number of Nights</Label>
                  <Input
                    id="nights"
                    type="number"
                    min="1"
                    {...form.register("nights")}
                  />
                  {form.formState.errors.nights && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.nights.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {bookingType === "guide" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-background">
                <div className="space-y-2">
                  <Label htmlFor="guideLanguage">Language Preference</Label>
                  <Input
                    id="guideLanguage"
                    placeholder="e.g., English, Hindi"
                    {...form.register("guideLanguage")}
                  />
                  {form.formState.errors.guideLanguage && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.guideLanguage.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tour Duration</Label>
                  <Controller
                    control={form.control}
                    name="tourDuration"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4 pt-2"
                      >
                        <Label className="flex items-center gap-2 font-normal border p-2 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer flex-1 justify-center text-sm">
                          <RadioGroupItem value="half-day" /> Half Day
                        </Label>
                        <Label className="flex items-center gap-2 font-normal border p-2 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer flex-1 justify-center text-sm">
                          <RadioGroupItem value="full-day" /> Full Day
                        </Label>
                      </RadioGroup>
                    )}
                  />

                  {form.formState.errors.tourDuration && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.tourDuration.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Visit Date</Label>
                <Controller
                  control={form.control}
                  name="visitDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />

                {form.formState.errors.visitDate && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.visitDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="peopleCount">Number of People</Label>
                <Input
                  id="peopleCount"
                  type="number"
                  min="1"
                  {...form.register("peopleCount")}
                />
                {form.formState.errors.peopleCount && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.peopleCount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="userName">Full Name</Label>
                <Input
                  id="userName"
                  {...form.register("userName")}
                  placeholder="Your full name"
                />
                {form.formState.errors.userName && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.userName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="your.email@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  placeholder="Your phone number"
                />
                {form.formState.errors.phone && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
