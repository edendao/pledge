import "./ContributionSection.css"

import React, { useContext, useEffect, useState } from "react"
import { BiErrorCircle } from "react-icons/bi"
import { MdArrowForward } from "react-icons/md"
import { addAuthor, addContribution, verifyTwitter } from "src/helpers/api"
import { getAuthor } from "src/helpers/api"
import { AuthorContext } from "src/helpers/author"
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext"
import { StatsContext } from "src/helpers/contexts/StatsContext"
import { ButtonClass } from "src/types/styles"

import {
  Contribution,
  Prompt,
  Prompts,
  Sense,
} from "../types/common/server-api"
import { ContributionCard } from "./ContributionCard"
import { AutoGrowInput } from "./core/AutoGrowInput"
import { Checkmark } from "./core/Checkmark"
import { Dropdown, DropdownItem } from "./core/Dropdown"

enum Page {
  Welcome = "Welcome",
  Contribute = "Contribute",
  Share = "Share",
  Complete = "Complete",
}

const PAGES = Object.values(Page)

const ResponseCharacterLimit = 99

export const SensePrompts: Record<Sense, string> = {
  [Sense.LooksLike]: `looks like`,
  [Sense.FeelsLike]: `feels like`,
  [Sense.SeemsLike]: `seems like`,
}

const PreviewCard: React.FC<
  Omit<Contribution, "id" | "authorId" | "createdAt" | "priority"> & {
    className?: string
  }
> = ({ className = "", response = "...", ...contribution }) => (
  <ContributionCard
    className={`preview-card !w-auto md:!w-full ${className}`}
    contribution={{
      ...contribution,
      response,
      id: 0,
      authorId: "",
      priority: 0,
      createdAt: new Date(),
    }}
  />
)

export function ContributionSection() {
  const [page, setPage] = useState(Page.Welcome)

  const { currentAuthor, setCurrentAuthor, connectWallet, signAndValidate } =
    useContext(AuthorContext)
  const { getContribution, getContributions, setContributions } =
    useContext(ContributionsContext)
  const { stats, fetchStats } = useContext(StatsContext)

  const [signature, setSignature] = useState("")
  const [selectedSense, setSelectedSense] = useState<Sense>(Sense.LooksLike)
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>("Children")
  const [promptResponse, setPromptResponse] = useState(() => "serendipity")
  const response = `When I imagine ${Prompts[selectedPrompt]}, it ${SensePrompts[selectedSense]} ${promptResponse}`

  const PromptItems: DropdownItem[] = Object.entries(Prompts).map(
    ([name, prompt]) => ({
      name,
      displayName: prompt,
      onClick: () => setSelectedPrompt(name as Prompt),
    }),
  )

  useEffect(() => {
    setSignature("")
  }, [promptResponse])

  const SenseItems: DropdownItem[] = Object.entries(SensePrompts).map(
    ([name, sense]) => ({
      name,
      displayName: sense,
      onClick: () => setSelectedSense(name as Sense),
    }),
  )

  const [step, setStep] = useState<
    "welcome" | "sign" | "tweet" | "verify" | "complete"
  >("welcome")
  const [isStepLoading, setStepLoading] = useState({
    sign: false,
    tweet: false,
    verify: false,
  })
  const [error, setError] = useState<string>()
  const handleErr = (err: Error) => setError(err.message)

  const [contribution, setContribution] = useState<Contribution>()

  const findOrCreateAuthor = async (id: string, twitter = "") =>
    currentAuthor.id === id
      ? currentAuthor
      : (await getAuthor({ id })) ?? (await addAuthor({ id, twitter }))

  function renderPage() {
    switch (page) {
      case Page.Welcome:
        return (
          <div className="welcome">
            <div className="flex mb-6">
              <h2 className="text-4xl font-bold shimmer">
                Hello, fellow human.
              </h2>
            </div>

            <p className="text-2xl">
              Join our movement by sharing your vision for a regenerative future
              and get <strong className="shimmer">greenlisted</strong> for
              future Eden Dao drops.
            </p>
            {stats && (
              <p className="text-2xl">
                Somehow, amidst all the noise in the world,{" "}
                <strong className="shimmer">
                  {stats.authorsTotal} humans have come together
                </strong>{" "}
                to co-create a beautiful future for this world. Come on in
                &mdash; join us. The Eden Way is always walked in the company of
                friends.
              </p>
            )}
          </div>
        )

      case Page.Contribute:
        return (
          <div>
            <div className="signContainer">
              <div className="contributionContainer md:grid flex flex-col items-stretch justify-center">
                <div className="selects pr-4">
                  <div className="responseContainer w-full pl-16">
                    <label className="block">
                      <p className="text-lg">What is your Twitter username?</p>
                      <input
                        value={`@${currentAuthor.twitter}`}
                        onChange={evt => {
                          setCurrentAuthor(author => ({
                            ...author,
                            twitter: evt.target.value.replaceAll("@", ""),
                          }))
                        }}
                        maxLength={15}
                        className="w-full py-2 px-4 mt-1"
                      />
                    </label>

                    <div className="flex mt-4">
                      <p className="text-lg pb-2">
                        What does <span className="shimmer">Eden Dao</span> mean
                        to you?
                      </p>
                      <span className="flex-grow" />
                      <p className="text-lg opacity-50 mb-0 pb-2">
                        {promptResponse?.length || 0} / {ResponseCharacterLimit}
                      </p>
                    </div>

                    <label className="block">
                      <Dropdown
                        items={PromptItems}
                        className="patternSelect w-full"
                        selectedItemName={
                          selectedPrompt && Prompts[selectedPrompt]
                        }
                      />
                    </label>

                    <label className="block">
                      <Dropdown
                        items={SenseItems}
                        className="patternSelect w-full"
                        selectedItemName={
                          selectedSense && SensePrompts[selectedSense]
                        }
                      />
                    </label>

                    <label>
                      <AutoGrowInput
                        value={promptResponse}
                        onChange={setPromptResponse}
                        className="responseInput"
                        extraProps={{
                          placeholder: "",
                          maxLength: ResponseCharacterLimit,
                        }}
                      />
                    </label>
                  </div>
                </div>
                {currentAuthor && (
                  <PreviewCard
                    className="ml-12 mr-auto"
                    signature={signature}
                    author={currentAuthor}
                    prompt={selectedPrompt}
                    response={response}
                    sense={selectedSense}
                  />
                )}
              </div>
            </div>
          </div>
        )

      case Page.Share:
        return (
          <div>
            <div className="signContainer">
              <div className="flex">
                <h2 className="text-2xl font-bold">
                  Share your vision to get{" "}
                  <em className="shimmer">greenlisted</em>
                </h2>
              </div>
              <div className="ShareContainer md:grid contributionContainer flex flex-col items-stretch justify-center">
                <PreviewCard
                  className="ml-auto mr-12"
                  signature={contribution?.signature ?? ""}
                  author={currentAuthor}
                  prompt={selectedPrompt}
                  response={`When I imagine ${Prompts[selectedPrompt]}, it ${SensePrompts[selectedSense]} ${promptResponse}`}
                  sense={selectedSense}
                />
                <ol className="list-decimal list-inside mt-2">
                  <p
                    className="text-xl"
                    style={{ opacity: step === "sign" ? 1 : 0.3 }}
                  >
                    <li>Connect your wallet and gaslessly sign your vision!</li>
                    <button
                      disabled={step !== "sign" || isStepLoading.sign}
                      className={ButtonClass("mt-3")}
                      onClick={async () => {
                        setStepLoading(s => ({ ...s, sign: true }))
                        const { twitter } = currentAuthor
                        const walletAddress = await connectWallet()
                        await Promise.all([
                          signAndValidate(response).then(setSignature),
                          findOrCreateAuthor(walletAddress, twitter).then(
                            setCurrentAuthor,
                          ),
                        ]).then(() => {
                          setStepLoading(s => ({ ...s, sign: false }))
                          setStep("tweet")
                        }, handleErr)
                      }}
                    >
                      {isStepLoading.sign
                        ? "Signing "
                        : signature
                        ? "Signed "
                        : "Sign "}
                      with Ethereum
                    </button>
                  </p>
                  <p
                    className="text-xl"
                    style={{ opacity: step === "tweet" ? 1 : 0.4 }}
                  >
                    <li>Tweet to verify your contribution!</li>
                    <button
                      disabled={step === "sign" || isStepLoading.tweet}
                      className={ButtonClass("mt-2")}
                      onClick={async () => {
                        try {
                          setStepLoading(s => ({ ...s, tweet: true }))

                          const created = addContribution({
                            authorId: currentAuthor.id,
                            prompt: selectedPrompt,
                            sense: selectedSense,
                            response,
                          })

                          const tweetTextParam = encodeURI(
                            `When I imagine @TheEdenDao, it ${SensePrompts[selectedSense]} ${promptResponse} sig:${signature}`,
                          )
                          window.open(
                            `https://twitter.com/intent/tweet?text=${tweetTextParam}`,
                            "_blank",
                          )

                          const [cc] = await Promise.all([
                            created,
                            fetchStats(),
                          ])
                          const cs = await getContributions({ offset: 0 }).then(
                            cs => cs.flatMap(c => (c.id === cc.id ? [] : [c])),
                          )
                          setContribution(cc)
                          setContributions([cc, ...cs])

                          setStep("verify")
                        } catch (error) {
                          handleErr(error as Error)
                        } finally {
                          setStepLoading(s => ({ ...s, tweet: false }))
                        }
                      }}
                    >
                      Announc
                      {step === "verify"
                        ? "ed"
                        : isStepLoading.tweet
                        ? "ing"
                        : "e"}{" "}
                      on Twitter
                    </button>
                  </p>
                  <p
                    className="text-xl"
                    style={{ opacity: step === "verify" ? 1 : 0.3 }}
                  >
                    <li>
                      Get verified
                      <span style={{ position: "relative", top: -2, left: 4 }}>
                        <Checkmark />
                      </span>
                    </li>
                    <button
                      className={ButtonClass("mt-2")}
                      disabled={
                        step === "sign" ||
                        !!contribution?.signature ||
                        isStepLoading.verify
                      }
                      onClick={async () => {
                        try {
                          if (!contribution) {
                            throw new Error("Missing contribution")
                          }

                          setStepLoading(s => ({ ...s, verify: true }))
                          const { id, authorId } = contribution
                          await Promise.all([
                            verifyTwitter({
                              contributionId: id,
                              authorId,
                              signature,
                            }),
                            fetchStats(),
                          ])
                          const [cc, cs] = await Promise.all([
                            getContribution({ id }),
                            getContributions({ offset: 0 }).then(cs =>
                              cs.flatMap(c => (c.id === id ? [] : [c])),
                            ),
                          ])
                          setContribution(cc)
                          setContributions([cc, ...cs])
                          setStep("complete")
                        } catch (error) {
                          handleErr(error as Error)
                        } finally {
                          setStepLoading(s => ({ ...s, verify: false }))
                        }
                      }}
                    >
                      {contribution?.signature
                        ? "Verified!"
                        : isStepLoading.verify
                        ? "Verifying"
                        : "Verify"}
                    </button>
                  </p>
                </ol>
              </div>
            </div>
          </div>
        )

      case Page.Complete:
        return (
          <div className="welcome">
            <div className="flex mb-6">
              <h2 className="text-3xl font-bold">Thanks, new friend.</h2>
            </div>
            {stats && (
              <>
                <p className="text-2xl">
                  Your are now one of{" "}
                  <strong className="shimmer">
                    {stats.authorsTotal} beautiful humans
                  </strong>{" "}
                  on the path towards regeneration.
                </p>
                <p className="text-2xl shimmer">
                  And greenlisted for future drops.
                </p>
              </>
            )}
          </div>
        )

      default:
        throw Error("unreachable")
    }
  }

  const pageIndex = PAGES.indexOf(page)
  const nextPage =
    pageIndex + 1 < PAGES.length && (PAGES[pageIndex + 1] as Page)

  return (
    <>
      <div id="contribute" className="contributionSection text-base">
        <div className="pageProgressContainer mb-8">
          {PAGES.map(p => (
            <div
              key={p}
              className={`pageProgress ${
                page === p ? "selectedPageProgress" : ""
              }`}
            />
          ))}
        </div>
        {renderPage()}
        {error && (
          <div className="errorContainer text-red-500 flex items-center gap-1 justify-center text-xl ml-4">
            <BiErrorCircle /> <em>{error}</em>
          </div>
        )}
        {nextPage && (
          <div className="flex flex-col md:flex-row mt-8 contributionNavigation mb-4">
            {nextPage && (
              <button
                className={`${ButtonClass()} md:ml-auto bg-gray-600 rounded-full inline-flex gap-1 items-center mt-2 md:mt-0`}
                disabled={page === Page.Share && !contribution?.signature}
                onClick={() => {
                  setPage(nextPage)
                  if (step === "welcome") {
                    setStep("sign")
                  }
                }}
              >
                Next
                <MdArrowForward />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
