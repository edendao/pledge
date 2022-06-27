// GET /users/:id

import { RequestHandler } from "express"

import { Services } from "../types"

export function getAuthor({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    const author = await prisma.author.findFirst({
      where: { id: req.params.id },
    })

    res.json(author)
  }
}
