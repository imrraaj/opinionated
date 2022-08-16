import { useQuery, useQueryClient } from "@tanstack/react-query";
import { singlePoll } from "../utils/ApiConnection"

export default function App() {

    const queryClient = useQueryClient();

    const { data, error, isError, isLoading } = useQuery(['singlePoll', "/cl6v0ajoa1335icb6ffw5r7l7"], singlePoll);






    if (isError) {
        console.log(error);
        return <h1>Error... {error.message}</h1>
    }
    if (isLoading) return <h1>Loading...</h1>

    console.log(data)
    return (
        <main>
                    <h1>{data.question}</h1>
                    <button className="bg-red-900 px-5 py-2 text-white" onClick={() => {
                        deleteMutation.mutate({ id: data.id })
                    }}>DELETE</button>
                    {
                        data.options?.map(o => <label className="block">
                            <input type="checkbox" key={o.id} onChange={(e) => {
                                if (e.target.checked) {
                                    // upVoteMutation.mutate({ qid: data.id, aid: o.id })
                                } else {
                                    // downVoteMutation.mutate({ qid: data.id, aid: o.id })
                                }
                            }} />
                            {o.option_text} with VOTES {o.vote_count}
                        </label>)
                    }
        </main>
    )
}