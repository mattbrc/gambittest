import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface NavProps {}

export const Navbar: React.FC<NavProps> = ({}) => {
  // const supabase = useSupabaseClient();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="text-xl normal-case btn btn-ghost">Gambit</a>
      </div>
    </div>
  );
};
