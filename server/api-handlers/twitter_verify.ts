import { Request, Response } from "express"
import { TwitterApi } from "twitter-api-v2"

import { Services } from "../types"

export const twitterVerify =
  ({ prisma }: Services) =>
  async (req: Request, res: Response) => {
    const { authorId, contributionId: id, signature } = req.body
    const [author, contribution] = await useContribution(prisma, authorId, id)

    if (Boolean(contribution.signature)) {
      res.status(200).json({ message: "Already verified!" })
    } else if (await findTweetWithSignature(author.twitter, signature)) {
      try {
        console.time("prisma.update")
        await prisma.contribution.update({ where: { id }, data: { signature } })
        res.status(201).json({ message: "Verified!" })
      } catch (error) {
        res.status(500).json({ message: error.message })
      } finally {
        console.timeEnd("prisma.update")
      }
    } else {
      res.status(404).json({ error: "No matching tweets found" })
    }
  }

const useContribution = async (
  prisma: Services["prisma"],
  authorId: string,
  id: number,
) => {
  try {
    console.time("prisma.findFirst")
    const { author, ...contribution } = await prisma.contribution.findFirst({
      where: { authorId, id },
      include: { author: true },
    })
    return [author, contribution] as const
  } finally {
    console.timeEnd("prisma.findFirst")
  }
}

const findTweetWithSignature = async (username: string, signature: string) => {
  try {
    console.time("twitter")

    const client = new TwitterApi(process.env.BEARER_TOKEN)
    const { data: user } = await client.readOnly.v2.userByUsername(username)
    const { tweets } = await client.readOnly.v2.userTimeline(user.id)

    return tweets.find(({ text }) => {
      const index = text.indexOf("sig:")
      return (
        index !== -1 &&
        text
          .slice(index + 4)
          .split(" ")[0]
          .trim() === signature
      )
    })
  } catch (error) {
    console.error(error)
    return null
  } finally {
    console.timeEnd("twitter")
  }
}
