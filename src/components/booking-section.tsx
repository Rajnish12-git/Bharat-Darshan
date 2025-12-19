
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { addBooking } from '@/hooks/use-bookings';
import architecturalMarvels from '@/lib/architectural-marvels.json';
import LoginModal from './login-modal';

const bookingSchema = z.object({
  monumentName: z.string({ required_error: 'Please select a monument.' }),
  bookingType: z.enum(['hotel', 'guide'], { required_error: 'Please select a booking type.' }),
  visitDate: z.date({ required_error: 'Please select a visit date.' }),
  peopleCount: z.coerce.number().min(1, 'At least one person is required.'),
  userName: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  hotelCategory: z.enum(['budget', 'standard', 'luxury']).optional(),
  nights: z.coerce.number().min(1).optional(),
  guideLanguage: z.string().min(2).optional(),
  tourDuration: z.enum(['half-day', 'full-day']).optional(),
}).refine(data => !(data.bookingType === 'hotel' && !data.hotelCategory), {
  message: "Hotel category is required.",
  path: ["hotelCategory"],
}).refine(data => !(data.bookingType === 'hotel' && !data.nights), {
  message: "Number of nights is required.",
  path: ["nights"],
}).refine(data => !(data.bookingType === 'guide' && !data.guideLanguage), {
  message: "Language preference is required.",
  path: ["guideLanguage"],
}).refine(data => !(data.bookingType === 'guide' && !data.tourDuration), {
  message: "Tour duration is required.",
  path: ["tourDuration"],
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingSection() {
  const { toast } = useToast();
  const { user, isLoading: userLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMonument, setSelectedMonument] = useState<{name: string, location: string} | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      peopleCount: 1,
    },
  });
  
  const isUserLoggedIn = user && !user.isAnonymous;

  const bookingType = form.watch('bookingType');

  const handleMonumentChange = (monumentName: string) => {
    const monument = architecturalMarvels.find(m => m.name === monumentName);
    if (monument) {
        setSelectedMonument(monument);
    }
  }

  const onSubmit = async (data: BookingFormValues) => {
    if (!isUserLoggedIn) {
        toast({
            variant: "destructive",
            title: "Please Log In",
            description: "You need to be logged in to make a booking request."
        })
        return;
    }

    setIsSubmitting(true);
    const bookingData = {
      ...data,
      userId: user.uid,
      visitDate: data.visitDate.toISOString(),
      city: selectedMonument?.location.split(',')[0].trim() || '',
      state: selectedMonument?.location.split(',')[1]?.trim() || '',
    };
    
    try {
      await addBooking(bookingData);
      toast({
        title: 'Booking Request Submitted',
        description: 'Your booking request has been submitted. Our team will contact you shortly.',
      });
      form.reset();
      setSelectedMonument(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was a problem submitting your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="plan-visit" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Plan Your Visit</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Book hotels and tour guides for monuments across India.
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-xl shadow-lg border">
          {!isUserLoggedIn && !userLoading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-xl">
                <p className="text-lg font-semibold text-center mb-4">Please sign in to plan your visit.</p>
                <LoginModal>
                    <Button>Login / Sign Up</Button>
                </LoginModal>
            </div>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn(!isUserLoggedIn && "blur-sm pointer-events-none")}>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="monumentName">Select Monument</Label>
                    <Controller
                        control={form.control}
                        name="monumentName"
                        render={({ field }) => (
                            <Select onValueChange={(value) => {
                                field.onChange(value);
                                handleMonumentChange(value);
                            }} defaultValue={field.value}>
                                <SelectTrigger id="monumentName">
                                    <SelectValue placeholder="Select a monument" />
                                </SelectTrigger>
                                <SelectContent>
                                    {architecturalMarvels.map(marvel => (
                                        <SelectItem key={marvel.name} value={marvel.name}>{marvel.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {form.formState.errors.monumentName && <p className="text-xs text-destructive">{form.formState.errors.monumentName.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cityState">City / State</Label>
                    <Input id="cityState" value={selectedMonument?.location || ''} disabled placeholder="Auto-filled based on monument"/>
                </div>
                </div>

                <div className="space-y-2">
                <Label>Booking Type</Label>
                <Controller
                        control={form.control}
                        name="bookingType"
                        render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                                <Label className="flex items-center gap-2 font-normal border p-3 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer flex-1 justify-center">
                                    <RadioGroupItem value="hotel" id="hotel" /> Hotel
                                </Label>
                                <Label className="flex items-center gap-2 font-normal border p-3 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer flex-1 justify-center">
                                    <RadioGroupItem value="guide" id="guide" /> Tour Guide
                                </Label>
                            </RadioGroup>
                        )}
                    />
                {form.formState.errors.bookingType && <p className="text-xs text-destructive">{form.formState.errors.bookingType.message}</p>}
                </div>

                {bookingType === 'hotel' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-background">
                    <div className="space-y-2">
                        <Label>Hotel Category</Label>
                        <Controller
                            control={form.control}
                            name="hotelCategory"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        {form.formState.errors.hotelCategory && <p className="text-xs text-destructive">{form.formState.errors.hotelCategory.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nights">Number of Nights</Label>
                        <Input id="nights" type="number" min="1" {...form.register('nights')} />
                        {form.formState.errors.nights && <p className="text-xs text-destructive">{form.formState.errors.nights.message}</p>}
                    </div>
                </div>
                )}
                
                {bookingType === 'guide' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-background">
                    <div className="space-y-2">
                        <Label htmlFor="guideLanguage">Language Preference</Label>
                        <Input id="guideLanguage" placeholder="e.g., English, Hindi" {...form.register('guideLanguage')} />
                        {form.formState.errors.guideLanguage && <p className="text-xs text-destructive">{form.formState.errors.guideLanguage.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Tour Duration</Label>
                        <Controller
                            control={form.control}
                            name="tourDuration"
                            render={({ field }) => (
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                                    <Label className="flex items-center gap-2 font-normal border p-2 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer flex-1 justify-center text-sm">
                                        <RadioGroupItem value="half-day" /> Half Day
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal border p-2 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer flex-1 justify-center text-sm">
                                        <RadioGroupItem value="full-day" /> Full Day
                                    </Label>
                                </RadioGroup>
                            )}
                        />
                        {form.formState.errors.tourDuration && <p className="text-xs text-destructive">{form.formState.errors.tourDuration.message}</p>}
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
                                            variant={'outline'}
                                            className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
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
                        {form.formState.errors.visitDate && <p className="text-xs text-destructive">{form.formState.errors.visitDate.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="peopleCount">Number of People</Label>
                        <Input id="peopleCount" type="number" min="1" {...form.register('peopleCount')} />
                        {form.formState.errors.peopleCount && <p className="text-xs text-destructive">{form.formState.errors.peopleCount.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input id="userName" {...form.register('userName')} placeholder="Your full name" />
                    {form.formState.errors.userName && <p className="text-xs text-destructive">{form.formState.errors.userName.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...form.register('email')} placeholder="your.email@example.com" />
                    {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" {...form.register('phone')} placeholder="Your phone number" />
                    {form.formState.errors.phone && <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>}
                </div>
                </div>

                <div className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground mb-4">This is a booking request, not a confirmed ticket. Our team will contact you for confirmation.</p>
                    <Button type="submit" size="lg" className="w-full md:w-1/2" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Request Booking
                    </Button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
