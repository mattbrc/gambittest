import { useRouter } from "next/router";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SignInWithGoogle } from "../components/ui/auth/SignInWithGoogle";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";

// TODO: change login flow so only OAUTH is permitted
// google, discord, facebook, (apple, but i have to pay ): )
export default function Signup() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const router = useRouter();
  const supabase = useSupabaseClient();

  async function signInWithEmail() {
    try {
      if (email && password) {
        const res = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (res.error) throw res.error;
        const userId = res.data.user?.id;
        console.log("User ID authenticated:", userId);
        router.push("/");
      }
    } catch {
      console.log("Error signing up with email");
    }
  }

  return (
    <div className="mt-12">
      {/* <div className="flex flex-col items-center justify-center mt-12">
        <div className="flex flex-col mt-6 border-opacity-50 w-80">
          <p className="text-sm">Sign in with</p>
        </div>
      </div> */}
      <div className="flex flex-col items-center justify-center">
        <SignInWithGoogle />
        <div className="flex flex-col mt-6 border-opacity-50 w-80">
          <div className="text-sm divider">Or continue with</div>
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
          onClick={() => signInWithEmail()}
        >
          Sign in
        </button>
        <Link className="mt-4 text-xs underline" href="">
          Forgot your password?
        </Link>
        <Link className="mt-2 text-xs underline" href="/signup">
          New to Gambit? Sign up for free.
        </Link>
      </div>
    </div>
  );
}
