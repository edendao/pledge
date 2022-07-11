// GET /users/:id

import { Request, Response } from "express"

import { Services } from "../types"

export const getAuthor =
  ({ prisma }: Services) =>
  async (req: Request, res: Response) => {
    const author = await prisma.author.findFirst({
      where: { id: req.params.id },
    })

    res.json(author)
  }
