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

const SUFFIX_INTERVAL_MS = 650;
const SUFFIX_CYCLE_MS = SUFFIX_INTERVAL_MS * SUFFIXES.length;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
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
    const tFly = tType3 + 1000; 
    const tOverlayOut = tFly + 1000; 
    const tDone = tOverlayOut + 500;

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

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white overflow-hidden select-none transition-opacity duration-700 ${
        stage === 7 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Main Centered Intro Typography */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        style={{
          transform: flying ? "translateY(50px)" : "translateY(0px)",
          opacity: flying ? 0 : 1,
          transition: `transform 1.2s ${EASE}, opacity 0.8s ${EASE}`,
          willChange: "transform, opacity",
        }}
      >
        <div className="flex flex-col items-start w-full max-w-max mx-auto">
          
          {/* Top Line: "You name it." + [Slot Machine] */}
          <div className="flex items-center">
            {/* Swapped text-5xl for text-[6.5vw] to scale flawlessly on mobile */}
            <span className="text-[6.5vw] sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-black whitespace-nowrap">
              You name it.
            </span>
            
            <div 
              className={`transition-all duration-700 flex items-center ease-[cubic-bezier(0.22,1,0.36,1)] ${
                slotMachineVisible ? "max-w-[900px] opacity-100 ml-2 sm:ml-6" : "max-w-0 opacity-0 ml-0"
              }`}
            >
              <div 
                className="bg-[#18181b] px-3 sm:px-10 relative shadow-2xl overflow-hidden flex items-center"
                style={{ 
                  // Updated clamp to map perfectly with the 6.5vw text scale
                  fontSize: "clamp(1.25rem, 6.5vw, 5.5rem)", 
                  borderRadius: "0.35em", 
                  height: "1.4em" 
                }}
              >
                <span className="font-bold tracking-tighter text-transparent select-none pointer-events-none invisible">
                  ecosystems.
                </span>

                <div 
                  className="absolute inset-x-3 sm:inset-x-10 top-0 flex flex-col"
                  style={{ 
                    transform: `translateY(-${suffixIdx * (100 / SUFFIXES.length)}%)`,
                    transition: `transform 250ms ${EASE}` 
                  }}
                >
                  {SUFFIXES.map((word, idx) => (
                    <span 
                      key={idx} 
                      className="font-bold tracking-tighter text-white flex items-center leading-none"
                      style={{ height: "1.4em" }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Line: "We are buildingit." */}
          <div 
            className={`flex items-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              pillRowVisible ? "max-h-[300px] opacity-100 mt-2 sm:mt-6" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            {/* Shifted static margin to dynamic vw margin for mobile */}
            <div className="flex items-center ml-[8vw] sm:ml-28 lg:ml-[11rem]">
              <span className="text-[6.5vw] sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-black flex items-center whitespace-nowrap">
                <span style={{ opacity: typedWords >= 1 ? 1 : 0, transition: `opacity 0.3s ${EASE}` }}>We</span>
                <span style={{ opacity: typedWords >= 2 ? 1 : 0, transition: `opacity 0.3s ${EASE}` }}>&nbsp;are&nbsp;</span>
              </span>

              {/* Logo Image */}
              <div
                className="flex items-center justify-center ml-2"
                style={{
                  opacity: typedWords >= 3 ? 1 : 0,
                  transform: typedWords >= 3 ? "scale(1)" : "scale(0.9)",
                  transition: `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
                }}
              >
                <img 
                  src="/logo.png" 
                  alt="buildingit" 
                  className="h-[8vw] sm:h-24 md:h-28 w-auto object-contain" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}