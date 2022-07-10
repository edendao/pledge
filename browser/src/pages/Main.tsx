import classNames from "classnames"
import React, { useContext, useEffect, useRef } from "react"
import { ContributionCard } from "src/components/ContributionCard"

import { ContributionSection } from "../components/ContributionSection"
import Hero from "../components/Hero"
import { PledgeBody } from "../components/PledgeBody"
import { ContributionsContext } from "../helpers/contexts/ContributionsContext"
import { gsap } from "../helpers/gsap"

export const Main: React.FC = () => {
  const { pledgeContentRef, contributionsContentRef } = useGsapEffects()
  const { contributions } = useContext(ContributionsContext)

  return (
    <>
      <div className="fadeOutOnScroll">
        <Hero />
      </div>
      <div className="mainContent px-4 md:px-8">
        <div id="pledge-content" ref={pledgeContentRef}>
          <article className="container w-full px-2 md:px-0 md:max-w-2xl mx-auto">
            <PledgeBody />
          </article>
        </div>
        <div
          id="contributionSection"
          className="container w-full md:max-w-4xl mx-auto my-64"
        >
          <ContributionSection />
        </div>
        <div id="contributions" ref={contributionsContentRef}>
          <div className="container w-full mx-auto my-32">
            <h2
              id="contributions"
              className="font-title text-6xl font-bold text-center shimmer"
            >
              Visions of a Regenerative Future
            </h2>
            {contributions?.length ? (
              <div className="my-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {contributions.map((contribution, index) => (
                  <ContributionCard
                    key={contribution.id}
                    contribution={contribution}
                    className={classNames(
                      "mx-auto",
                      index === 0 && "highlight",
                    )}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

const useGsapEffects = () => {
  const pledgeContentRef = useRef<HTMLDivElement>(null)
  const contributionsContentRef = useRef<HTMLDivElement>(null)

  const fixedOpacity = 0.05

  useEffect(() => {
    gsap.fromTo(
      ".fadeInOnTermsOnContributionSection",
      { opacity: fixedOpacity },
      {
        opacity: 0.2,
        scrollTrigger: { trigger: "#contributionSection", scrub: true },
      },
    )
  }, [])

  useEffect(() => {
    gsap.fromTo(
      ".fadeOutOnScroll",
      { opacity: 1 },
      {
        opacity: fixedOpacity,
        scrollTrigger: {
          trigger: pledgeContentRef.current,
          start: 100,
          end: " top top",
          scrub: true,
        },
      },
    )
  }, [])

  useEffect(() => {
    gsap.fromTo(
      pledgeContentRef.current,
      { opacity: fixedOpacity },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: pledgeContentRef.current,
          start: 0,
          end: "top top",
          scrub: true,
        },
      },
    )
  }, [])

  return { pledgeContentRef, contributionsContentRef }
}
