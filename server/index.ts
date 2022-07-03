import { PrismaClient } from "@prisma/client"
import corsMiddleware from "cors"
import dotenv from "dotenv"
import express from "express"

import { addAuthor } from "./api-handlers/add_author"
import { addContribution } from "./api-handlers/add_contribution"
import { getAuthor } from "./api-handlers/get_author"
import { getAuthors } from "./api-handlers/get_authors"
import { getContribution } from "./api-handlers/get_contribution"
import { getContributions } from "./api-handlers/get_contributions"
import { getGreenlistStatus } from "./api-handlers/get_greenlist_status"
import { getStats } from "./api-handlers/get_stats"
import { verify } from "./api-handlers/twitter_verify"

dotenv.config()

const app = express()
app.use(express.json())

const cors = corsMiddleware({
  origin: process.env.ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
})
const port = process.env.PORT || 3001

const prisma = new PrismaClient()
const services = { prisma }

app.use(cors)

app.options("/greenlistStatus/:address", cors)
app.get("/greenlistStatus/:address", cors, getGreenlistStatus(services))

const authorsRouter = express.Router()
authorsRouter.options("/", cors)
authorsRouter.post("/", cors, addAuthor(services))
authorsRouter.get("/", cors, getAuthors(services))
authorsRouter.options("/:id", cors)
authorsRouter.get("/:id", cors, getAuthor(services))
app.use("/authors", authorsRouter)

const contributionsRouter = express.Router()
contributionsRouter.options("/", cors)
contributionsRouter.get("/", cors, getContributions(services))
contributionsRouter.options("/:id", cors)
contributionsRouter.get("/:id", cors, getContribution(services))
contributionsRouter.post("/", cors, addContribution(services))
app.use("/contributions", contributionsRouter)

const twitterRouter = express.Router()
twitterRouter.options("/verify", cors)
twitterRouter.post("/verify", verify(services))
app.use("/twitter", twitterRouter)

app.options("/stats", cors)
app.get("/stats", cors, getStats(services))

app.listen(port, () => {
  console.log(`Express is listening at ${port}`)
})
