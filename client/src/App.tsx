import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      {/* Fallback route */}
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}