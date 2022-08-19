import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Navbar from "../../components/Navbar";
import { getPolls, deletePoll } from "../../utils/ApiConnection";

function MyPolls() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery(["Polls"], getPolls);

  const deleteMutation = useMutation(deletePoll, {
    onSuccess: () => {
      queryClient.invalidateQueries("Polls");
    },
  });

  if (isError) {
    console.log(error);
    return <h1>Error... {error.message}</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <Navbar user={session.user} />
      <div className="mx-auto my-8 w-3/4">
        {data.map((d) => (
          <div key={d.id} className="w-full p-8">
            <>
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl font-bold underline">
                  <Link href={`/vote/${d.id}`}>{d.question}</Link>
                </span>
                <button
                  className="rounded-md bg-rose-500 py-1 px-4 font-bold text-slate-800"
                  onClick={() => {
                    deleteMutation.mutate({ id: d.id });
                  }}
                >
                  Delete
                </button>
              </div>

              <div className="my-4">
                {d.options?.map((o) => (
                  <div
                    className="my-2 flex min-h-[48px] items-center justify-between border border-rose-300 px-2 transition-colors hover:bg-rose-300 hover:text-slate-900"
                    key={o.id}
                  >
                    <p className="font-semibold">{o.option_text}</p>
                    <p>{o.vote_count}</p>
                  </div>
                ))}
              </div>
            </>
          </div>
        ))}
      </div>
    </>
  );
}

MyPolls.auth = true;
export default MyPolls;
