
'use client';

import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCostEstimate } from '@/app/actions';
import type { CostEstimatorOutput } from '@/ai/flows/cost-estimator-flow';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2, Hotel, Utensils, Train, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Separator } from './ui/separator';

const formSchema = z.object({
  origin: z.string().min(2, { message: 'Please enter a valid city name.' }),
});

type FormValues = z.infer<typeof formSchema>;

interface CostEstimatorModalProps {
  children: ReactNode;
  destination: string;
}

const CostCard = ({ icon, title, amount, description }: { icon: ReactNode, title: string, amount: number, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-2 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="font-semibold">{title}</p>
            <p className="text-xl font-bold flex items-center"><IndianRupee className="h-5 w-5" />{amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
    </div>
)

export default function CostEstimatorModal({ children, destination }: CostEstimatorModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [results, setResults] = useState<CostEstimatorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { origin: '' },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state when closing the modal
      form.reset();
      setResults(null);
      setError(null);
      setIsPending(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsPending(true);
    setError(null);
    setResults(null);
    try {
      const response = await getCostEstimate({ ...data, destination });
      setResults(response);
    } catch (e) {
      console.error(e);
      setError('Sorry, I couldn\'t estimate the cost right now. Please try again later.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">Trip Cost Estimator</DialogTitle>
          <DialogDescription>
            Get an AI-powered cost estimate for your trip to <span className="font-semibold text-primary">{destination}</span>.
          </DialogDescription>
        </DialogHeader>

        {!results && (
             <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="origin">Where are you traveling from?</Label>
                    <Input 
                        id="origin" 
                        placeholder="e.g., Mumbai" 
                        {...form.register('origin')}
                    />
                    {form.formState.errors.origin && <p className="text-xs text-destructive">{form.formState.errors.origin.message}</p>}
                </div>
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? 'Estimating...' : 'Estimate Cost'}
                </Button>
            </form>
        )}

        {isPending && !results && (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Calculating your trip expenses...</p>
                <p className="text-xs text-muted-foreground/80 text-center">This may take a moment. The AI is planning the best budget for you.</p>
            </div>
        )}
        
        {error && (
             <Card className="bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Estimation Failed</CardTitle>
                    <CardDescription className="text-destructive/80">{error}</CardDescription>
                </CardHeader>
            </Card>
        )}

        {results && (
          <div className="space-y-6 pt-4">
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center font-bold">
                        <IndianRupee className="h-6 w-6 mr-1" />{results.total.toLocaleString()}
                    </CardTitle>
                    <CardDescription>Total Estimated Cost for a 2-day solo trip</CardDescription>
                </CardHeader>
            </Card>
            
            <div className="space-y-6">
                <CostCard 
                    icon={<Train className="h-5 w-5"/>}
                    title="Travel"
                    amount={results.travel}
                    description="Round trip travel from your location"
                />
                <Separator />
                 <CostCard 
                    icon={<Hotel className="h-5 w-5"/>}
                    title="Lodging"
                    amount={results.lodging}
                    description="Per night stay in a budget-friendly hotel"
                />
                <Separator />
                <CostCard 
                    icon={<Utensils className="h-5 w-5"/>}
                    title="Food"
                    amount={results.food}
                    description="Estimated daily expenses for meals"
                />
            </div>
             <p className="text-xs text-muted-foreground text-center pt-4">
                * All costs are estimates generated by AI and may vary. These are for a solo traveler on a budget-friendly trip.
            </p>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
