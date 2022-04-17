// POST /contributions

import { Prisma } from "@prisma/client"
import { RequestHandler } from "express"

import {
  AddContributionRequest,
  AddContributionResponse,
  Pattern,
  PatternToDisplay,
  Prompt,
} from "../common/server-api"
import { Services } from "../types"

const isValidFreeFormResponse = (response: string, pattern: string) =>
  response
    .toLocaleLowerCase()
    .includes(PatternToDisplay[pattern].toLocaleLowerCase())

export function addContribution({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    const { walletId, response, prompt, pattern } =
      req.body as AddContributionRequest

    try {
      if (
        prompt === Prompt.FreeForm &&
        !isValidFreeFormResponse(response, pattern)
      ) {
        throw new Error("Free form contribution submitted without pattern.")
      }

      const existingUser = await prisma.user.findFirst({
        where: { id: walletId },
      })
      if (!existingUser) {
        throw new Error("Please sign the document to add a contribution.")
      }

      const existingContribution = await prisma.contribution.findFirst({
        where: { response, prompt, pattern },
      })
      if (existingContribution) {
        throw new Error(
          "This contribution already exists. Please make a new one.",
        )
      }

      const result = await prisma.contribution.create({
        data: {
          country: req.get("x-vercel-ip-country-region") ?? "",
          authorWalletId: walletId,
          response,
          prompt,
          pattern: pattern as Pattern,
        },
      })

      res.json(result.id as AddContributionResponse)
    } catch (error) {
      console.error(error)

      const message =
        error instanceof Prisma.PrismaClientValidationError
          ? `Received invalid data: ${error.message}`
          : error.message

      res.status(400).json({ error: message })
    }
  }
}
