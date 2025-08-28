"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typewriter } from "react-simple-typewriter";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

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
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="flex min-h-screen">
      {/* Left side brand / hero panel */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white p-10">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" height={60} width={60} />
          <h1 className="text-3xl font-extrabold tracking-wide">EVOLVO</h1>
        </div>

        <p className="mt-6 text-lg leading-relaxed text-center">
          <Typewriter
            words={[
              "Master your interviews with AI-powered preparation ⚡",
              "Get instant feedback and improve faster 🚀",
            "Ace your next interview with personalized coaching 🎯",
              
            ]}
            loop={0} 
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </p>
         <p className="mt-6 text-lg leading-relaxed text-center">
          <Typewriter
            words={[
             "Practice coding, system design & HR questions 🧑‍💻",
              "Build confidence and land your dream job 💼",
                "Join thousands of successful candidates today! 🎉",
              
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

      {/* Right side form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isSignIn ? "Welcome back 👋" : "Create your account 🚀"}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-2 text-white font-semibold 
                          shadow-lg hover:opacity-90 transition active:scale-95"
                type="submit"
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
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
