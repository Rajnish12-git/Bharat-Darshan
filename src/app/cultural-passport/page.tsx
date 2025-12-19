
'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useBookings, deleteBooking } from '@/hooks/use-bookings';
import { useUser, useAuth } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Users, Ticket, Hotel, User, Languages, Clock, LogOut, History, Star, Edit, Trash2 } from 'lucide-react';
import { format, isFuture, isPast } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import type { Booking } from '@/lib/types';
import EditBookingModal from '@/components/edit-booking-modal';
import EditProfileModal from '@/components/edit-profile-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';

function BookingCard({ 
    booking, 
    onEdit,
    onDelete
}: { 
    booking: Booking,
    onEdit: (booking: Booking) => void,
    onDelete: (bookingId: string) => void
}) {
  return (
    <Card className="shadow-md transition-all hover:shadow-lg flex flex-col">
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
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm flex-grow">
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
       <CardFooter className="bg-secondary/30 p-3 mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(booking)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(booking.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function CulturalPassportPage() {
  const { user, isLoading: userLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { bookings, isLoading: bookingsLoading, error } = useBookings();
  const { toast } = useToast();

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
    }
    router.push('/');
  };

  const handleDelete = async () => {
    if (!deletingBookingId) return;

    setIsDeleting(true);
    try {
        await deleteBooking(deletingBookingId);
        toast({
            title: "Booking Deleted",
            description: "Your booking has been successfully deleted.",
        });
    } catch (error) {
         toast({
            variant: "destructive",
            title: "Deletion Failed",
            description: "There was a problem deleting your booking.",
        });
    } finally {
        setIsDeleting(false);
        setDeletingBookingId(null);
    }
  }

  const upcomingBookings = bookings?.filter(b => isFuture(new Date(b.visitDate))) || [];
  const pastBookings = bookings?.filter(b => isPast(new Date(b.visitDate))) || [];

  const isLoading = userLoading || bookingsLoading;

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl py-24 md:py-32">
        <section className="mb-12">
            <Card className="p-4 sm:p-6 border shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                        <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'}/>
                        <AvatarFallback>
                            {user?.displayName ? user.displayName.charAt(0) : <User />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold font-headline">
                            {user?.isAnonymous ? 'Guest User' : (user?.displayName || 'My Cultural Passport')}
                        </h1>
                        <p className="text-muted-foreground">{user?.isAnonymous ? 'Sign up to save your bookings.' : user?.email}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        {!user?.isAnonymous && (
                        <Button variant="outline" size="sm" onClick={() => setEditingProfile(true)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                        )}
                        <Button variant="outline" onClick={handleSignOut} disabled={userLoading} className="w-full sm:w-auto">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
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
                        <Star className="h-6 w-6 sm:h-7 sm:w-7 text-primary"/>
                        <h2 className="text-xl md:text-3xl font-bold font-headline">Upcoming Bookings</h2>
                    </div>
                    {upcomingBookings.length > 0 ? (
                        <div className="space-y-6">
                        {upcomingBookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} onEdit={setEditingBooking} onDelete={setDeletingBookingId} />
                        ))}
                        </div>
                    ) : (
                        <Card className="text-center py-12 sm:py-16 bg-secondary/30 border-dashed">
                            <CardContent>
                                <h3 className="text-lg sm:text-xl font-semibold">No Upcoming Bookings</h3>
                                <p className="text-muted-foreground mt-2 text-sm sm:text-base">You have no future visits planned yet.</p>
                            </CardContent>
                        </Card>
                    )}
                </section>
                
                <Separator />

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <History className="h-6 w-6 sm:h-7 sm:w-7 text-primary"/>
                        <h2 className="text-xl md:text-3xl font-bold font-headline">Booking History</h2>
                    </div>
                     {pastBookings.length > 0 ? (
                        <div className="space-y-6 opacity-70">
                        {pastBookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} onEdit={setEditingBooking} onDelete={setDeletingBookingId} />
                        ))}
                        </div>
                    ) : (
                        <Card className="text-center py-12 sm:py-16 bg-secondary/30 border-dashed">
                            <CardContent>
                                <h3 className="text-lg sm:text-xl font-semibold">No Past Bookings</h3>
                                <p className="text-muted-foreground mt-2 text-sm sm:text-base">Your past booking requests will appear here.</p>
                            </CardContent>
                        </Card>
                    )}
                </section>
            </div>
        )}
      </main>
      <Footer />

      {editingProfile && (
        <EditProfileModal 
            isOpen={editingProfile}
            onOpenChange={setEditingProfile}
        />
      )}

      {editingBooking && (
        <EditBookingModal 
            booking={editingBooking}
            isOpen={!!editingBooking}
            onOpenChange={(open) => {
                if(!open) {
                    setEditingBooking(null)
                }
            }}
        />
      )}
      <AlertDialog open={!!deletingBookingId} onOpenChange={(open) => !open && setDeletingBookingId(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your booking
                and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
