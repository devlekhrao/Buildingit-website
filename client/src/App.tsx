import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Overview from "@/pages/Overview";
import IntroSequence from "@/components/IntroSequence"; // Update path if necessary

export default function App() {
  // Check if we've already seen the intro this session
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem("introSeen") !== "true";
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem("introSeen", "true");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
      
      {/* We can hide the main app slightly or let it mount in the background 
          while the intro plays on top (since IntroSequence has z-[100] and fixed inset-0) */}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/overview" component={Overview} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route>404 Page Not Found</Route>
      </Switch>
    </>
  );
}