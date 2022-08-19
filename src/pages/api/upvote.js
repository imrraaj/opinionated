import { prisma } from "../../utils/prisma";
import { getSession } from "next-auth/react";
export default async (req, res) => {
  if (req.method == "POST") {
    const session = await getSession({ req });
    if (session) {
      const pollid = req.body?.qid;
      const optid = req.body?.aid;
      if (!pollid || !optid) {
        res.status(404).send("Data not found");
      }
    
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!user) return res.status(404).send("User Not Found");
      const vote = await prisma.vote.create({
        data: {
          userId: user.id,
          pollId: pollid,
          VotedFor: optid,
        },
      });

       await prisma.poll.update({
        where: {
          id: pollid,
        },
        data: {
          options: {
            update: {
              where: {
                id: optid,
              },
              data: {
                vote_count: { increment: 1 },
              },
            },
          },
        },
      });
      res.json(vote);
    } else {
      res.statusCode = 403;
      res.end(`Hold on, you are not allowed in here!`);
    }
  } else {
    res.status(404).send("not found");
  }
};
