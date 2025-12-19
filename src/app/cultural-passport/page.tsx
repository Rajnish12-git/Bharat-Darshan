
'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useBookings } from '@/hooks/use-bookings';
import { useUser, useAuth } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Users, Ticket, Hotel, User, Languages, Clock, LogOut, History, Star } from 'lucide-react';
import { format, isFuture, isPast } from 'date-fns';
import { Separator } from '@/components/ui/separator';

function BookingCard({ booking }: { booking: any }) {
  return (
    <Card className="shadow-md transition-all hover:shadow-lg">
      <CardHeader className='flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4'>
        <div>
          <CardTitle className="text-2xl font-headline">{booking.monumentName}</CardTitle>
          <CardDescription className="text-md">
            Booking ID: <span className='font-mono text-xs'>{booking.id}</span>
          </CardDescription>
        </div>
        <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'} className="capitalize self-start">
          {booking.status}
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
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
  );
}

export default function CulturalPassportPage() {
  const { user, isLoading: userLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { bookings, isLoading: bookingsLoading, error } = useBookings();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
    }
    router.push('/');
  };

  const upcomingBookings = bookings?.filter(b => isFuture(new Date(b.visitDate))) || [];
  const pastBookings = bookings?.filter(b => isPast(new Date(b.visitDate))) || [];

  const isLoading = userLoading || bookingsLoading;

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl py-24 md:py-32">
        <section className="mb-12">
            <Card className="p-6 border shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'}/>
                        <AvatarFallback>
                            {user?.displayName ? user.displayName.charAt(0) : <User />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-3xl font-bold font-headline">
                            {user?.isAnonymous ? 'Guest User' : (user?.displayName || 'My Cultural Passport')}
                        </h1>
                        <p className="text-muted-foreground">{user?.isAnonymous ? 'Sign up to save your bookings.' : user?.email}</p>
                    </div>
                     <Button variant="outline" onClick={handleSignOut} disabled={userLoading} className="w-full sm:w-auto">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </Card>
        </section>

        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Loading your passport...</p>
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

        {!isLoading && !error && (
            <div className="space-y-12">
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <Star className="h-7 w-7 text-primary"/>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline">Upcoming Bookings</h2>
                    </div>
                    {upcomingBookings.length > 0 ? (
                        <div className="space-y-6">
                        {upcomingBookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                        </div>
                    ) : (
                        <Card className="text-center py-16 bg-secondary/30 border-dashed">
                            <CardContent>
                                <h3 className="text-xl font-semibold">No Upcoming Bookings</h3>
                                <p className="text-muted-foreground mt-2">You have no future visits planned yet.</p>
                            </CardContent>
                        </Card>
                    )}
                </section>
                
                <Separator />

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <History className="h-7 w-7 text-primary"/>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline">Booking History</h2>
                    </div>
                     {pastBookings.length > 0 ? (
                        <div className="space-y-6 opacity-70">
                        {pastBookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                        </div>
                    ) : (
                        <Card className="text-center py-16 bg-secondary/30 border-dashed">
                            <CardContent>
                                <h3 className="text-xl font-semibold">No Past Bookings</h3>
                                <p className="text-muted-foreground mt-2">Your past booking requests will appear here.</p>
                            </CardContent>
                        </Card>
                    )}
                </section>
            </div>
        )}
      </main>
      <Footer />
    </>
  );
}
