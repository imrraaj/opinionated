import { getSession } from "next-auth/react";
import { prisma } from "../../../utils/prisma";
export default async (req, res) => {
  if (req.method == "GET") {
    const session = await getSession({ req });
    if (session) {
      const { id } = req?.query;
      if (id == undefined) {
        res.end();
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!user) return res.status(404).send("User Not Found");

      const aldyVoted = await prisma.vote.findMany({
        where: {
          AND: [{ pollId: id }, { userId: user.id }],
        },
      });

      if (aldyVoted.length !== 0) {
        let pollQuestions = await prisma.poll.findFirst({
          select: {
            question: true,
            id: true,
          },
          where: {
            id,
          },
        });
        res.json(pollQuestions);
      } else {
        let pollQuestions = await prisma.poll.findFirst({
          select: {
            question: true,
            id: true,
            options: {
              select: {
                id: true,
                option_text: true,
              },
            },
          },
          where: {
            id,
          },
        });
        res.json(pollQuestions);
      }
    } else {
      res.statusCode = 403;
      res.end(`Hold on, you are not allowed in here!`);
    }
  } else {
    res.status(404).send("not found");
  }
};
