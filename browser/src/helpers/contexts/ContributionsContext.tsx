import React, { useEffect, useRef, useState } from "react";
import { Contribution } from "src/types/common/server-api";
import getMockContributions from "src/utils/getMockContributions";
import { UseMock } from "src/utils/mock";
import { getContributions, getContribution } from "../api";
import { getMockContributions } from "../../utils/getMockContributions"

interface ContributionsContextInfo {
  contributions: Contribution[];
  fetchContributions(): void;
  fetchContribution(id: number): Promise<Contribution>;
}

export const ContributionsContext =
  React.createContext<ContributionsContextInfo>({
    contributions: [],
    fetchContributions: () => { },
    fetchContribution: () => Promise.resolve(undefined),
  });

export function ContributionsProvider({ children }) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const contributionIdsSet = useRef(new Set<number>());

  useEffect(async () => {
    await fetchContributions();
  }, []);

  async function fetchContributions() {
    let newContributions: Contribution[];
    if (UseMock) {
      newContributions = getMockContributions();
    } else {
      newContributions = await getContributions({});
      for (const { id } of newContributions) {
        contributionIdsSet.current.add(id);
      }
    }
    setContributions(newContributions);
  }

  async function fetchContribution(id: number) {
    const contribution = await getContribution({ id });
    if (!contributionIdsSet.current.has(id)) {
      contributionIdsSet.current.add(id);
      setContributions([...contributions, contribution]);
    }
    return contribution;
  }

  const contributionsContext = {
    contributions,
    fetchContributions,
    fetchContribution,
  };

  return (
    <ContributionsContext.Provider value={contributionsContext}>
      {children}
    </ContributionsContext.Provider>
  );
}
