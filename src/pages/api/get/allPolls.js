import { prisma } from "../../../utils/prisma";
export default async (req, res) => {
  if (req.method == "GET") {
    const pollQuestions = await prisma.poll.findMany({
      select: {
        _count: true,
        question: true,
        id: true,
        options: true,
      },
    });
    res.json(pollQuestions);
  } else {
    res.status(404).send("not found");
  }
};
