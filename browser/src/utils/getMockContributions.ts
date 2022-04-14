import { Contribution, Pattern } from "src/types/common/server-api"

import { MockSignatures } from "./mock"

const mockContributionCommon = {
  response:
    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam. lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.  lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam. ",
  prompt: "LooksLike",
  pattern: "Interoperability",
  createdAt: "2022-01-09T23:32:14.174Z",
}

export default function getMockContributions() {
  const mockContributions: Contribution[] = []

  for (let id = 0; id < 12; id++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockContributions.push({
      ...mockContributionCommon,
      id,
      author: MockSignatures[id % MockSignatures.length],
    })
  }

  for (let id = 13; id < 24; id++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockContributions.push({
      ...mockContributionCommon,
      id,
      author: MockSignatures[id % MockSignatures.length],
      pattern: Pattern.Agency,
    })
  }

  return mockContributions
}
