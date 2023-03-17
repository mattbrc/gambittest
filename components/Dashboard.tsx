import React, { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

interface DashProps {}

type Profile = {
  username: string;
  name: string;
};

export const Dashboard: React.FC<DashProps> = ({}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      console.log("user", user);
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      if (data) {
        setProfile({
          username: data.username,
          name: data.full_name,
        });
        console.log("data", data);
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    <div className="container max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="mt-5 text-xl font-bold">Home</h1>
      </div>
      {/* profile card */}
      <div className="flex flex-col items-center mt-4">
        <div className="mt-6 card w-96 bg-neutral">
          <div className="card-body">
            <h1>{profile?.name}</h1>
            <p>@{profile?.username}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg font-bold">Training</p>
      </div>
    </div>
  );
};
