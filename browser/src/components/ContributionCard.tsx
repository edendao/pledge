import "./ContributionCard.css"

import { OrbitControls } from "@react-three/drei/core/OrbitControls"
import { Canvas } from "@react-three/fiber"
import dayjs from "dayjs"
import { Suspense } from "react"
import { BlobSingle } from "src/components/BlobSingle"
import { Contribution } from "src/types/common/server-api"

import BlobSingleScissorWindow from "./BlobSingleScissorWindow"
import { Checkmark } from "./core/Checkmark"
import { LoadingIndicator } from "./core/LoadingIndicator"

interface Props {
  contribution: Contribution
  className?: string
}

export function ContributionCard({ contribution, className = "" }: Props) {
  const { id, author, response, prompt, sense, signature, createdAt } =
    contribution

  const date = dayjs(createdAt, { utc: true })
  const dateDisplay = date.format("MMM, YYYY")

  return (
    <div className={`compactContributionCardContainer ${className}`}>
      <p className="text-2xl h-full overflow-y-auto mb-24 response">
        {response}
      </p>
      <div className="w-full attribution">
        <div className="author-section ml-auto inline">
          <div className="author text-color-purple-200">
            <div className="authorWrapper">
              <a
                role="button"
                className="authorButton"
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
              >
                {author.twitter}
              </a>
              {!!signature && (
                <span
                  className="ml-1"
                  style={{ top: "-3px", position: "relative" }}
                >
                  <Checkmark />
                </span>
              )}
            </div>
          </div>
          <p>{dateDisplay}</p>
        </div>
      </div>
      {/* blob container */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% + 36px)",
          left: "50%",
          height: "128px",
          width: "128px",
          transform: "translate(-50%, -50%)",
        }}
      >
        {id === 0 ? (
          <Suspense fallback={<LoadingIndicator />}>
            <Canvas
              frameloop="demand"
              camera={{ position: [0, 0, 14], fov: 50 }}
            >
              <OrbitControls
                autoRotate={true}
                autoRotateSpeed={5}
                enableZoom={false}
              />
              <BlobSingle
                pattern={sense}
                prompt={prompt}
                id={author.id}
                response={response}
              />
            </Canvas>
          </Suspense>
        ) : (
          <BlobSingleScissorWindow id={id} />
        )}
      </div>
    </div>
  )
}
