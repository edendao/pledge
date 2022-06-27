import { Suspense, memo, useCallback, useEffect, useMemo, useRef } from "react"
import { ScissorCanvas, ScissorScene } from "src/components/react-three-scissor"
import { Contribution } from "src/types/common/server-api"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { BlobSingle } from "./BlobSingle"
import { LoadingIndicator } from "./core/LoadingIndicator"
import store from "./react-three-scissor/store"

function BlobContributionsScissorCanvasRenderer({
  contributions,
}: {
  contributions: Contribution[]
}) {
  const contributionIdsAsStrings = contributions.map(c => `${c.id}`)
  const orbit = useRef<OrbitControls>()
  const cb = useCallback(({ camera: genericCamera, element, scene }) => {
    const camera = genericCamera as THREE.PerspectiveCamera

    camera.position.set(2, 2, 2)
    camera.lookAt(0, 0, 0)
    orbit.current = new OrbitControls(camera, element)
    orbit.current.enableZoom = false
    orbit.current.autoRotate = true
    orbit.current.update()

    const bBox = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    bBox.getSize(size)
    const dist = 10 / (2 * Math.tan((camera.fov * Math.PI) / 360))
    const pos = scene.position

    const fac = 1.5
    camera.position.setScalar(dist).multiplyScalar(fac)
    camera.lookAt(pos)
  }, [])

  const blobs = useMemo(
    () =>
      contributions.map(({ id, prompt, sense, response, author }) => (
        <ScissorScene uuid={`${id}`} key={id}>
          <Suspense
            fallback={
              // TODO: this never seems to be triggered
              <LoadingIndicator />
              // <BlobSingle
              //   pattern={pattern}
              //   prompt={prompt}
              //   id={author.id}
              //   response={response}
              //   lowRes
              // />
            }
          >
            <BlobSingle
              pattern={prompt}
              prompt={sense}
              id={author.id}
              response={response}
            />
          </Suspense>
        </ScissorScene>
      )),
    [contributionIdsAsStrings],
  )

  const addInitSubscriber = store(s => s.addInitSubscriber)
  const removeInitSubscriber = store(s => s.removeInitSubscriber)
  useEffect(() => {
    addInitSubscriber(cb, contributionIdsAsStrings)
    return () => removeInitSubscriber(contributionIdsAsStrings)
  }, [])

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ScissorCanvas
        gl={{
          antialias: true,
        }}
        shadows
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          display: "block",
          zIndex: -1,
        }}
      >
        {blobs}
      </ScissorCanvas>
    </Suspense>
  )
}

const MemoizedComponent = memo(BlobContributionsScissorCanvasRenderer)
export default MemoizedComponent
