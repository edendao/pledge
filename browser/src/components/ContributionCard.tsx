import "./ContributionCard.css"

import { OrbitControls } from "@react-three/drei/core/OrbitControls"
import { Canvas } from "@react-three/fiber"
import dayjs from "dayjs"
import { Suspense, useContext, useState } from "react"
import { BiCheck, BiLink } from "react-icons/bi"
import { BlobSingle } from "src/components/BlobSingle"
import { ModalContext } from "src/helpers/contexts/ModalContext"
import { getContributionLink } from "src/helpers/contributions"
import { getPatternPlaceholder } from "src/types"
import {
  Contribution,
  PatternToDisplay,
  Prompt,
} from "src/types/common/server-api"

import BlobSingleScissorWindow from "./BlobSingleScissorWindow"
import BlobsPostProcessing from "./BlobsPostProcessing"
import {
  Placeholder,
  PromptDescriptions,
  replaceAllJSX,
  replaceJSX,
} from "./ContributionSection"
import { LoadingIndicator } from "./core/LoadingIndicator"
import { getDisplayForAuthor } from "./SignatureContent"

interface Props {
  contribution: Contribution
  hideHeader?: boolean
  isCompact?: boolean
  className?: string
  renderCanvas?: boolean
  full?: boolean
}

export function getFullContributionResponse({
  response,
  prompt,
  pattern,
}: Contribution) {
  return (
    PromptDescriptions[prompt].replace(
      `{${Placeholder}}`,
      getPatternPlaceholder(pattern, prompt),
    ) +
    " " +
    response
  )
}

export function getContributionCardResponse({
  response,
  prompt,
  pattern,
}: Contribution) {
  if (!response) {
    return response
  }

  switch (prompt) {
    case Prompt.LooksLike:
    case Prompt.WeNeed:
    case Prompt.Example:
      return (
        <>
          {replaceJSX(PromptDescriptions[prompt], {
            [Placeholder]: <b>{getPatternPlaceholder(pattern, prompt)}</b>,
          })}{" "}
          {response}
        </>
      )
    // TODO: this doesn't replace with the right case from before.
    case Prompt.FreeForm:
      return replaceAllJSX(
        response,
        PatternToDisplay[pattern],
        <b>{PatternToDisplay[pattern]}</b>,
        { ignoreCase: true, includePlaceholder: false },
      )
  }
}

export function CopyLink({ content }: { content: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      className="link"
      onClick={e => {
        e.stopPropagation()
        navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }}
    >
      Copy Link
      {copied ? <BiCheck color="#34eb61" /> : <BiLink />}
    </button>
  )
}

export function ContributionCard({
  contribution,
  hideHeader = true,
  className = "",
  renderCanvas,
  full,
}: Props) {
  const { author, response, prompt, pattern, createdAt, id } = contribution

  const authorDisplay = getDisplayForAuthor(author, true)
  const date = dayjs(createdAt, { utc: true })
  const dateDisplay = date.format("MMM, YYYY")
  const contributionLink = getContributionLink(contribution)
  const { openContributionModal, openContributionId } = useContext(ModalContext)

  return (
    <div
      className={`compactContributionCardContainer ${className} ${
        full ? "full" : ""
      } ${
        contribution && openContributionId === contribution.id
          ? "selectedBorder"
          : ""
      }
 `}
      onClick={() =>
        id
          ? openContributionModal(contribution, window.location.pathname)
          : null
      }
    >
      {!hideHeader && (
        <h2 className="text-2xl font-bold">{PatternToDisplay[pattern]}</h2>
      )}
      {/* actual response */}
      <p className="h-full overflow-y-auto mb-32 response">
        {getContributionCardResponse(contribution)}
      </p>
      {/* auttribution */}
      <div className="w-full attribution">
        {id !== undefined && <CopyLink content={contributionLink} />}
        <div className="spacer" />
        <div className="author-section ml-auto inline">
          <div className="author text-color-purple-200">{authorDisplay}</div>
          <p>{dateDisplay}</p>
        </div>
      </div>
      {/* blob container */}
      <div
        style={{
          height: "96px",
          width: "96px",
          top: "calc(50% + 24px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
        }}
        className="absolute"
        onClick={e => e.stopPropagation()}
      >
        {id === undefined || renderCanvas ? (
          <Suspense fallback={<LoadingIndicator />}>
            <Canvas
              frameloop="demand"
              camera={{ position: [0, 0, 14], fov: 50 }}
              style={{ cursor: "pointer" }}
            >
              <OrbitControls
                autoRotate={true}
                autoRotateSpeed={5}
                enableZoom={false}
              />
              <BlobSingle
                pattern={pattern}
                prompt={prompt}
                walletId={author.walletId}
                response={response}
              />
              {/* <BlobsPostProcessing includeBloom={false} /> */}
            </Canvas>
          </Suspense>
        ) : (
          <BlobSingleScissorWindow id={id} />
        )}
      </div>
    </div>
  )
}
