import { useState } from "react";
import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Overview from "@/pages/Overview";
import IntroSequence from "@/components/IntroSequence";

export default function App() {
  const isPoliciesSubdomain =
    typeof window !== "undefined" &&
    (window.location.hostname.startsWith("policies.") ||
      window.location.hostname.includes("policies"));

  // Check session storage, but automatically bypass intro if landing on the policies subdomain
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== "undefined") {
      const isPolicies =
        window.location.hostname.startsWith("policies.") ||
        window.location.hostname.includes("policies");
      if (isPolicies) return false;
    }
    return sessionStorage.getItem("introSeen") !== "true";
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem("introSeen", "true");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

      <Switch>
        {/* On policies.buildingit.in, root '/' automatically serves the Overview */}
        <Route path="/" component={isPoliciesSubdomain ? Overview : Home} />
        <Route path="/overview" component={Overview} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route>404 Page Not Found</Route>
      </Switch>
    </>
  );
}