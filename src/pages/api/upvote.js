import { prisma } from "../../utils/prisma";
export default async (req, res) => {
  if (req.method == "POST") {
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
              vote_count: { increment: 1 },
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
