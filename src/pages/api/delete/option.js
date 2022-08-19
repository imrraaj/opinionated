import { getSession } from "next-auth/react";
import { prisma } from "../../../utils/prisma";
export default async (req, res) => {
  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (session) {
      const { id } = req?.query;
      if (id == undefined) {
        res.end();
      }

      // check if user is the owner
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!user) return res.status(404).send("User Not Found");

      const PollToBeDeleted = await prisma.poll.findUnique({
        where: {
          id,
        },
      });
      if (PollToBeDeleted.userId !== user.id) {
        res.statusCode = 403;
        res.end(`Hold on, you are not authorized to delete`);
        return;
      }

      await prisma.option.deleteMany({
        where: {
          pollId: { equals: req.body.id },
        },
      });

      await prisma.poll.delete({
        where: {
          id: req.body.id,
        },
      });

      res.json({ msg: "success!" });
    } else {
      res.statusCode = 403;
      res.end(`Hold on, you are not allowed in here!`);
    }
  } else {
    res.status(404).send("not found");
  }
};
