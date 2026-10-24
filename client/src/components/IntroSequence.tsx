import { useEffect, useRef, useState } from "react";

const SUFFIXES = [
  "tools.",
  "software.",
  "AI.",
  "security.",
  "fintech.",
  "logistics.",
  "platforms.",
  "ecosystems.",
];

type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Slightly extended interval for a more deliberate, readable spin
const SUFFIX_INTERVAL_MS = 750; 
const SUFFIX_CYCLE_MS = SUFFIX_INTERVAL_MS * SUFFIXES.length;

// A custom "spring" bezier that decelerates beautifully and settles smoothly
const EASE_SPRING = "cubic-bezier(0.175, 0.885, 0.32, 1.1)";
const EASE_SMOOTH = "cubic-bezier(0.22, 1, 0.36, 1)";
const TYPE_WORD_MS = 400;

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [stage, setStage] = useState<Stage>(0);
  const [suffixIdx, setSuffixIdx] = useState(0);
  const [typedWords, setTypedWords] = useState(0);
  const [flying, setFlying] = useState(false);
  const completedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const t = timersRef.current;

    const tSuffixStart = 600; 
    const tSuffixEnd = tSuffixStart + SUFFIX_CYCLE_MS; 
    const tBoxHide = tSuffixEnd; 
    const tHeadline = tBoxHide + 600; 
    const tType1 = tHeadline + TYPE_WORD_MS * 1; 
    const tType2 = tHeadline + TYPE_WORD_MS * 2; 
    const tType3 = tHeadline + TYPE_WORD_MS * 3; 
    const tFly = tType3 + 1200; 
    const tOverlayOut = tFly + 800; 
    const tDone = tOverlayOut + 600;

    t.push(setTimeout(() => setStage(1), tSuffixStart));
    t.push(setTimeout(() => setStage(2), tBoxHide));
    t.push(setTimeout(() => setStage(3), tHeadline));
    t.push(setTimeout(() => setTypedWords(1), tType1));
    t.push(setTimeout(() => setTypedWords(2), tType2));
    t.push(setTimeout(() => setTypedWords(3), tType3));
    t.push(setTimeout(() => setStage(6), tFly));
    t.push(setTimeout(() => setFlying(true), tFly + 50));
    t.push(setTimeout(() => setStage(7), tOverlayOut));
    t.push(setTimeout(() => finish(), tDone));

    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage !== 1) return;
    const id = setInterval(() => {
      setSuffixIdx((prev) => {
        if (prev >= SUFFIXES.length - 1) {
          clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, SUFFIX_INTERVAL_MS);
    return () => clearInterval(id);
  }, [stage]);

  const slotMachineVisible = stage === 1;
  const pillRowVisible = stage >= 3;

  // Mathematically derived cylinder geometry
  // For 8 items in a 1.4em high container: radius ≈ (1.4 / 2) / Math.tan(Math.PI / 8) ≈ 1.69em
  const anglePerItem = 360 / SUFFIXES.length;
  const cylinderRadius = "1.7em"; 

  return (
    <>
      <style>{`
        /* Architectural Grid Background (Matched to Home/Privacy) */
        .blueprint-bg {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[100] overflow-hidden select-none transition-opacity duration-1000 bg-black ${
          stage === 7 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 blueprint-bg"></div>

        <div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10"
          style={{
            transform: flying ? "translateY(40px) scale(0.98)" : "translateY(0px) scale(1)",
            opacity: flying ? 0 : 1,
            transition: `transform 1s ${EASE_SMOOTH}, opacity 0.8s ease-out`,
            willChange: "transform, opacity",
          }}
        >
          <div className="flex flex-col items-start w-full max-w-max mx-auto drop-shadow-sm">
            
            <div className="flex items-center">
              <span className="text-[6.5vw] sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white whitespace-nowrap">
                You name it.
              </span>
              
              <div 
                className={`transition-all duration-700 flex items-center ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  slotMachineVisible ? "max-w-[900px] opacity-100 ml-2 sm:ml-5" : "max-w-0 opacity-0 ml-0"
                }`}
              >
                {/* The Polished Black Pill Container - Updated for Architectural Look */}
                <div 
                  className="bg-black border border-white/20 relative flex items-center box-border"
                  style={{ 
                    fontSize: "clamp(1.25rem, 6.5vw, 5.5rem)", 
                    borderRadius: "0.4em",
                    height: "1.45em",
                    perspective: "800px",
                    boxShadow: "inset 0px 8px 16px rgba(0,0,0,0.8)"
                  }}
                >
                  {/* Invisible spacer defines width */}
                  <span className="font-bold tracking-tighter px-4 sm:px-8 text-transparent select-none pointer-events-none invisible">
                    ecosystems.
                  </span>

                  {/* Refined gradient mask for perfect edge blending */}
                  <div 
                    className="absolute inset-0 px-4 sm:px-8"
                    style={{
                      maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, transparent 100%)",
                    }}
                  >
                    <div 
                      className="absolute inset-x-4 sm:inset-x-8 top-0 h-full"
                      style={{ 
                        transformStyle: "preserve-3d",
                        transform: `translateZ(-${cylinderRadius}) rotateX(${suffixIdx * anglePerItem}deg)`,
                        transition: `transform 650ms ${EASE_SPRING}`
                      }}
                    >
                      {SUFFIXES.map((word, idx) => (
                        <span 
                          key={idx} 
                          className="absolute top-0 left-0 w-full h-full font-bold tracking-tighter text-white flex items-center leading-none"
                          style={{ 
                            transform: `rotateX(-${idx * anglePerItem}deg) translateZ(${cylinderRadius})`,
                            backfaceVisibility: "hidden",
                            WebkitFontSmoothing: "antialiased"
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className={`flex items-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                pillRowVisible ? "max-h-[300px] opacity-100 mt-2 sm:mt-5" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="flex items-center ml-[8vw] sm:ml-28 lg:ml-[11rem]">
                <span className="text-[6.5vw] sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white flex items-center whitespace-nowrap">
                  <span style={{ opacity: typedWords >= 1 ? 1 : 0, transform: typedWords >= 1 ? "translateY(0)" : "translateY(10px)", transition: `all 0.4s ${EASE_SMOOTH}` }}>We</span>
                  <span style={{ opacity: typedWords >= 2 ? 1 : 0, transform: typedWords >= 2 ? "translateY(0)" : "translateY(10px)", transition: `all 0.4s ${EASE_SMOOTH}` }}>&nbsp;are&nbsp;</span>
                </span>

                <div
                  className="flex items-center justify-center ml-2"
                  style={{
                    opacity: typedWords >= 3 ? 1 : 0,
                    transform: typedWords >= 3 ? "scale(1)" : "scale(0.85)",
                    transition: `opacity 0.6s ${EASE_SMOOTH}, transform 0.6s ${EASE_SPRING}`,
                  }}
                >
                  <img 
                    src="/logo.png" 
                    alt="buildingit" 
                    className="h-[8vw] sm:h-24 md:h-28 w-auto object-contain invert drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}