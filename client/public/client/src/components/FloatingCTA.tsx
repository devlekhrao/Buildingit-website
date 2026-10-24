import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

interface FloatingCTAProps {
  onClick: () => void;
}

/**
 * A silver pill CTA that appears after the user scrolls past the hero and
 * follows the viewport in the bottom-right corner.
 */
export default function FloatingCTA({ onClick }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      aria-label="Let's build it"
      className="cta-float cta-enter fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 font-display font-bold text-sm"
    >
      <Rocket className="h-4 w-4" />
      Let's build it
    </button>
  );
}
