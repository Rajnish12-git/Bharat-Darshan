
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { useBookings } from '@/hooks/use-bookings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Users, Ticket, Hotel, User, Languages, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function CulturalPassportPage() {
  const { bookings, isLoading, error } = useBookings();

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">
            My Cultural Passport
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your booking requests for Bharat Darshan.
          </p>
        </div>

        <section>
          <h2 className="text-3xl font-bold font-headline mb-8">Booking History</h2>
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">Loading your bookings...</p>
            </div>
          )}

          {error && (
            <Card className="bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Error Loading Bookings</CardTitle>
                    <CardDescription className="text-destructive/80">
                        There was a problem retrieving your booking history. Please try again later.
                    </CardDescription>
                </CardHeader>
            </Card>
          )}

          {!isLoading && !error && bookings && bookings.length > 0 && (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="shadow-md">
                  <CardHeader className='flex-row items-start justify-between gap-4'>
                    <div>
                        <CardTitle className="text-2xl font-headline">{booking.monumentName}</CardTitle>
                        <CardDescription className="text-md">
                            Booking ID: <span className='font-mono text-xs'>{booking.id}</span>
                        </CardDescription>
                    </div>
                    <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'} className="capitalize">
                      {booking.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(booking.visitDate), 'PPP')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{booking.peopleCount} Person(s)</span>
                    </div>
                     <div className="flex items-center gap-2 text-muted-foreground capitalize">
                        <Ticket className="h-4 w-4" />
                        <span>{booking.bookingType} Booking</span>
                    </div>

                    {booking.bookingType === 'hotel' && (
                        <>
                            <div className="flex items-center gap-2 text-muted-foreground capitalize">
                                <Hotel className="h-4 w-4" />
                                <span>{booking.hotelCategory} Category</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{booking.nights} Night(s)</span>
                            </div>
                        </>
                    )}

                     {booking.bookingType === 'guide' && (
                        <>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Languages className="h-4 w-4" />
                                <span>{booking.guideLanguage}</span>
                            </div>
                             <div className="flex items-center gap-2 text-muted-foreground capitalize">
                                <Clock className="h-4 w-4" />
                                <span>{booking.tourDuration?.replace('-', ' ')}</span>
                            </div>
                        </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && !error && (!bookings || bookings.length === 0) && (
            <Card className="text-center py-16">
                <CardContent>
                    <h3 className="text-xl font-semibold">No Bookings Found</h3>
                    <p className="text-muted-foreground mt-2">You have not made any booking requests yet.</p>
                </CardContent>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
