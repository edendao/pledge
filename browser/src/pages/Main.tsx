import React, { useEffect, useRef } from "react"

import { ContributionSection } from "../components/ContributionSection"
import ContributionsWall from "../components/ContributionsWall"
import EssayContent from "../components/EssayContent"
import Hero from "../components/Hero"
import useGsap from "../hooks/useGsap"

export function Main() {
  const gsap = useGsap()

  const essayContentRef = useRef<HTMLDivElement>(null)
  const patternsContentRef = useRef<HTMLDivElement>(null)

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
          trigger: essayContentRef.current,
          start: 100,
          end: " top top",
          scrub: true,
        },
      },
    )
  }, [])

  useEffect(() => {
    gsap.fromTo(
      essayContentRef.current,
      { opacity: fixedOpacity },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: essayContentRef.current,
          start: 0,
          end: "top top",
          scrub: true,
        },
      },
    )
  }, [])

  return (
    <>
      <div className="fadeOutOnScroll">
        <Hero />
      </div>
      <div className="mainContent px-4 md:px-8">
        <div id="essay-content" ref={essayContentRef}>
          <EssayContent />
        </div>
        <div
          id="contributionSection"
          className="container w-full md:max-w-4xl mx-auto my-64"
        >
          <ContributionSection />
        </div>
        <div id="contributions" ref={patternsContentRef}>
          <ContributionsWall />
        </div>
      </div>
    </>
  )
}
