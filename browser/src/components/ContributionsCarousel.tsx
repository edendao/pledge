import "./ContributionsCarousel.css"

import { useRef } from "react"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { useInView } from "react-intersection-observer"
import { Contribution } from "src/types/common/server-api"

import { ContributionCard } from "./ContributionCard"

function CarouselArrow({
  left = false,
  onPress,
}: {
  left?: boolean
  onPress: () => void
}) {
  return (
    <button onClick={onPress} className="carouselArrowButton">
      {left ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
    </button>
  )
}

export default function ContributionsCarousel({
  contributions,
  className,
}: {
  contributions: Contribution[]
  className?: string
}) {
  const overflowContainerRef = useRef<HTMLDivElement>(null)
  const amountToScrollBy = 600

  const onLeftPress = () => {
    overflowContainerRef?.current?.scrollBy({
      left: -amountToScrollBy,
      behavior: "smooth",
    })
  }

  const onRightPress = () => {
    overflowContainerRef?.current?.scrollBy({
      left: amountToScrollBy,
      behavior: "smooth",
    })
  }

  const [leftInvisiblePixelRef, hideLeftControl] = useInView({
    root: overflowContainerRef.current,
    rootMargin: "15px",
  })

  const [rightInvisiblePixelRef, hideRightControl] = useInView({
    root: overflowContainerRef.current,
    rootMargin: "15px",
  })

  const carouselEdgeName =
    (hideLeftControl ? "left" : "") + (hideRightControl ? "right" : "")

  return (
    <div style={{ position: "relative" }} className={className ?? ""}>
      {!hideLeftControl && (
        <>
          <div
            style={{ position: "absolute", top: "40%", left: -30, zIndex: 10 }}
          >
            <CarouselArrow left onPress={onLeftPress} />
          </div>
        </>
      )}
      <div
        className={`flex flex-row carouselOverflowContainer ${carouselEdgeName} px-8`}
        style={{ marginLeft: -32 }}
        ref={overflowContainerRef}
      >
        <div style={{ display: "flex" }}>
          <div ref={leftInvisiblePixelRef} />
          {contributions.map(contribution => (
            <div
              key={contribution.id}
              className="mr-4"
              style={{ scrollSnapAlign: "start" }}
            >
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
              />
            </div>
          ))}
          <div ref={rightInvisiblePixelRef} />
        </div>
      </div>
      {!hideRightControl && (
        <>
          <div
            style={{ position: "absolute", top: "40%", right: -30, zIndex: 11 }}
          >
            <CarouselArrow onPress={onRightPress} />
          </div>
        </>
      )}
    </div>
  )
}
