import { ScissorWindow } from "src/components/react-three-scissor"

export default function BlobSingleScissorWindow({ id }: { id: number }) {
  return (
    <ScissorWindow style={{ width: "100%", height: "156px" }} id={`${id}`} />
  )
}
