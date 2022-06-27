import { RefObject } from "react"

import useEventListener from "./useEventListener"

// FROM: https://usehooks-ts.com/react-hook/use-on-click-outside

type Handler = (event: MouseEvent) => void

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown",
): void {
  useEventListener(mouseEvent, event => {
    if (ref.current && !ref.current?.contains(event.target as Node)) {
      handler(event)
    }
  })
}
