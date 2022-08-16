import { prisma } from "../../../utils/prisma";
export default async (req, res) => {
  if (req.method == "GET") {
    const { id } = req?.query;
    if (id == undefined) {
      res.end();
    }
    const pollQuestions = await prisma.poll.findFirst({
      select: {
        _count: true,
        question: true,
        id: true,
        options: true,
      },
      where: {
        id,
      },
    });
    res.json(pollQuestions);
  } else {
    res.status(404).send("not found");
  }
};
