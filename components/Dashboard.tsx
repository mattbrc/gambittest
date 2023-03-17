import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface DashProps {}

export const Dashboard: React.FC<DashProps> = ({}) => {
  // const supabase = useSupabaseClient();

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold">Home</h1>
      {/* profile card */}
      <div className="flex flex-col items-center mt-4">
        <div className="mt-6 card w-96 bg-neutral">
          <div className="card-body">
            <h1>AG</h1>
            <p>@acidgambit</p>
          </div>
        </div>
      </div>
    </div>
  );
};
