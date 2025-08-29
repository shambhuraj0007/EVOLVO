"use client";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typewriter } from "react-simple-typewriter";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

const onSubmit = async (data: z.infer<typeof formSchema>) => {
  try {
    if (type === "sign-up") {
      const { name, email, password } = data;

      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save to Firestore via server action
      const result = await signUp({
        uid: userCredential.user.uid,
        name: name!,
        email,
        password,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Account created successfully. Please sign in.");
      router.push("/sign-in");
    } else {
      const { email, password } = data;

      // Sign in Firebase Auth user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();
      if (!idToken) {
        toast.error("Sign in failed. Please try again.");
        return;
      }

      const result = await signIn({
        email,
        idToken,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Signed in successfully.");
      router.push("/");
      router.refresh(); // ensures the session cookie is picked up
    }
  } catch (error: any) {
    // 👇 Handle Firebase Auth errors gracefully
    switch (error.code) {
      // Sign-up errors
      case "auth/email-already-in-use":
        toast.error("This email is already in use. Please try signing in.");
        break;
      case "auth/invalid-email":
        toast.error("Invalid email format.");
        break;
      case "auth/weak-password":
        toast.error("Password is too weak. Use at least 6 characters.");
        break;

      // Sign-in errors
      case "auth/invalid-credential":
        toast.error("Invalid email or password.");
        break;
      case "auth/user-not-found":
        toast.error("No account found with this email.");
        break;
      case "auth/wrong-password":
        toast.error("Incorrect password. Try again.");
        break;

      default:
        toast.error("Something went wrong. Please try again.");
    }
  }
};


  const isSignIn = type === "sign-in";

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side brand / hero panel */}
      <div className="hidden lg:flex w-1/2 xl:w-2/3 flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white px-12">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" height={70} width={70} />
          <h1 className="text-4xl font-extrabold">EVOLVO</h1>
        </div>

        <div className="mt-10 text-center space-y-6 max-w-2xl">
          <p className="text-xl font-medium leading-relaxed">
            <Typewriter
              words={[
                "Ace your next interview with EVOLVO 🎯",
                "Get instant feedback and improve faster 🚀",
                "Your personal AI interview coach 🤖",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </p>

          <Image
            src="/robot.png"
            alt="robo-dude"
            width={500}
            height={500}
            className="mx-auto"
          />

          <p className="text-lg leading-relaxed">
            <Typewriter
              words={[
                "Practice coding, system design & more 🧑‍💻",
                "Build confidence and land your dream job 💼",
                "Join us today! 🎉",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="hidden lg:flex w-1/2 xl:w-1/3 flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-lg p-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {isSignIn ? "Welcome back 👋" : "Create your account 🚀"}
          </h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
            {isSignIn
              ? "Enter your details to access your dashboard"
              : "Sign up to start preparing smarter"}
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="Jane Doe"
                  type="text"
                />
              )}

              <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="you@example.com"
                type="email"
              />

              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="••••••••"
                type="password"
              />

              <Button
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white font-semibold 
                          shadow-md hover:opacity-90 transition active:scale-95"
                type="submit"
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>

          <p className="mt-8 text-center text-base text-gray-600 dark:text-gray-400">
            {isSignIn ? "No account yet?" : "Already have an account?"}{" "}
            <Link
              href={!isSignIn ? "/sign-in" : "/sign-up"}
              className="font-semibold text-indigo-600 hover:underline"
            >
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;