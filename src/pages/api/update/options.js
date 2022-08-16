import { prisma } from "../../../utils/prisma";
export default async (req, res) => {
  if (req.method === "PATCH") {
    const { options } = req.body;

    for (let i of options) {
      UpdateOption(i.id,i.option_text);
    }

    async function UpdateOption(id, option_text) {
      await prisma.option.update({
        data: {
          option_text,
        },
        where: {
          id,
        },
      });
    }
    res.json("pollQuestion");
  } else {
    res.status(404).send("not found");
  }
};
