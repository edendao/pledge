import {
  AddAuthorRequest,
  AddAuthorResponse,
  AddContributionRequest,
  AddContributionResponse,
  Author,
  Contribution,
  GetAuthorRequest,
  GetAuthorsRequest,
  GetContributionRequest,
  GetContributionsRequest,
  GetStatsResponse,
  VerifyTwitterRequest,
} from "../types/common/server-api"

export function withQueryParams(
  url: string,
  params: Record<string, string>,
): string {
  const definedParams = Object.fromEntries(
    Object.entries(params).flatMap(([key, val]) =>
      val === undefined ? [] : [[key, val]],
    ),
  )
  const query = new URLSearchParams(definedParams)

  const queryString = query.toString()
  return queryString.length ? `${url}?${queryString}` : url
}

const ApiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:3001"

async function makeRequest<T>(
  url: string,
  { method, body }: { method: string; body?: object },
): Promise<T> {
  const response = await fetch(url, {
    // redirect: "follow", // manual, *follow, error
    mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method,
    body: JSON.stringify(body),
  })
  const text = await response.text()
  const jsonResponse = text.length ? JSON.parse(text) : undefined
  if (!response.ok || jsonResponse?.error) {
    throw new Error(jsonResponse?.error || response.statusText)
  }
  return jsonResponse
}

export const addContribution = async (request: AddContributionRequest) =>
  await makeRequest<AddContributionResponse>(`${ApiUrl}/contributions`, {
    body: request,
    method: "POST",
  })

export const getContribution = async ({ id }: GetContributionRequest) =>
  await makeRequest<Contribution>(`${ApiUrl}/contributions/${id}`, {
    method: "GET",
  })

export const getContributions = async ({
  offset = 0,
}: GetContributionsRequest) =>
  await makeRequest<Contribution[]>(
    withQueryParams(`${ApiUrl}/contributions`, {
      offset: `${offset}`,
    }),
    { method: "GET" },
  )

export const getAuthor = async ({ id }: GetAuthorRequest) =>
  await makeRequest<Author | undefined>(`${ApiUrl}/authors/${id}`, {
    method: "GET",
  })

export const getAuthors = async ({ offset = 0 }: GetAuthorsRequest = {}) =>
  await makeRequest<Author[]>(
    withQueryParams(`${ApiUrl}/authors`, { offset: `${offset}` }),
    { method: "GET" },
  )

export const addAuthor = async (request: AddAuthorRequest) =>
  await makeRequest<AddAuthorResponse>(`${ApiUrl}/authors`, {
    body: request,
    method: "POST",
  })

export const verifyTwitter = async (request: VerifyTwitterRequest) =>
  await makeRequest(`${ApiUrl}/twitter/verify`, {
    body: request,
    method: "POST",
  })

export const getStats = async () =>
  makeRequest<GetStatsResponse>(`${ApiUrl}/stats`, { method: "GET" })
