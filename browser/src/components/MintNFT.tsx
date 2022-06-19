/* eslint-disable prettier/prettier */
import axios from "axios"
import React, { useRef, useState, useMemo, useCallback, useEffect } from "react"
import { Image, Layer, Stage } from "react-konva"
import useCanvasImage from "use-image"
import Webcam from "react-webcam"
import { useBoolean } from "ahooks"

export const PixelMeClient = axios.create({
  baseURL: "http://localhost:7069/",
})

export const MintNFT: React.FC<{ size: number }> = props => {
  const [image, setImage] = useState<string>("")
  const [omnidriveState, setOmnidriveState] = useState<
    "ready" | "selected" | "detecting" | "converting" | "complete"
  >("ready")
  const [canvasImage] = useCanvasImage(image)
  const [canvasClouds] = useCanvasImage("/assets/eden-dao-orb.png")
  const stage = useRef(null)
  const { size = 256 } = props

  const {
    ref: webcamRef,
    capture,
    setCameraError,
    setCameraOnline,
  } = useCamera(setImage)
  const { FileInput, selectFile } = useBase64ImageFile(setImage)

  useEffect(() => {
    if (omnidriveState === "ready" && image.length > 0) {
      setOmnidriveState("selected")
    }
  }, [omnidriveState, image])

  useEffect(() => {
    let newNavigator: any;

    // eslint-disable-next-line prefer-const
    newNavigator = window.navigator;

    if (newNavigator && newNavigator.share) {
      if (newNavigator.getUserMedia) {
        newNavigator.getUserMedia = (
          newNavigator.getUserMedia ||
          newNavigator.webkitGetUserMedia ||
          newNavigator.mozGetUserMedia)

        getCamPermission(newNavigator)
      }
    }
  }, [])


  const sendBase64 = async () => {
    try {
      const slicedImage = image.slice(image.indexOf(",") + 1)
      setOmnidriveState("selected")
      const result = await PixelMeClient.post("convert", {
        image: slicedImage,
      })
      const header = "data:image/gif;base64,"
      const base64 = result.data.images[2].image
      setImage(header + base64)
      setOmnidriveState("complete")
    } catch (error) {
      console.log(error)
    }
  }

  function useBase64ImageFile(setImage) {
    const ref = useRef<HTMLInputElement>(null)
    const setFile = useCallback(
      event => {
        const reader = new FileReader()
        reader.onload = event => {
          const base64 = event?.target?.result
          setImage(base64)
        }
        reader.readAsDataURL(event.target.files[0])
      },
      [setImage],
    )
    const FileInput = useCallback(
      () => (
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={setFile}
          style={{ display: "none" }}
        />
      ),
      [setFile],
    )

    const selectFile = useCallback(() => {
      ref.current?.click()
    }, [ref])

    return { FileInput, selectFile }
  }

  const canvasImageProps = useMemo(() => {
    console.log("canvas image", canvasImage)
    if (!canvasImage) return {}

    const { naturalHeight, naturalWidth } = canvasImage

    let opacity = 0.7
    let x = 0
    let y = 0
    let height = size
    let width = (size * naturalWidth) / naturalHeight

    if (omnidriveState === "complete") {
      opacity = 1
      height *= 0.85
      width *= 0.85
      y = 0.15 * size
    }
    x = width < size ? (size - width) / 2 : 0

    return { opacity, height, width, x, y }
  }, [omnidriveState, size, canvasImage])

  return (
    <div className="container">
      <div className="w-[256]">
        <Webcam
          style={{ display: image ? "none" : "block" }}
          mirrored
          height={size}
          width={size}
          videoConstraints={{ facingMode: "user", width: size, height: size }}
          ref={webcamRef}
          screenshotQuality={1}
          screenshotFormat="image/png"
          onUserMedia={setCameraOnline}
          onUserMediaError={setCameraError}
        />
      </div>
      {image && (
        <Stage width={size} height={size} ref={stage}>
          {omnidriveState === "selected" ? (
            <Layer imageSmoothingEnabled={false}>
              <Image image={canvasImage} alt="face" {...canvasImageProps} />
            </Layer>
          ) : (
            <Layer
              imageSmoothingEnabled={false}
              clipFunc={ctx => {
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false)
              }}
            >
              <Image
                image={canvasClouds}
                alt="dream"
                height={size}
                width={size}
              />
              <Image image={canvasImage} alt="face" {...canvasImageProps} />
            </Layer>
          )}
        </Stage>
      )}
      <div className="mt-5 flex justify-center" >
        <button
          onClick={capture}
          className="bg-white opacity-40 m-1	 hover:opacity-75 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded-2xl shadow"
        >
          Take Photo
        </button>
        <button
          onClick={sendBase64}
          className="bg-white opacity-40 m-1	 hover:opacity-75 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded-2xl shadow"
        >
          send
        </button>
        <button
          onClick={selectFile}
          className="bg-white opacity-40 m-1	 hover:opacity-75 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded-2xl shadow"
        >
          select file
        </button>

        <FileInput />
      </div>
    </div>
  )
}

const useCamera = (setImage: {
  (value: React.SetStateAction<string>): void
  (arg0: string): void
}) => {
  const [isCameraOnline, { setTrue: setCameraOnline }] = useBoolean(false)
  const [isCameraError, { setTrue: setCameraError }] = useBoolean(false)

  const ref = useRef<Webcam>(null)
  const capture = useCallback(() => {
    setImage(ref.current?.getScreenshot() ?? "")
  }, [ref, setImage])

  return {
    ref,
    capture,
    isCameraError,
    isCameraOnline,
    setCameraOnline,
    setCameraError,
  }
}

const getCamPermission = (newNavigator) => {
  if (newNavigator.mediaDevices.getUserMedia !== null) {
    newNavigator.mediaDevices
      // eslint-disable-next-line prettier/prettier
      .getUserMedia({ video: true, audio: false })
      .then(() => {
        console.log('got stream')
      })
      .catch((e) => {
        console.log(e)
        console.log('error getting stream')
      })

  }
}