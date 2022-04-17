import { PrismaClient } from "@prisma/client"
import { ArweaveClient } from "ar-wrapper"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import { addContribution } from "./api-handlers/add_contribution"
import { addUser } from "./api-handlers/add_user"
import { getContribution } from "./api-handlers/get_contribution"
import { getContributions } from "./api-handlers/get_contributions"
import { getStats } from "./api-handlers/get_stats"
import { getUser } from "./api-handlers/get_user"
import { getUsers } from "./api-handlers/get_users"
import { verify } from "./api-handlers/twitter_verify"

dotenv.config()

// import contributions from "./api/contributions";

const app = express()
app.use(express.json())

const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const corsMiddleware = cors(corsOptions)
const port = process.env.PORT || 3001

const prisma = new PrismaClient()

const address = process.env.ARWEAVE_ADDRESS
const keyfile = process.env.ARWEAVE_KEY
const arweave = new ArweaveClient(address, keyfile)
const services = { prisma, arweave }

app.use(cors(corsOptions))

const usersRouter = express.Router()
usersRouter.options("/", corsMiddleware)
usersRouter.post("/", corsMiddleware, addUser(services))
usersRouter.get("/", corsMiddleware, getUsers(services))
usersRouter.options("/:id", corsMiddleware)
usersRouter.get("/:id", corsMiddleware, getUser(services))
app.use("/users", usersRouter)

const contributionsRouter = express.Router()
contributionsRouter.options("/", corsMiddleware)
contributionsRouter.get("/", corsMiddleware, getContributions(services))
contributionsRouter.options("/:id", corsMiddleware)
contributionsRouter.get("/:id", corsMiddleware, getContribution(services))
contributionsRouter.post("/", corsMiddleware, addContribution(services))
app.use("/contributions", contributionsRouter)

const twitterRouter = express.Router()
twitterRouter.options("/verify", corsMiddleware)
twitterRouter.post("/verify", verify(services))
app.use("/twitter", twitterRouter)

app.options("/stats", corsMiddleware)
app.get("/stats", corsMiddleware, getStats(services))

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
