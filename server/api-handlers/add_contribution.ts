// POST /contributions

import { RequestHandler } from "express"

import {
  AddContributionRequest,
  AddContributionResponse,
} from "../common/server-api"
import { Services } from "../types"

export const addContribution =
  ({
    prisma,
  }: Services): RequestHandler<
    AddContributionRequest,
    AddContributionResponse
  > =>
  async (req, res) => {
    const { authorId, response, sense, prompt } = req.body

    const data = { authorId, prompt, sense, response }
    const contribution =
      (await prisma.contribution.findFirst({
        where: data,
        include: { author: true },
      })) ??
      (await prisma.contribution.create({ data, include: { author: true } }))

    res.json(contribution)
  }
