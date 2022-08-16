import { prisma } from "../../utils/prisma";
export default async (req, res) => {
  if (req.method === "POST") {
    const { question, options } = req.body.data;
    const d = options.map((opt) => {
      return { option_text: opt.value };
    });

    const pollQuestion = await prisma.poll.create({
      data: {
        question,
        options: {
          createMany: {
            data: d,
          },
        },
      },
    });
    res.json(pollQuestion);
  } else {
    res.status(404).send("not found");
  }
};
