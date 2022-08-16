import { prisma } from "../../utils/prisma";
export default async (req, res) => {
  if (req.method == "POST") {
    // First check if user has upvoted or not
    const pollQuestions = await prisma.poll.update({
      where: {
        id: req.body.qid,
      },
      data: {
        options: {
          update: {
            where: {
              id: req.body.aid,
            },
            data: {
              vote_count: { decrement: 1 },
            },
          },
        },
      },
    });
    res.json(pollQuestions);
  } else {
    res.status(404).send("not found");
  }
};
