import { useEffect, useState } from "react";
import { getContributions } from "src/helpers/api";
import { Contribution, Pattern } from "src/types/common/server-api";
import { ButtonClass } from "src/types/styles";
import { Principles } from "../types";
import { ContributionCard } from "./ContributionCard";
import ContributionsGrid from "./ContributionsGrid";
import "./PatternsContent.css";

const PreviewContributionLimit = 3;

export default function PatternsContent() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(async () => {
    const newContributions = await getContributions({});
    setContributions(newContributions);
  }, []);

  function renderContributionPreview(pattern: Pattern, className?: string) {
    const filteredContributions = contributions.filter(
      (c) => c.pattern === pattern
    );
    return (
      <div className={`contributionPreview ${className ? className : ""}`}>
        {filteredContributions
          .slice(0, PreviewContributionLimit)
          .map((contribution) => (
            // <blockquote className="pb-14">
            //   <p className="pt-0">{contribution.response}</p>
            //   <p className="italic text-right">–{contribution.author}</p>
            // </blockquote>
            <ContributionCard contribution={contribution} />
          ))}
        {filteredContributions.length > PreviewContributionLimit && (
          <div style={{ alignSelf: "flex-start" }} className="seeAll">
            {/* TODO: fill in the onclick */}
            <button className={ButtonClass()}>See all</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container w-full md:max-w-7xl mx-auto pb-20">
      <hr />
      <div className="px-3 py-20">
        <div className="grid grid-cols-4 items-center justify-center">
          <div className="col-span-1">
            <h2 className="font-title font-mono italic text-5xl pl-8 font-bold pb-12">
              Patterns
            </h2>
          </div>
          <div className="col-span-3">
            <p className="pl-8 pr-2 pt-0">
              The digital pluriverse will cultivate the flourishing of many
              different, and potentially contrasting worlds. Deeply informed by
              Escobar’s autonomous design principles, as well as Christopher
              Alexander’s concept of pattern languages, we lay out below a set
              of intentions and epistemes for pluriversality, modeled as the
              beginning of a pattern language for the pluriverse. Each pattern
              maps to and connects with the others, in what we hope will be a
              network that is both ever-expanding and ever-concretizing.
            </p>
          </div>
        </div>
      </div>
      {/* <div style={{ display: "flex", alignItems: "center" }}>
        {renderContributionPreview(
          Pattern.Pluriverse,
          "contributionPreviewRow"
        )}
      </div> */}
      <hr />
      {Object.values(Principles).map(({ title, body }, index) => (
        <>
          <div className="px-8 pb-16 pt-16">
            <h3 className="font-title font-mono text-5xl font-bold pb-16">
              0{index + 1}.{title}
            </h3>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h4 className="font-title text-3xl font-bold">The problem</h4>
                <p>{body}</p>
              </div>
              <div>
                <h4 className="font-title text-3xl font-bold">The solution</h4>
                <p>
                  The many worlds of the pluriverse must be connected.
                  Meaningful interoperability will be both technical and
                  institutional; the data moats of today will give way to the
                  portable social graphs and cooperative data structures of
                  tomorrow.
                </p>
              </div>
            </div>
            <ContributionsGrid />
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}
