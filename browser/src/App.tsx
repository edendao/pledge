import { lazy, Suspense } from "react";
const Canvas = lazy(() =>
  import("@react-three/fiber").then((module) => ({ default: module.Canvas }))
);
import UniverseScene from "./components/UniverseScene";
import GradientManager from "./components/GradientManager";
import { DevelopmentBanner } from "./components/DevelopmentBanner";
import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { ContributionsPage } from "./pages/ContributionsPage";
import { Navbar } from "./components/Navbar";
import { Main } from "./pages/Main";
import { UserProvider } from "./helpers/user";
import { ArweaveProvider } from "./helpers/contexts/ArweaveContext";
import { LoadingIndicator } from "./components/core/LoadingIndicator";

function App() {
  return (
    <div className="mainContainer">
      <main>
        <DevelopmentBanner />
        <Navbar />
        <UserProvider>
          <ArweaveProvider>
            <Routes>
              <Route index={true} element={<Main />} />
              <Route path="about" element={<About />} />
              <Route path="contributions" element={<ContributionsPage />} />
              <Route
                path="contributions/:contributionId"
                element={<ContributionsPage />}
              />
            </Routes>
          </ArweaveProvider>
        </UserProvider>
        <footer className="pt-2 pb-16">
          <span>
            a drop from <a href="https://verses.xyz">Verses</a>, which is
            supported with 💜&nbsp; by <a href="https://gitcoin.co">Gitcoin</a>{" "}
            and <a href="https://fil.org/">Filecoin Foundation</a>
          </span>
        </footer>
      </main>
      <Routes>
        <Route
          index={true}
          element={
            <>
              <GradientManager />
              <div className="canvas-container fadeOutOnScroll fadeInOnTermsOnContributionSection">
                <Suspense fallback={null}>
                  <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
                    <UniverseScene />
                  </Canvas>
                </Suspense>
              </div>
            </>
          }
        />
        <Route path="about" element={<GradientManager />} />
        <Route path="contributions*" element={<GradientManager />} />
      </Routes>
    </div>
  );
}

export default App;
