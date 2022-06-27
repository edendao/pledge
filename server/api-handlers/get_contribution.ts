// GET /contribution/:id

import { RequestHandler } from "express"

import { Services } from "../types"

export const getContribution =
  ({ prisma }: Services): RequestHandler =>
  async (req, res) => {
    const { id } = req.params

    const contribution = await prisma.contribution.findFirst({
      where: { id: id ? parseInt(id) : null },
      include: { author: true },
    })

    res.json(contribution)
  }
