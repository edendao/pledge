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
  if (!response.ok) {
    throw new Error(jsonResponse?.error || response.statusText)
  }
  return jsonResponse
}

// TODO: maybe enrich with location data?
// http://ipinfo.io
export async function addContribution(
  request: AddContributionRequest,
): Promise<AddContributionResponse> {
  const response = await makeRequest(`${ApiUrl}/contributions`, {
    body: request,
    method: "POST",
  })
  return response as AddContributionResponse
}

export async function getContribution({
  id,
}: GetContributionRequest): Promise<Contribution> {
  const response = await makeRequest(`${ApiUrl}/contributions/${id}`, {
    method: "GET",
  })
  return response as Contribution
}

export async function getContributions({
  offset = 0,
}: GetContributionsRequest): Promise<Contribution[]> {
  const response = await makeRequest(
    withQueryParams(`${ApiUrl}/contributions`, {
      offset: `${offset}`,
    }),
    { method: "GET" },
  )
  return response as Contribution[]
}

export async function getAuthor({ id }: GetAuthorRequest) {
  const response = await makeRequest(`${ApiUrl}/authors/${id}`, {
    method: "GET",
  })
  return response as Author | undefined
}

export async function getAuthors({
  offset = 0,
}: GetAuthorsRequest = {}): Promise<Author[]> {
  const response = await makeRequest(
    withQueryParams(`${ApiUrl}/authors`, { offset: `${offset}` }),
    { method: "GET" },
  )
  return response as Author[]
}

export async function addAuthor(
  request: AddAuthorRequest,
): Promise<AddAuthorResponse> {
  const response = await makeRequest(`${ApiUrl}/authors`, {
    body: request,
    method: "POST",
  })
  return response as AddAuthorResponse
}

export async function verifyTwitter(
  request: VerifyTwitterRequest,
): Promise<void> {
  await makeRequest(`${ApiUrl}/twitter/verify`, {
    body: request,
    method: "POST",
  })
}

export async function getStats(): Promise<GetStatsResponse> {
  return makeRequest(`${ApiUrl}/stats`, { method: "GET" })
}

// FOR ARWEAVE //

interface Tag {
  name: string
  value: string
}

interface Edge {
  node: {
    id: string
    tags: {
      find: (fn: (t: Tag) => boolean) => Tag
    }
  }
}

export interface ArweaveEssayTransaction {
  transactionId: string
  version: number
}

function getVersionForArweaveTransaction(edge: Edge): number {
  return (
    parseInt(
      edge.node.tags.find((tag: Tag) => tag.name === "DOC_VERSION").value,
    ) || 0
  )
}

export async function fetchLatestArweaveEssay(): Promise<ArweaveEssayTransaction> {
  const req = await fetch("https://arweave.net/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
        transactions(
          tags: [
            {
              name: "DOC_NAME",
              values: ["pluriverse:browser/src/components/EssayBody.tsx"]
            }
          ],
          owners: ["aek33fcNH1qbb-SsDEqBF1KDWb8R1mxX6u4QGoo3tAs"],
        ) {
          edges {
            node {
              id
              tags {
                name
                value
              }
            }
          }
        }
      }
      `,
    }),
  })
  const edges = (await req.json()).data.transactions.edges as Edge[]
  const txns = edges.map(e => ({
    transactionId: e.node.id,
    version: getVersionForArweaveTransaction(e),
  }))
  // Latest transaction by version
  return txns.sort((a, b) => b.version - a.version)[0]
}
