// GET /contribution/:id

import { Request, Response } from "express"

import { Services } from "../types"

export const getContribution =
  ({ prisma }: Services) =>
  async (req: Request, res: Response) => {
    const { id } = req.params

    const contribution = await prisma.contribution.findFirst({
      where: { id: id ? parseInt(id) : null },
      include: { author: true },
    })

    res.json(contribution)
  }
