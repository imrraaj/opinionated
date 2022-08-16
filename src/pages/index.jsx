import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { addPoll, deletePoll, getPolls, upVote, downVote } from "../utils/ApiConnection"


export default function App() {

    const queryClient = useQueryClient();

    const { data, error, isError, isLoading } = useQuery(['Polls'], getPolls);


    const { control, register, handleSubmit } = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "options",
    });
    const onSubmit = data => {
        console.log(data);
        addMutation.mutate({
            data
        });
    };


    const addMutation = useMutation(addPoll, {
        onSuccess: () => {
            queryClient.invalidateQueries('Polls');
        }
    });
    const deleteMutation = useMutation(deletePoll, {
        onSuccess: () => {
            queryClient.invalidateQueries('Polls');
        }
    });
    const upVoteMutation = useMutation(upVote, {
        onSuccess: () => {
            queryClient.invalidateQueries('Polls');
        }
    });
    const downVoteMutation = useMutation(downVote, {
        onSuccess: () => {
            queryClient.invalidateQueries('Polls');
        }
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     addMutation.mutate({
    //         "question": "Sent from Client App?",
    //         "options": ["Yes", "NO"]
    //     });
    //     // deleteMutation.mutate({
    //     //     "id": "cl6uxl6a30587icb6ar71jvn5"
    //     // })
    // }


    if (isError) {
        console.log(error);
        return <h1>Error... {error.message}</h1>
    }
    if (isLoading) return <h1>Loading...</h1>

    return (
        <main>
            {/* <form onSubmit={handleSubmit((e) => {
                console.log(e)
            })}>
                <input defaultValue="How was your day?" {...register("question")} />
                <input {...register("option1", { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form> */}

            <h1 className="mt-4 text-red-500">Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="question" {...register("question", { required: true })} className="block w-32 bg-red-300" />
                {fields.map((field, index) => (
                    <input
                        key={field.id}
                        {...register(`options.${index}.value`)}
                    />
                ))}
                <button
                    type="button"
                    onClick={() => append({ option_text: "" })}
                    className="bg-teal-200 px-4 py-2 rounded-md mx-4"
                >
                    append
                </button>
                <input type="submit" className="bg-emerald-200 px-4 py-2 rounded-md" />
            </form>
            {data.map(d => <div key={d.id} className={"p-4 w-fit border border-blue-100"}>
                <>
                    <h1>{d.question}</h1>
                    <button className="bg-red-900 px-5 py-2 text-white" onClick={() => {
                        deleteMutation.mutate({ id: d.id })
                    }}>DELETE</button>
                    {
                        d.options?.map(o => <label className="block" key={o.id}>
                            <input type="checkbox" key={o.id} onChange={(e) => {
                                if (e.target.checked) {
                                    upVoteMutation.mutate({ qid: d.id, aid: o.id })
                                } else {
                                    downVoteMutation.mutate({ qid: d.id, aid: o.id })
                                }
                            }} />
                            {o.option_text} with VOTES {o.vote_count}
                        </label>)
                    }
                </>
            </div>
            )}
        </main>
    )
}