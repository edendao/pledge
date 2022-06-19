import React, { useContext, useEffect, useRef } from "react"
// import { ContributionCard } from "src/components/ContributionCard"
import { NFTCard } from "src/components/NFTCard"

// import { ContributionSection } from "../components/ContributionSection"
// import Hero from "../components/Hero"
// import { PledgeBody } from "../components/PledgeBody"
// import { ContributionsContext } from "../helpers/contexts/ContributionsContext"
import { gsap } from "../helpers/gsap"
import "../components/Hero.css"

export const Claim: React.FC = () => {
  const { pledgeContentRef, contributionsContentRef } = useGsapEffects()
  // const { contributions } = useContext(ContributionsContext)
  const mintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mintRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [mintRef])

  return (
    <>
      <div className="fadeOutOnScroll">
        <div>
          <div className="hero fadeInDown flex flex-col items-center justify-center mt-36">
            <h1
              className="text-3xl text-center md:text-8xl m-0"
              style={{ fontFamily: "Cosplay" }}
            >
              Dao De Eden
            </h1>
            <h2
              className="text-5xl text-center md:text-5xl py-4"
              style={{ fontWeight: 700 }}
            >
              Mint your own Dao De Eden NFT passport
            </h2>
            <h2 className="text-5xl text-center m-0">
              {/* towards reconnection, regeneration, harmony, and flourishing. */}
            </h2>
          </div>
        </div>
      </div>
      <div className="mainContent px-4 md:px-8">
        <div id="pledge-content" ref={pledgeContentRef}>
          {/* <PledgeBody /> */}
          <div ref={mintRef} className="flex justify-center">
            <NFTCard />
          </div>
        </div>
        <div
          id="contributionSection"
          className="container w-full md:max-w-4xl mx-auto my-64"
        ></div>
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
