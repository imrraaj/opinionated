import { getSession } from "next-auth/react";
import { prisma } from "../../../utils/prisma";
export default async (req, res) => {
  if (req.method == "GET") {
    const session = await getSession({ req });
    if (session) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!user) return res.status(404).send("User Not Found");

      const pollQuestions = await prisma.poll.findMany({
        where: {
          ownerId: user.id,
        },
        select: {
          question: true,
          id: true,
          options: true,
        },
      });
      res.json(pollQuestions);
    } else {
      res.statusCode = 403;
      res.end(`Hold on, you are not allowed in here!`);
    }
  } else {
    res.status(404).send("not found");
  }
};
