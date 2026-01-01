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

type IconName = "sun" | "bath" | "brush" | "shirt" | "bowl" | "bag";

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
    title: "Pobudka",
    description: "Przeciągnij się, otwórz oczy i przywitaj nowy dzień.",
    icon: "sun",
    gradient: "from-[#ffe3a7] via-[#ffd48c] to-[#ffb86b]",
  },
  {
    id: "bathroom",
    title: "Wizyta w łazience",
    description: "Umyj rączki i buzię, żeby poczuć świeżość.",
    icon: "bath",
    gradient: "from-[#d7f2ff] via-[#bfe6ff] to-[#99d8ff]",
  },
  {
    id: "teeth",
    title: "Mycie zębów",
    description: "Wyszczotkuj ząbki i rozświetl uśmiech.",
    icon: "brush",
    gradient: "from-[#f5f4ff] via-[#e1ddff] to-[#c3bbff]",
  },
  {
    id: "dress",
    title: "Ubieranie",
    description: "Wybierz strój, który jest wygodny i gotowy na przygody.",
    icon: "shirt",
    gradient: "from-[#ffe8f3] via-[#ffd2e8] to-[#ffb3d7]",
  },
  {
    id: "breakfast",
    title: "Śniadanie",
    description: "Zjedz coś pożywnego i wypij ulubiony napój.",
    icon: "bowl",
    gradient: "from-[#fff0cf] via-[#ffe2ab] to-[#ffc989]",
  },
  {
    id: "bag",
    title: "Spakuj plecak",
    description: "Schowaj zeszyty, wodę i ulubioną maskotkę.",
    icon: "bag",
    gradient: "from-[#e6f5ff] via-[#cfe9ff] to-[#b0dcff]",
  },
];

type SliderState = Record<string, number>;

type SliderStyle = CSSProperties & { "--progress": string };

const SLIDER_MAX = 100;

const STEP_ICONS: Record<IconName, (props: IconProps) => ReactElement> = {
  sun: SunIcon,
  bath: BathIcon,
  brush: BrushIcon,
  shirt: ShirtIcon,
  bowl: BowlIcon,
  bag: BagIcon,
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

export default function InitialVersion() {
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

  const handleSliderChange = (id: string, value: number) => {
    setSliderState((prev) => ({ ...prev, [id]: snapSliderValue(value) }));
  };

  return (
    <div className={`${heading.variable} ${body.variable} initial-root`}>
      <style>{`
        .initial-root {
          font-family: var(--font-body), "Nunito", "Segoe UI", sans-serif;
          color: #1e2430;
        }
        .initial-root .font-heading {
          font-family: var(--font-heading), "Baloo 2", "Segoe UI", cursive;
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
          height: 12px;
          border-radius: 9999px;
          border: 1px solid rgba(30, 36, 48, 0.2);
          background: linear-gradient(
            90deg,
            #8fd4ff var(--progress),
            rgba(30, 36, 48, 0.08) var(--progress)
          );
        }
        .step-slider::-webkit-slider-thumb {
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          background: #1e2430;
          border: 3px solid #8fd4ff;
          box-shadow: 0 8px 20px rgba(30, 36, 48, 0.25);
          margin-top: -7px;
          transition: transform 0.2s ease;
        }
        .step-slider:active::-webkit-slider-thumb {
          transform: scale(1.05);
        }
        .step-slider::-moz-range-track {
          height: 12px;
          border-radius: 9999px;
          border: 1px solid rgba(30, 36, 48, 0.2);
          background: rgba(30, 36, 48, 0.08);
        }
        .step-slider::-moz-range-progress {
          height: 12px;
          border-radius: 9999px;
          background: #8fd4ff;
        }
        .step-slider::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          background: #1e2430;
          border: 3px solid #8fd4ff;
          box-shadow: 0 8px 20px rgba(30, 36, 48, 0.25);
          transition: transform 0.2s ease;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#fff9f1] via-[#f6fbff] to-[#f3f0ff]">
        <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-9 px-4 pb-24 pt-12 sm:px-6">
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-[#1e2430]/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#374151] shadow-sm backdrop-blur transition hover:bg-white"
            >
              Wróć do aktualnej wersji
            </Link>
          </div>

          <header className="flex items-center gap-4 rounded-[32px] border border-[#1e2430]/10 bg-white/70 px-6 py-6 shadow-lg sm:gap-6 sm:px-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#ffe3a7] text-4xl shadow-inner">
              ☀️
            </div>
            <div className="flex flex-col gap-2 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff9f4a]">
                Dzień dobry!
              </span>
              <h1 className="font-heading text-3xl font-semibold leading-tight text-[#1e2430] sm:text-4xl">
                Poranne Iskierki
              </h1>
              <p className="text-sm text-[#4b5563] sm:text-base">
                Przesuwaj suwaki, aby przejść przez poranne kroki.
              </p>
            </div>
          </header>

          <section className="rounded-[30px] border border-[#1e2430]/10 bg-white/70 px-6 py-6 shadow-md sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ff9f4a]">
                  Postęp rutyny
                </p>
                <p className="font-heading text-2xl font-semibold text-[#1e2430]">
                  {completedCount} / {ROUTINE_STEPS.length} kroków
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#8fd4ff] text-xl font-semibold text-[#1e2430] shadow-inner">
                {progressPercent}%
              </div>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[#1e2430]/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8fd4ff] via-[#b5e5ff] to-[#ffd48c] transition-all duration-500 ease-out"
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
                  className={`group flex flex-col gap-4 rounded-[28px] border px-5 py-5 text-left shadow-md transition-all duration-300 sm:flex-row sm:items-center sm:px-6 sm:py-6 ${
                    isComplete
                      ? "border-transparent bg-white text-[#1e2430]"
                      : "border-[#1e2430]/10 bg-white/70 text-[#1e2430]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br text-3xl shadow-md ${step.gradient}`}
                    >
                      <StepIcon name={step.icon} className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ff9f4a]">
                        Krok {index + 1}
                      </p>
                      <h2 className="font-heading text-xl font-semibold text-[#1e2430] sm:text-2xl">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm text-[#4b5563] sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:ml-auto sm:w-[220px]">
                    <label
                      htmlFor={sliderId}
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff9f4a]"
                    >
                      Przesuń suwak, aby {isComplete ? "wrócić" : "ukończyć"}
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
                          : `Postęp ${sliderProgress} procent`
                      }
                    />
                  </div>
                </article>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
}

function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <circle cx="32" cy="32" r="12" fill="#ff9f4a" />
      <g stroke="#1e2430" strokeWidth="3" strokeLinecap="round">
        <path d="M32 8v8" />
        <path d="M32 48v8" />
        <path d="M8 32h8" />
        <path d="M48 32h8" />
        <path d="M14 14l6 6" />
        <path d="M44 44l6 6" />
        <path d="M50 14l-6 6" />
        <path d="M20 44l-6 6" />
      </g>
    </svg>
  );
}

function BathIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <rect x="10" y="28" width="44" height="18" rx="9" fill="#8fd4ff" />
      <path
        d="M16 26c0-6 4-10 10-10h12"
        stroke="#1e2430"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="26" cy="24" r="3" fill="#1e2430" opacity="0.4" />
      <circle cx="38" cy="24" r="3" fill="#1e2430" opacity="0.4" />
    </svg>
  );
}

function BrushIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <rect x="14" y="32" width="36" height="10" rx="5" fill="#c3bbff" />
      <path
        d="M20 28h24"
        stroke="#1e2430"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18 44c0 4 6 6 14 6s14-2 14-6"
        stroke="#1e2430"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShirtIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <path
        d="M18 16l8 6h12l8-6 8 10-8 6v20H18V32l-8-6Z"
        fill="#ffb3d7"
      />
      <path
        d="M26 22c2-3 4-4 6-4s4 1 6 4"
        stroke="#1e2430"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BowlIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <path
        d="M12 30h40c0 12-10 22-20 22s-20-10-20-22Z"
        fill="#ffc989"
      />
      <path
        d="M16 28c4-6 10-8 16-8s12 2 16 8"
        stroke="#1e2430"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <rect x="18" y="22" width="28" height="28" rx="8" fill="#b0dcff" />
      <path
        d="M24 22c0-6 4-10 8-10s8 4 8 10"
        stroke="#1e2430"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="26" cy="36" r="3" fill="#1e2430" opacity="0.4" />
      <circle cx="38" cy="36" r="3" fill="#1e2430" opacity="0.4" />
    </svg>
  );
}
