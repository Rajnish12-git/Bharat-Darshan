
'use client';

import { useState, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { addBooking } from '@/hooks/use-bookings';

const bookingSchema = z.object({
  userName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  state: z.string().min(2, { message: 'Please enter your state/city.' }),
  visitDate: z.date({ required_error: 'Please select a visit date.' }),
  visitors: z.coerce.number().min(1, { message: 'At least one visitor is required.' }),
  visitType: z.enum(['Self Visit', 'Guided Tour'], { required_error: 'Please select a visit type.' }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  children: ReactNode;
  monumentName: string;
}

export default function BookingModal({ children, monumentName }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const [isWriting, setIsWriting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      userName: '',
      email: '',
      phone: '',
      state: '',
      visitors: 1,
      visitType: 'Self Visit',
      notes: '',
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Authentication Error',
            description: 'You must be signed in to make a booking request.',
        });
        return;
    }
    
    setIsWriting(true);
    try {
        await addBooking({ ...data, monumentName, visitDate: data.visitDate.toISOString() });
        toast({
            title: 'Booking Request Received',
            description: "We've received your request. You will be notified upon confirmation.",
        });
        form.reset();
        setOpen(false);
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request. Please try again.',
        });
    } finally {
        setIsWriting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">Request a Visit</DialogTitle>
          <DialogDescription>
            You are requesting a visit for: <span className="font-semibold text-primary">{monumentName}</span>.
            <br />
            This is a booking request, not a confirmed ticket.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="userName">Full Name</Label>
              <Input id="userName" {...form.register('userName')} />
              {form.formState.errors.userName && <p className="text-xs text-destructive">{form.formState.errors.userName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register('email')} />
               {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...form.register('phone')} />
              {form.formState.errors.phone && <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State / City</Label>
              <Input id="state" {...form.register('state')} />
              {form.formState.errors.state && <p className="text-xs text-destructive">{form.formState.errors.state.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="visitDate">Visit Date</Label>
              <Controller
                control={form.control}
                name="visitDate"
                render={({ field }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                            )}
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
             <div className="grid gap-2">
                <Label htmlFor="visitors">Number of Visitors</Label>
                <Input id="visitors" type="number" min="1" {...form.register('visitors')} />
                 {form.formState.errors.visitors && <p className="text-xs text-destructive">{form.formState.errors.visitors.message}</p>}
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Visit Type</Label>
            <Controller
                control={form.control}
                name="visitType"
                render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                        <Label className="flex items-center gap-2 font-normal border p-3 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer">
                            <RadioGroupItem value="Self Visit" id="self" /> Self Visit
                        </Label>
                        <Label className="flex items-center gap-2 font-normal border p-3 rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors cursor-pointer">
                            <RadioGroupItem value="Guided Tour" id="guided" /> Guided Tour
                        </Label>
                    </RadioGroup>
                )}
            />
             {form.formState.errors.visitType && <p className="text-xs text-destructive">{form.formState.errors.visitType.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Optional Notes</Label>
            <Textarea id="notes" placeholder="Any special requests or information..." {...form.register('notes')} />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto" disabled={isWriting}>
                {isWriting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
