import axios from "axios";

const api = axios.create({
  baseURL: "https://opinionated-poll.vercel.app/api",
});

export const getPolls = async () => {
  const response = await api.get("/get/allPolls");
  return response.data;
};
export const addPoll = async (data) => {
  return await api.post("/addPoll", data);
};
export const deletePoll = async (data) => {
  return await api.delete(`/delete/${data.id}`);
};

export const upVote = async (data) => {
  return await api.post("/upvote", data);
};

export const downVote = async (data) => {
  return await api.post("/downvote", data);
};

export const singlePoll = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const response = await api.get(`/get/${id}`);
  return response.data;
};
