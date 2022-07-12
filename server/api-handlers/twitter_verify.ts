import { Request, Response } from "express"
import { TwitterApi } from "twitter-api-v2"

import { Services } from "../types"

export const twitterVerify =
  ({ prisma }: Services) =>
  async (req: Request, res: Response) => {
    const { authorId, contributionId, signature } = req.body
    const [author, contribution] = await useContribution(
      prisma,
      authorId,
      contributionId,
    )

    if (Boolean(contribution.signature)) {
      res.status(200).json({ message: "Already verified!" })
      return
    }

    for (const { text } of await tweetsByUsername(author.twitter)) {
      const index = text.indexOf("sig:")
      if (index === -1) continue

      const found = text
        .slice(index + 4)
        .split(" ")[0]
        .trim()
      if (signature !== found) continue

      try {
        console.time("prisma.update")
        await prisma.contribution.update({
          where: { id: contributionId },
          data: { signature },
        })
        res.status(201).json({ message: "Verified!" })
      } catch (error) {
        res.status(500).json({ message: error.message })
      } finally {
        console.timeEnd("prisma.update")
        return
      }
    }

    res.status(404).json({ error: "No matching tweets found" })
  }

const useContribution = async (
  prisma: Services["prisma"],
  authorId: string,
  contributionId: number,
) => {
  try {
    console.time("prisma.findFirst")
    const { author, ...contribution } = await prisma.contribution.findFirst({
      where: { authorId, id: contributionId },
      include: { author: true },
    })
    return [author, contribution] as const
  } finally {
    console.timeEnd("prisma.findFirst")
  }
}

const tweetsByUsername = async (username: string) => {
  try {
    console.time("twitter")
    const client = new TwitterApi(process.env.BEARER_TOKEN)
    const { data: user } = await client.readOnly.v2.userByUsername(username)
    const { tweets } = await client.readOnly.v2.userTimeline(user.id)
    return tweets
  } catch (error) {
    console.error(error)
    return []
  } finally {
    console.timeEnd("twitter")
  }
}
