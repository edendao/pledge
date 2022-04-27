import React from "react"
import { IoMdClose } from "react-icons/io"
import useOnClickOutside from "src/hooks/useOnClickOutside"
import useToggle from "src/hooks/useToggle"

export default function Footnote({
  children,
  data,
  left,
  topOffset,
}: {
  children: React.ReactChildren
  data: any
  left?: boolean
  topOffset?: number
}) {
  const [isExpanded, toggle] = useToggle()
  const ref = React.useRef(null)

  useOnClickOutside(ref, () => {
    if (isExpanded) {
      toggle()
    }
  })

  return (
    <span
      ref={ref}
      onClick={() => !isExpanded && toggle()}
      className={`footnote ${isExpanded ? "expanded" : ""}`}
    >
      <span className="footnote-text">{children}</span>
      <div
        className={`footnote-content ${
          left ? "footnote-content-left" : "footnote-content-right"
        }`}
        style={{ marginTop: topOffset }}
      >
        {data}
      </div>
      {isExpanded && (
        <div className={`footnote-content-mobile`}>
          <button
            className="absolute"
            style={{ top: "var(--space-12)", right: "var(--space-12)" }}
            onClick={toggle}
          >
            <IoMdClose color="var(--foreground-default)" />
          </button>
          {data}
        </div>
      )}
    </span>
  )
}
