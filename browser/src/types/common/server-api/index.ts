/**
 * Model Author
 *
 */
export type Author = {
  id: string
  twitter: string
  country: string
  createdAt: Date
}

/**
 * Model Contribution
 *
 */
export type Contribution = {
  id: number
  author: Author
  authorId: string
  signature: string
  createdAt: Date
  sense: Sense
  prompt: Prompt
  response: string
  priority: number
}

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Sense = {
  FeelsLike: "FeelsLike",
  LooksLike: "LooksLike",
  SeemsLike: "SeemsLike",
}

export type Sense = typeof Sense[keyof typeof Sense]

export const Prompt = {
  Children: "Children",
  ClimateJourney: "ClimateJourney",
  Money: "Money",
  RegenerativeRenaissance: "RegenerativeRenaissance",
}

export type Prompt = typeof Prompt[keyof typeof Prompt]

// TODO: IF YOU CHANGE ANYTHING HERE PLEASE COPY IT INTO `server/common/server-api/index.ts`
export const Prompts: Record<Prompt, string> = {
  Children: "the world I am proud to leave my children",
  Money: "money in service of our world",
  RegenerativeRenaissance: "a regenerative renaissance",
  ClimateJourney: "my climate journey",
} as const

export type AddContributionRequest = Pick<
  Contribution,
  "authorId" | "response" | "sense" | "prompt"
>

export type AddContributionResponse = Contribution

export type AddAuthorRequest = Pick<Author, "id" | "twitter">

export type AddAuthorResponse = Author

export interface GetAuthorRequest {
  id: string
}

export interface GetAuthorsRequest {
  offset?: number
}

export interface GetContributionsRequest {
  offset?: number
}

export interface GetContributionRequest {
  id: number
}

export interface VerifyTwitterRequest {
  authorId: string
  contributionId: number
  signature: string
}

export interface GetStatsResponse {
  authorsTotal: number
  contributionsTotal: number
}

export const ContributionLimit = 500
export const SignatureLimit = 500
