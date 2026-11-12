import { useRef, useState } from "react";

import * as ktrack from "@/components/kuroshio/demos/ktrack";
import * as platform from "@/components/kuroshio/demos/platform";
import * as sayit from "@/components/kuroshio/demos/sayit";
import { SceneLoop } from "@/components/kuroshio/demos/SceneLoop";
import { cn } from "@/lib/utils";

const KTRACK_STEPS = ["Inspect", "Certify", "Verify", "Track", "Remind"];

export function KTrackLoop() {
  const [step, setStep] = useState(0);
  const jumpRef = useRef<((index: number) => void) | null>(null);
  return (
    <div className="w-full">
      <SceneLoop
        css={ktrack.CSS}
        height={1136}
        jumpRef={jumpRef}
        label="KTrack in use: an inspector finishes the checklist, the certificate is issued, a phone scans its QR code and shows it is valid, it lands in the certificate register, and the equipment owner gets WhatsApp and email alerts before it expires."
        markup={ktrack.MARKUP}
        onScene={setStep}
        scenes={ktrack.SCENES}
        stillAt={13.5}
        width={1600}
      />
      <ol
        aria-label="KTrack steps"
        className="grid grid-cols-5 gap-2 px-4 pb-3 md:gap-3 md:px-6 md:pb-4"
      >
        {KTRACK_STEPS.map((name, index) => (
          <li key={name}>
            <button
              aria-current={index === step ? "step" : undefined}
              className="group flex w-full cursor-pointer flex-col gap-2 pt-2 pb-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#7FA6F4] active:scale-[0.97] transition-transform duration-150"
              onClick={() => jumpRef.current?.(index)}
              type="button"
            >
              <span className="h-1 w-full bg-white/15 transition-colors duration-200 group-hover:bg-white/30">
                <span
                  className={cn(
                    "block h-full origin-left bg-[#7FA6F4] transition-transform duration-300 ease-out",
                    index === step ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </span>
              <span
                className={cn(
                  "text-[0.8125rem] font-semibold transition-colors duration-300 md:text-[0.9375rem]",
                  index === step
                    ? "text-white"
                    : "text-white/45 group-hover:text-white/80"
                )}
              >
                {name}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PlatformLoop() {
  return (
    <SceneLoop
      css={platform.CSS}
      height={1080}
      label="Kuroshio Platform in use: clamp meters tag the chillers, Chiller 1's energy cost counts up, a vibration alert leads to a logged repair, and the carbon total updates."
      markup={platform.MARKUP}
      scenes={platform.SCENES}
      stillAt={6.2}
      width={1620}
    />
  );
}

export function SayItLoop() {
  return (
    <SceneLoop
      css={sayit.CSS}
      height={1080}
      label="Custom internal tools: a plain sentence typed into a bar becomes a working tool, three times: purchase requests, forklift inspections and an equipment register."
      markup={sayit.MARKUP}
      scenes={sayit.SCENES}
      stillAt={12}
      width={1620}
    />
  );
}
