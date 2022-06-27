import { useEffect, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useCombinedRefs<T>(...refs: any[]) {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return
      ref.current = targetRef.current
    })
  }, [refs])

  return targetRef
}
