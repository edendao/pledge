// GET /users

import { RequestHandler } from "express"

import { Author, GetAuthorsRequest, SignatureLimit } from "../common/server-api"
import { Services } from "../types"

export const getAuthors =
  ({ prisma }: Services): RequestHandler<GetAuthorsRequest, Author[]> =>
  async (req, res) => {
    const { offset = "0" } = req.query

    const authors = await prisma.author.findMany({
      orderBy: [{ createdAt: "asc" }],
      take: SignatureLimit,
      skip: parseInt(offset as string),
    })

    res.json(authors)
  }
