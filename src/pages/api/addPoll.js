import { getSession } from "next-auth/react";
import { prisma } from "../../utils/prisma";
export default async (req, res) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session) {
      const { question, options } = req.body.data;
      const d = options.map((opt) => {
        return { option_text: opt.value };
      });
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!user) return res.status(404).send("User Not Found");
      const pollQuestion = await prisma.poll.create({
        data: {
          question,
          ownerId: user.id,
          options: {
            createMany: {
              data: d,
            },
          },
        },
      });
      res.json(pollQuestion);
    } else {
      res.statusCode = 403;
      res.end(`Hold on, you are not allowed in here!`);
    }
  } else {
    res.status(404).send("Method Not Found");
  }
};
