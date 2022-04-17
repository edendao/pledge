import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import BlobContributionsScissorCanvasRendererWithContributions from "./components/BlobContributionsScissorCanvasRendererWithContributions"
import { LoadingIndicator } from "./components/core/LoadingIndicator"
import { DevelopmentBanner } from "./components/DevelopmentBanner"
import { Navbar } from "./components/Navbar"
import UniverseScene from "./components/UniverseScene"
import { ArweaveProvider } from "./helpers/contexts/ArweaveContext"
import { ContributionsProvider } from "./helpers/contexts/ContributionsContext"
import { ModalProvider } from "./helpers/contexts/ModalContext"
import { StatsProvider } from "./helpers/contexts/StatsContext"
import { UserProvider } from "./helpers/user"
import { About } from "./pages/About"
import { ContributionsPage } from "./pages/ContributionsPage"
import { Main } from "./pages/Main"

function App() {
  return (
    <div className="mainContainer">
      <main>
        {/*<DevelopmentBanner />*/}
        <Navbar />
        <UserProvider>
          <ArweaveProvider>
            <ContributionsProvider>
              <BlobContributionsScissorCanvasRendererWithContributions />
              <ModalProvider>
                <StatsProvider>
                  <Routes>
                    <Route index={true} element={<Main />} />
                    <Route path="about" element={<About />} />
                    <Route
                      path="contributions"
                      element={<ContributionsPage />}
                    />
                    <Route
                      path="contributions/:contributionId"
                      element={<ContributionsPage />}
                    />
                  </Routes>
                </StatsProvider>
              </ModalProvider>
            </ContributionsProvider>
          </ArweaveProvider>
        </UserProvider>
        <footer className="pt-2 pb-16 px-2 text-center">
          <span>
            a drop from <a href="https://twitter.com/TheEdenDao">Eden Dao</a>,
            which is grateful to <a href="https://verses.xyz">Verses</a> for
            their <a href="https://pluriverse.world">Pluriverse</a> 💜
          </span>
        </footer>
      </main>
      <Routes>
        <Route
          index={true}
          element={
            <>
              <div className="canvas-container fadeOutOnScroll fadeInOnTermsOnContributionSection">
                <Suspense fallback={<LoadingIndicator />}>
                  <Canvas
                    camera={{ position: [0, 0, 20], fov: 50 }}
                    frameloop="demand"
                  >
                    <UniverseScene />
                  </Canvas>
                </Suspense>
              </div>
            </>
          }
        />
        <Route path="about" />
        <Route path="contributions/*" />
      </Routes>
      <div className="universe-gradient" />
    </div>
  )
}

export default App
