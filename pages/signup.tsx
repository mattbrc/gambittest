import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SignInWithGoogle } from "@/components/ui/auth/SignInWithGoogle";

export default function Signup() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const supabase = useSupabaseClient();
  const router = useRouter();

  async function signUpWithEmail() {
    try {
      if (email && password) {
        const res = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (res.error) throw res.error;
        const userId = res.data.user?.id;
        console.log("User created", userId);
        router.push("/");
      }
    } catch {
      console.log("Error signing up with email");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-12">
      <SignInWithGoogle />
      <div className="flex flex-col mt-6 border-opacity-50 w-80">
        <div className="text-xs divider">Or sign up with</div>
      </div>
      <div className="w-full max-w-xs form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="joe@joe.com"
          className="w-full max-w-xs input input-bordered"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full max-w-xs form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full max-w-xs input input-bordered"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="mt-4 btn btn-primary btn-outline"
        onClick={() => signUpWithEmail()}
      >
        Sign up
      </button>
      <Link className="mt-4 text-xs underline" href="/login">
        Already have an account? Sign in
      </Link>
    </div>
  );
}
