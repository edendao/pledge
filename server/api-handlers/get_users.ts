// GET /users

import { Author, GetUsersRequest } from "@common/server-api";
import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { Services } from "../types";

const UserLimit = 500;

export function getUsers({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
      const { offset } = req.query as unknown as GetUsersRequest;

      // TODO: validate request, maybe use autogenerated zod

      const authors = await prisma.user.findMany({
        orderBy: [{ twitterVerified: "desc" }, { createdAt: "asc" }],
        take: UserLimit,
        skip: offset,
      });

      res.json(
        authors.map((author) => ({ ...author, walletId: author.id } as Author))
      );
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientValidationError) {
        res
          .status(400)
          .json({ error: `Received invalid data. ${err.message}` });
        return;
      }
      res.status(400).json({ error: err.message });
    }
  };
}
