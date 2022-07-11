import { Request, Response } from "express"

import { Services } from "../types"

export const getGreenlistStatus =
  ({ prisma }: Services) =>
  async (req: Request, res: Response) => {
    const contribution = await prisma.contribution.findFirst({
      where: { authorId: req.params.address },
      select: { authorId: true, signature: true },
    })

    res.status(200).json({ greenlisted: Boolean(contribution?.signature) })
  }
