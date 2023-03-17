import React from "react";
import Image from "next/image";
import google from "../../../public/google.png";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface FacebookProps {}

export const SignInWithFacebook: React.FC<FacebookProps> = ({}) => {
  const supabase = useSupabaseClient();

  async function login() {
    try {
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      console.log(data);
    } catch (error) {
      console.log(error, "Error signing up with email");
    }
  }

  return (
    <div>
      <button onClick={login} className="mt-2 btn btn-outline btn-primary">
        {/* <Image src={google} width={25} height={25} alt="google icon" /> */}
        Sign In With Facebook
      </button>
    </div>
  );
};
