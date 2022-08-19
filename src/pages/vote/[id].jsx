import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { singlePoll, upVote, downVote } from "../../utils/ApiConnection";

function VoteOnPoll() {
  const { data: session } = useSession();
  const { query, reload } = useRouter();

  const { data, error, isError, isLoading } = useQuery(
    ["singlePoll", `/${query.id}`],
    singlePoll
  );

  const upVoteMutation = useMutation(upVote);
  const downVoteMutation = useMutation(downVote);

  const [aldyVoted, setaldyVoted] = useState(false);
  const [votedFor, setVotedFor] = useState("");

  if (isError) {
    console.log(error);
    return <h1>Error... {error.message}</h1>;
  }
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Navbar user={session.user} />

      <div className="mx-auto my-8 w-3/4">
        <div key={data.id} className="w-full p-8">
          <>
            <div className="flex items-center justify-between gap-2">
              <span className="text-2xl font-bold underline">
                {data.question}
              </span>
            </div>

            <div className="my-4">
              {!data.options && <div>You've Already voted!</div>}
              {data.options?.map((o) => {
                return (
                  <div
                    className={`my-2 flex min-h-[48px] items-center justify-between border border-rose-300 px-2 transition-colors hover:bg-rose-300 hover:text-slate-900`}
                    key={o.id}
                    onClick={() => {
                      upVoteMutation.mutate({ qid: data.id, aid: o.id });
                      reload();
                    }}
                  >
                    <p className="font-semibold">{o.option_text}</p>
                  </div>
                );
              })}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

VoteOnPoll.auth = true;
export default VoteOnPoll;
