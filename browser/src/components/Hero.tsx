import "./Hero.css"

export default function Hero() {
  return (
    <div>
      <div className="hero fadeInDown flex flex-col items-center justify-center mt-36">
        {/* <div className="versesLogoContainer">
          <a href="https://verses.xyz">
            <img
              className="w-24 h-24 md:w-32 md:h-32 mb-2"
              src="/verses-logo.svg"
            />
          </a>
        </div> */}
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
          is the Way and Virtue of Eden
        </h2>
        <h2 className="text-5xl text-center m-0">
          towards reconnection, regeneration, harmony, and flourishing.
        </h2>
      </div>
    </div>
  )
}
