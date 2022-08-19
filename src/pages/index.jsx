import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Navbar from "../components/Navbar";
import {
  addPoll,
  getPolls,
  upVote,
  downVote,
} from "../utils/ApiConnection";

function App() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery(["Polls"], getPolls);

  const { control, register, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const onSubmit = (data) => {
    addMutation.mutate({
      data,
    });
  };

  const addMutation = useMutation(addPoll, {
    onSuccess: () => {
      queryClient.invalidateQueries("Polls");
    },
  });

  const upVoteMutation = useMutation(upVote, {
    onSuccess: () => {
      queryClient.invalidateQueries("Polls");
    },
  });
  const downVoteMutation = useMutation(downVote, {
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

      <div className="mx-auto grid w-3/4  py-4">
        <h1 className="text-3xl font-bold">Create Your Poll</h1>
        <div className="my-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <label htmlFor="question" className="my-2 block">
                Question:{" "}
              </label>
              <input
                type="text"
                name="question"
                id="question"
                {...register("question", { required: true })}
                className="block w-3/4 bg-slate-600"
              />
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="my-2">
                <label
                  htmlFor={`options.${index}.value`}
                  className="block pr-4"
                >
                  Option {index + 1}:
                </label>
                <input
                  type="text"
                  name={`options.${index}.value`}
                  id={`options.${index}.value`}
                  className="w-3/6 bg-slate-600"
                  {...register(`options.${index}.value`)}
                />

                <button
                  onClick={() => remove(index)}
                  className="mx-4 rounded-md bg-rose-500 py-1 px-4 font-bold text-slate-800"
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="my-8">
              <button
                type="button"
                onClick={() => append({ option_text: "" })}
                className="mr-4 rounded-md bg-rose-500 py-1 px-4 font-bold text-slate-800"
              >
                Add Option
              </button>
              <button
                type="submit"
                className="mr-4 rounded-md bg-rose-500 py-1 px-4 font-bold text-slate-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

App.auth = true;
export default App;
