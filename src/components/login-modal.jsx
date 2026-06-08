"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "@/firebase";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const resetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export default function LoginModal({ children }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState("login");

  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
  });

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
  });

  const onLoginSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Successfully signed in!" });
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignUpSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(userCredential.user, { displayName: data.name });

      // Create a user profile document in Firestore
      if (firestore) {
        await setDoc(doc(firestore, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          displayName: data.name,
          email: data.email,
          createdAt: new Date().toISOString(),
        });
      }

      toast({ title: "Account created successfully!" });
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({
        title: "Password Reset Email Sent",
        description:
          "Please check your inbox for instructions to reset your password.",
      });
      setView("login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Reset Failed",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">My Space</DialogTitle>
          <DialogDescription>
            Sign in or create an account to save your bookings and favorites.
          </DialogDescription>
        </DialogHeader>

        {view === "reset" ? (
          <form
            onSubmit={resetForm.handleSubmit(onResetSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                {...resetForm.register("email")}
                placeholder="Enter your email"
              />
              {resetForm.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {resetForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Reset Link
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => setView("login")}
              className="text-muted-foreground"
            >
              Back to Login
            </Button>
          </form>
        ) : (
          <Tabs
            defaultValue={view}
            onValueChange={(v) => setView(v)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={() => setView("reset")}
                      className="h-auto p-0 text-xs"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      {...loginForm.register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form
                onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input id="signup-name" {...signUpForm.register("name")} />
                  {signUpForm.formState.errors.name && (
                    <p className="text-xs text-destructive">
                      {signUpForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    {...signUpForm.register("email")}
                  />
                  {signUpForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {signUpForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      {...signUpForm.register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  {signUpForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {signUpForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
