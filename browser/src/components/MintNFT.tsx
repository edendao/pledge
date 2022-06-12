/* eslint-disable prettier/prettier */
// import "./PledgeBody.css"
import axios from "axios"
import React, { useRef, useState, useMemo, useCallback } from 'react'
import { Image, Layer, Stage } from "react-konva"
import useCanvasImage from "use-image"
import Webcam from "react-webcam"
import { useBoolean } from "ahooks"





export const MintNFT: React.FC<{ size: number }> = ({ size = 256 }) => {
  const [image, setImage] = useState('base64')
  const [omnidriveState, setOmnidriveState] = useState('ready')
  const [canvasImage] = useCanvasImage(image)
  const [canvasClouds] = useCanvasImage("/assets/eden-dao-orb.png")
  const stage = useRef(null)

  const PixelMeClient = axios.create({
    baseURL: "http://localhost:7069/",
  })



  const {
    ref: webcamRef,
    capture,
    setCameraError,
    setCameraOnline,
  } = useCamera(setImage)
  const { FileInput, selectFile } = useBase64ImageFile(setImage)

  const sendBase64 = async (base64Image) => {

    PixelMeClient.post("detect", {
      image: image.slice(image.indexOf(",") + 1)

    }).then((data: any) => {
      const header = "data:image/gif;base64,"
      const base64 = data.data.images[2].image
      setImage(header + base64)
      setOmnidriveState('complete')
    })

  }


  function useBase64ImageFile(setImage) {
    const ref = useRef<HTMLInputElement>(null)


    const setFile = useCallback(
      (event) => {
        const reader = new FileReader()
        reader.onload = (event) => {
         if(event.target){
          const base64 = event?.target.result
          setImage(base64)
         }
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
      if(ref.current){
        ref.current?.click()
      }
    }, [ref])

    return { FileInput, selectFile }
  }

  const canvasImageProps = useMemo(() => {
    console.log('canvas image', canvasImage)
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
    <div>
      <button onClick={capture}>
        Take Photo

      </button>
      <button onClick={sendBase64}>
        send
      </button>
      <button onClick={selectFile}>
        select file
      </button>
      <FileInput />

      {/* <Webcam
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
      /> */}
      {image && (
        <Stage ref={stage}>
          {omnidriveState === "selected" ? (
            <Layer imageSmoothingEnabled={false}>
              <Image image={canvasImage} alt="face" {...canvasImageProps} />
            </Layer>
          ) : (
            <Layer
              imageSmoothingEnabled={false}
              clipFunc={(ctx) => {
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