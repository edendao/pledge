import { useEffect, useState } from "react"

export default function useScroll() {
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect(),
  )
  const [scrollY, setScrollY] = useState(bodyOffset.top)
  const [scrollX, setScrollX] = useState(bodyOffset.left)
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">()
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollingTimer, setScrollingTimer] = useState<NodeJS.Timeout>()

  // from: https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
  const listener = () => {
    if (scrollingTimer) {
      window.clearTimeout(scrollingTimer)
    }

    setIsScrolling(true)
    setScrollingTimer(
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000),
    )

    setBodyOffset(document.body.getBoundingClientRect())
    setScrollY(window.scrollY)
    setScrollX(window.scrollX)
    setScrollDirection(lastScrollTop > window.scrollY ? "down" : "up")
    setLastScrollTop(window.scrollY)
    setScrollPercentage(getScrollPercent())
  }

  useEffect(() => {
    window.addEventListener("scroll", listener)
    return () => window.removeEventListener("scroll", listener)
  }, [])

  return {
    scrollY,
    scrollX,
    scrollDirection,
    scrollPercentage,
    isScrolling,
  }
}

// from: https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
function getScrollPercent() {
  const h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight"
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
}
