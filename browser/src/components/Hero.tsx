import "./Hero.css"

export default function Hero() {
  return (
    <div className="hero fadeInDown flex flex-col items-center justify-center mt-36">
      <h1
        className="text-3xl text-center md:text-8xl m-0"
        style={{ fontFamily: "Cosplay" }}
      >
        Dao De Eden
      </h1>
      <h2
        className="text-5xl text-center md:text-5xl py-4"
        style={{ fontWeight: 700 }}
      >
        is the Virtuous Way towards Eden,
      </h2>
      <h2 className="text-5xl text-center m-0 max-w-2xl">
        towards reconnection, regeneration, harmony, and flourishing.
      </h2>
    </div>
  )
}
