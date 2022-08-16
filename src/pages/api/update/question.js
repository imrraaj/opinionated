import { prisma } from "../../../utils/prisma";
export default async (req, res) => {
  if (req.method === "PATCH") {
    const { question } = req.body;

    const pollQuestion = await prisma.poll.update({
      data: {
        question,
      },
      where: {
        id: req.body.id,
      },
    });
    res.json(pollQuestion);
  } else {
    res.status(404).send("not found");
  }
};
