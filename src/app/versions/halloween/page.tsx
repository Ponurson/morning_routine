"use client";

import Link from "next/link";
import { Baloo_2, Nunito } from "next/font/google";
import { useMemo, useState } from "react";
import type { CSSProperties, ReactElement } from "react";

const heading = Baloo_2({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type IconName =
  | "ghost"
  | "cauldron"
  | "fangs"
  | "hat"
  | "candy"
  | "lantern";

type IconProps = {
  className?: string;
};

type RoutineStep = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  gradient: string;
};

const ROUTINE_STEPS: RoutineStep[] = [
  {
    id: "wake",
    title: "Obudź małego duszka",
    description:
      "Rozciągnij skrzydła nietoperza, weź głęboki oddech i przepędź noc.",
    icon: "ghost",
    gradient: "from-[#3d1b47] via-[#4b213d] to-[#ff7a18]",
  },
  {
    id: "pee",
    title: "Przystanek w tajnej pieczarze",
    description:
      "Pluskaj jak wodny stworek i zostaw za sobą bąbelkowy ślad.",
    icon: "cauldron",
    gradient: "from-[#1f2c3a] via-[#233a42] to-[#ff8400]",
  },
  {
    id: "wash",
    title: "Wypoleruj kły",
    description:
      "Wyszczotkuj upiorne zęby i zabłyśnij niczym gwiazda północy.",
    icon: "fangs",
    gradient: "from-[#23303d] via-[#36285a] to-[#ff6f61]",
  },
  {
    id: "dress",
    title: "Załóż halloweenowy kostium",
    description:
      "Zwiąż pelerynę, napompuj kapelusz i szykuj się na psikusy.",
    icon: "hat",
    gradient: "from-[#2c1f3a] via-[#4d205a] to-[#ff9b54]",
  },
  {
    id: "eat",
    title: "Potworne śniadanie mocy",
    description: "Chrupnij dyniowe płatki i popij żarzącą miksturę.",
    icon: "candy",
    gradient: "from-[#4b1d2f] via-[#7a1d35] to-[#ff6f00]",
  },
  {
    id: "bag",
    title: "Spakuj torbę na psikusy",
    description:
      "Schowaj kredki, maski i ukochanego kłapouchego przyjaciela.",
    icon: "lantern",
    gradient: "from-[#1f1f3a] via-[#352455] to-[#ff8e32]",
  },
];

type SliderState = Record<string, number>;

const confettiColors = [
  "#ff7a18",
  "#ffbb33",
  "#f25f5c",
  "#7c3aed",
  "#4c1d95",
  "#ff9f1c",
];

type ConfettiStyle = CSSProperties &
  Record<"--i" | "--confetti-color", string>;

type SliderStyle = CSSProperties & { "--progress": string };

const SLIDER_MAX = 100;

const STEP_ICONS: Record<IconName, (props: IconProps) => ReactElement> = {
  ghost: GhostIcon,
  cauldron: CauldronIcon,
  fangs: FangsIcon,
  hat: WitchHatIcon,
  candy: CandyIcon,
  lantern: LanternIcon,
};

const createInitialSliderState = (): SliderState =>
  Object.fromEntries(ROUTINE_STEPS.map((step) => [step.id, 0]));

const snapSliderValue = (value: number) => {
  if (value <= 5) return 0;
  if (value >= 95) return SLIDER_MAX;
  return value;
};

function StepIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}): ReactElement {
  const IconComponent = STEP_ICONS[name];
  return <IconComponent className={className} />;
}

export default function HalloweenVersion() {
  const [sliderState, setSliderState] = useState<SliderState>(() =>
    createInitialSliderState()
  );

  const completedCount = useMemo(
    () =>
      ROUTINE_STEPS.filter((step) => sliderState[step.id] >= SLIDER_MAX)
        .length,
    [sliderState]
  );

  const progressPercent = Math.round(
    (completedCount / ROUTINE_STEPS.length) * 100
  );
  const allDone = completedCount === ROUTINE_STEPS.length;

  const handleSliderChange = (id: string, value: number) => {
    setSliderState((prev) => ({ ...prev, [id]: snapSliderValue(value) }));
  };

  const resetSteps = () => {
    setSliderState(createInitialSliderState());
  };

  return (
    <div className={`${heading.variable} ${body.variable} halloween-root`}>
      <style>{`
        .halloween-root {
          font-family: var(--font-body), "Nunito", "Segoe UI", sans-serif;
        }
        .halloween-root .font-heading {
          font-family: var(--font-heading), "Baloo 2", "Segoe UI", cursive;
        }
        .reward-confetti {
          pointer-events: none;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .reward-confetti span {
          position: absolute;
          width: 12px;
          height: 24px;
          border-radius: 9999px;
          opacity: 0;
          transform: translate3d(0, 20px, 0) rotate(0deg);
          background: var(--confetti-color);
          animation: confetti-pop 3.6s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.15s);
        }
        @keyframes confetti-pop {
          0% {
            opacity: 0;
            transform: translate3d(0, 40px, 0) rotate(-8deg);
          }
          20% {
            opacity: 1;
            transform: translate3d(-6px, 0, 0) rotate(8deg);
          }
          50% {
            opacity: 0.9;
            transform: translate3d(12px, -50px, 0) rotate(-12deg);
          }
          100% {
            opacity: 0;
            transform: translate3d(-12px, -90px, 0) rotate(16deg);
          }
        }
        .step-slider {
          appearance: none;
          width: 100%;
          height: 32px;
          background: transparent;
          cursor: pointer;
          --progress: 0%;
        }
        .step-slider:focus-visible {
          outline: none;
        }
        .step-slider::-webkit-slider-runnable-track {
          height: 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 159, 28, 0.4);
          background: linear-gradient(
            90deg,
            #ff9f1c var(--progress),
            #1c1230 var(--progress)
          );
        }
        .step-slider::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: #2b1733;
          border: 3px solid #ff7a18;
          box-shadow: 0 8px 20px rgba(255, 122, 24, 0.35);
          margin-top: -8px;
          transition: transform 0.2s ease;
        }
        .step-slider:active::-webkit-slider-thumb {
          transform: scale(1.05);
        }
        .step-slider::-moz-range-track {
          height: 14px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 159, 28, 0.4);
          background: #1c1230;
        }
        .step-slider::-moz-range-progress {
          height: 14px;
          border-radius: 9999px;
          background: #ff9f1c;
        }
        .step-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: #2b1733;
          border: 3px solid #ff7a18;
          box-shadow: 0 8px 20px rgba(255, 122, 24, 0.35);
          transition: transform 0.2s ease;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0a1a] via-[#1a0f2d] to-[#2d132c] text-[#f4f1ff]">
        <FloatingBackground />

        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col gap-9 px-4 pb-24 pt-14 sm:px-6">
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-[#ff9f1c]/40 bg-[#1b142a]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#ffb347] shadow-md shadow-[#ff7a18]/20 backdrop-blur transition hover:bg-[#2b1733]"
            >
              Wróć do aktualnej wersji
            </Link>
          </div>
          <header className="flex items-center gap-4 rounded-[36px] border border-[#ff9f1c]/20 bg-[#1b142a]/80 px-6 py-6 shadow-xl shadow-[#ff7a18]/10 backdrop-blur-md sm:gap-6 sm:px-8">
            <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
              <MorningBuddyIllustration />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff9f1c]">
                Dobry wieczór, mały potworku!
              </span>
              <h1 className="font-heading text-3xl font-semibold leading-tight text-[#fef3c7] sm:text-4xl">
                Halloweenowa misja poranka
              </h1>
              <p className="text-sm text-[#d1c7ff] sm:text-base">
                Przesuwaj karty, aby rozświetlić nawiedzony poranek.
              </p>
            </div>
          </header>

          <section className="rounded-[34px] border border-[#ff9f1c]/25 bg-[#1f1a30]/70 px-6 py-6 shadow-lg shadow-[#000]/40 backdrop-blur-md sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ff6f00]">
                  Postęp rytuału
                </p>
                <p className="font-heading text-2xl font-semibold text-[#fef3c7]">
                  {completedCount} / {ROUTINE_STEPS.length} kroków
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#ff9f1c]/70 to-[#ff6f61]/70 text-xl font-semibold text-[#2b132c] shadow-inner">
                {progressPercent}%
              </div>
            </div>
            <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-[#2b213d]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff9f1c] via-[#ff6f61] to-[#7c3aed] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
                aria-hidden
              />
            </div>
          </section>

          <section className="flex flex-col gap-4">
            {ROUTINE_STEPS.map((step, index) => {
              const sliderProgress = sliderState[step.id];
              const isComplete = sliderProgress >= SLIDER_MAX;
              const sliderId = `routine-slider-${step.id}`;
              const sliderStyle: SliderStyle = {
                "--progress": `${sliderProgress}%`,
              };
              return (
                <article
                  key={step.id}
                  aria-live="polite"
                  className={`group relative flex flex-col gap-4 rounded-[34px] border-2 px-5 py-5 text-left shadow-lg transition-all duration-300 sm:flex-row sm:items-center sm:px-6 sm:py-6 ${
                    isComplete
                      ? "border-transparent bg-gradient-to-br from-[#3b1d4f] via-[#51235e] to-[#ff7a18] text-[#fff8dc]"
                      : "border-[#ff9f1c]/20 bg-[#1c1530]/80 text-[#f4f1ff] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,122,24,0.25)]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-[26px] bg-gradient-to-br text-3xl shadow-md transition-transform duration-300 sm:h-20 sm:w-20 sm:text-4xl ${step.gradient}`}
                    >
                      <StepIcon
                        name={step.icon}
                        className="h-10 w-10 text-[#fff8dc] drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#ffb347]">
                        Krok rytuału {index + 1}
                      </p>
                      <h2 className="font-heading text-xl font-semibold text-[#fff1d6] sm:text-2xl">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm text-[#d6c7ff] sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:ml-auto sm:w-[220px]">
                    <label
                      htmlFor={sliderId}
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffa94d]"
                    >
                      Przesuń suwak, aby {isComplete ? "cofnąć" : "domknąć"}{" "}
                      rytuał
                    </label>
                    <input
                      id={sliderId}
                      type="range"
                      min={0}
                      max={SLIDER_MAX}
                      step={5}
                      value={sliderProgress}
                      onChange={(event) =>
                        handleSliderChange(step.id, Number(event.target.value))
                      }
                      className="step-slider"
                      style={sliderStyle}
                      aria-valuetext={
                        isComplete
                          ? "Krok ukończony"
                          : `Upiorny postęp ${sliderProgress} procent`
                      }
                    />
                  </div>
                </article>
              );
            })}
          </section>

          <section className="relative mt-4">
            {allDone ? (
              <RewardCard onReset={resetSteps} />
            ) : (
              <div className="rounded-[34px] border-2 border-dashed border-[#ff9f1c]/30 bg-[#1a1126]/80 px-6 py-8 text-center shadow-inner shadow-[#000]/40 backdrop-blur-sm sm:px-8">
                <p className="font-heading text-xl text-[#ff9f1c] sm:text-2xl">
                  Ukończ każdy krok rytuału, aby odblokować dyniową nagrodę!
                </p>
                <p className="mt-2 text-sm text-[#d6c7ff] sm:text-base">
                  Każde przesunięcie rozsypuje świecący w ciemności pył po
                  całej kryjówce.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

type RewardCardProps = {
  onReset: () => void;
};

function RewardCard({ onReset }: RewardCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-[#ff9f1c]/30 bg-gradient-to-br from-[#1f0f1f] via-[#351a3d] to-[#ff7a18] px-6 py-9 text-center shadow-2xl shadow-[#ff7a18]/20 backdrop-blur sm:px-10">
      <RewardConfetti />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.5em] text-[#ffd166]">
          Dyniowa nagroda odblokowana
        </span>
        <PumpkinBadgeIcon className="h-16 w-16 text-[#fff1d6]" />
        <h3 className="font-heading text-3xl font-semibold text-[#fff1d6] sm:text-4xl">
          Bohater północy!
        </h3>
        <p className="text-sm text-[#f4f1ff] sm:text-base">
          Każde upiorne zadanie wykonane ? czas zatańczyć i przybić dyniową
          piątkę!
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#ff9f1c]/30 bg-[#2b1733]/80 px-5 py-2 text-sm font-semibold text-[#ffb347] shadow-md shadow-[#ff7a18]/30 transition hover:bg-[#3b1f4a]"
        >
          Zagraj ponownie jutro
        </button>
      </div>
    </div>
  );
}

function GhostIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <path
        d="M18 22c0-10 8-18 18-18s18 8 18 18v20c0 4.4-3.6 8-8 8-3 0-4.9-1.4-6.5-3.2C37 48.4 35 50 32 50s-5-1.6-7.5-3.2C22.9 48.6 21 50 18 50c-4.4 0-8-3.6-8-8Z"
        fill="currentColor"
      />
      <circle cx="26" cy="26" r="4" fill="#0b0a1a" />
      <circle cx="38" cy="26" r="4" fill="#0b0a1a" />
      <path
        d="M24 36c2.5 2 5.3 3 8 3s5.5-1 8-3"
        stroke="#0b0a1a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18 18c2-4 7.5-8 14-8s12 4 14 8"
        stroke="#ffd166"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

function CauldronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <ellipse cx="32" cy="20" rx="18" ry="6" fill="#ff9f1c" opacity="0.5" />
      <path
        d="M14 24c0-1.7 1.3-3 3-3h30c1.7 0 3 1.3 3 3v12c0 11-8.5 20-18 20s-18-9-18-20Z"
        fill="currentColor"
      />
      <path
        d="M18 24h28v6c0 7.2-6.3 13-14 13s-14-5.8-14-13Z"
        fill="#2b1733"
      />
      <path
        d="M10 40h10M44 40h10"
        stroke="#ff7a18"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="15" r="3" fill="#ffd166" />
      <circle cx="34" cy="12" r="4" fill="#ff7a18" opacity="0.7" />
    </svg>
  );
}

function FangsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <rect
        x="10"
        y="14"
        width="44"
        height="26"
        rx="13"
        fill="currentColor"
      />
      <path
        d="M16 40c0-6 4.5-10 16-10s16 4 16 10v10c0 1.1-0.9 2-2 2-2.5 0-3.8-1.7-4.8-3.7-0.8-1.6-2.5-1.6-3.3 0-1 2-2.3 3.7-4.8 3.7s-3.8-1.7-4.8-3.7c-0.8-1.6-2.5-1.6-3.3 0-1 2-2.3 3.7-4.8 3.7-1.1 0-2-0.9-2-2Z"
        fill="#fdf2d0"
      />
      <circle cx="24" cy="26" r="3" fill="#0b0a1a" />
      <circle cx="40" cy="26" r="3" fill="#0b0a1a" />
      <path
        d="M22 20c3-2 7-3 10-3s7 1 10 3"
        stroke="#ffd166"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

function WitchHatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <path
        d="M28 8c-1.7 6-5 16-11 26h30C41 22 37 14 34 8c-1.5-3-4.5-3-6 0Z"
        fill="currentColor"
      />
      <ellipse cx="32" cy="40" rx="22" ry="6" fill="#3f1f58" opacity="0.7" />
      <rect x="18" y="32" width="28" height="6" rx="3" fill="#ff7a18" />
      <rect x="29" y="32" width="6" height="6" fill="#ffd166" rx="1" />
    </svg>
  );
}

function CandyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <rect x="14" y="22" width="36" height="20" rx="10" fill="currentColor" />
      <path
        d="M14 26c4 0 6-6 6-10-4 0-6 6-6 10Zm36 0c-4 0-6-6-6-10 4 0 6 6 6 10Zm-36 12c4 0 6 6 6 10-4 0-6-6-6-10Zm36 0c-4 0-6 6-6 10 4 0 6-6 6-10Z"
        fill="#ff9f1c"
      />
      <path
        d="M22 32c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10Z"
        fill="#2b1733"
      />
      <path
        d="M24 32c0-4.4 3.6-8 8-8"
        stroke="#ffd166"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LanternIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <rect x="20" y="18" width="24" height="34" rx="6" fill="currentColor" />
      <rect x="26" y="24" width="12" height="22" rx="6" fill="#ff9f1c" />
      <path
        d="M24 12c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v4H24Z"
        stroke="#ffd166"
        strokeWidth="3"
      />
      <path
        d="M18 44c-2 3.5-6 7-10 8m48 0c-4-1-8-4.5-10-8"
        stroke="#ff7a18"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PumpkinBadgeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 72" aria-hidden className={className} fill="none">
      <circle cx="36" cy="36" r="30" fill="#2b1733" />
      <circle cx="36" cy="34" r="22" fill="#ff7a18" />
      <path
        d="M28 20c2-3 6-6 8-6s6 3 8 6"
        stroke="#ffd166"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24 34c0-7.5 5.5-13.5 12-13.5S48 26.5 48 34v10c0 5-1.8 9-5 9-2.5 0-4-1.3-5.4-3-1.4 1.7-2.9 3-5.4 3-3.2 0-5-4-5-9Z"
        fill="#ffb347"
      />
      <circle cx="30" cy="36" r="3" fill="#2b1733" />
      <circle cx="42" cy="36" r="3" fill="#2b1733" />
      <path
        d="M30 42c2 1 4 1.5 6 1.5s4-0.5 6-1.5"
        stroke="#2b1733"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RewardConfetti() {
  return (
    <div className="reward-confetti">
      {Array.from({ length: 18 }).map((_, index) => {
        const color = confettiColors[index % confettiColors.length];
        const positions = ["8%", "45%", "70%"];
        const style: ConfettiStyle = {
          "--i": index.toString(),
          "--confetti-color": color,
          left: `${(index * 11) % 100}%`,
          top: positions[index % positions.length],
        };
        return <span key={index} style={style} />;
      })}
    </div>
  );
}

function FloatingBackground() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-[#ff6f3c]/30 blur-3xl sm:-left-16 sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -right-32 top-36 h-64 w-64 rounded-full bg-[#6d28d9]/35 blur-3xl sm:-right-24 sm:top-20 sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ff9f1c]/25 blur-3xl sm:bottom-20 sm:h-96 sm:w-96" />
    </>
  );
}

function MorningBuddyIllustration() {
  return (
    <svg
      viewBox="0 0 140 140"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-[0_12px_32px_rgba(255,122,24,0.35)]"
    >
      <defs>
        <radialGradient id="pumpkinGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ffdda1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff7a18" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="pumpkinSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6f1d" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="hatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>
      </defs>

      <circle cx="70" cy="78" r="46" fill="url(#pumpkinSkin)" />
      <circle cx="70" cy="72" r="55" fill="url(#pumpkinGlow)" opacity="0.35" />
      <ellipse cx="70" cy="95" rx="34" ry="18" fill="#fef3c7" opacity="0.2" />

      <path
        d="M42 78 C44 56, 96 56, 98 78"
        stroke="#451a03"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M52 104 C60 110, 80 110, 88 104"
        stroke="#2d0d27"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="53" cy="79" rx="9" ry="11" fill="#1c0f2d" />
      <ellipse cx="87" cy="79" rx="9" ry="11" fill="#1c0f2d" />
      <circle cx="50" cy="76" r="3" fill="#ffddbf" />
      <circle cx="84" cy="76" r="3" fill="#ffddbf" />

      <path
        d="M49 44 L91 44 L104 58 L36 58 Z"
        fill="url(#hatGradient)"
        stroke="#a855f7"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect
        x="46"
        y="34"
        width="48"
        height="12"
        rx="4"
        fill="url(#hatGradient)"
        stroke="#a855f7"
        strokeWidth="3"
      />
      <rect x="65" y="28" width="10" height="12" rx="3" fill="#2f0d22" />
      <circle cx="34" cy="100" r="8" fill="#ff9f1c" opacity="0.6" />
      <circle cx="106" cy="100" r="8" fill="#7c3aed" opacity="0.5" />
    </svg>
  );
}
