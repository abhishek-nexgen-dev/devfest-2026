import { useState, useEffect } from "react";
import { HomePage } from "./pages/Home/HomePage";
import { AgendaPage } from "./pages/Agenda/AgendaPage";
import { DevFestLoader } from "./components/Loader/DevFestLoader";
import { SmoothScroll } from "./components/SmoothScroll";

function App() {
  const [currentView, setCurrentView] = useState<"home" | "agenda">("home");
  const [showLoader, setShowLoader] = useState(() => {
    // Show the intro experience on initial mount unless user has closed or skipped it
    return !sessionStorage.getItem("devfest_loader_seen");
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <>
      {showLoader && (
        <DevFestLoader onComplete={() => setShowLoader(false)} />
      )}

      {currentView === "agenda" ? (
        <AgendaPage onBackToHome={() => setCurrentView("home")} />
      ) : (
        <SmoothScroll>
          <div className="overflow-x-hidden selection:bg-brand-blue selection:text-white">
            <HomePage onOpenAgenda={() => setCurrentView("agenda")} />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
