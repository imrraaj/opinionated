import { prisma } from "../../../utils/prisma";
export default async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req?.query;
    if (id == undefined) {
      res.end();
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
    res.status(404).send("not found");
  }
};
