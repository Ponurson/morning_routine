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
  | "snowflake"
  | "fountain"
  | "sparkles"
  | "cape"
  | "cocoa"
  | "sled";

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
    title: "Obudź małą królową lodu",
    description:
      "Rozsuń zasłony, przeciągnij się i przywitaj tańczące płatki śniegu.",
    icon: "snowflake",
    gradient: "from-[#bfe7ff] via-[#8fd4ff] to-[#5fb6ff]",
  },
  {
    id: "pee",
    title: "Odwiedź błękitne źródełko",
    description:
      "Wskocz do łazienki niczym renifer i posłuchaj, jak szemrze lodowe źródełko.",
    icon: "fountain",
    gradient: "from-[#d6f4ff] via-[#adebff] to-[#7edaff]",
  },
  {
    id: "wash",
    title: "Rozbłyśnij kryształowym uśmiechem",
    description:
      "Wypoleruj zęby, by lśniły jak świeżo narodzone sople i dmuchnij zimnym wiatrem w piankę.",
    icon: "sparkles",
    gradient: "from-[#f6fbff] via-[#dceeff] to-[#b6d9ff]",
  },
  {
    id: "dress",
    title: "Otul się peleryną zorzy",
    description:
      "Załóż ulubiony strój, popraw warkocz i przypnij śnieżną broszkę.",
    icon: "cape",
    gradient: "from-[#f1f7ff] via-[#cde1ff] to-[#96bdf9]",
  },
  {
    id: "eat",
    title: "Zaparz kubek gorącego kakao",
    description:
      "Wsyp płatki do miski, dodaj owoce i popij rozgrzewającą czekoladą z piankami.",
    icon: "cocoa",
    gradient: "from-[#ffe7f1] via-[#ffcfe4] to-[#ffb1d3]",
  },
  {
    id: "bag",
    title: "Spakuj plecak na saneczkową wyprawę",
    description:
      "Schowaj zeszyty, rękawiczki i ukochaną maskotkę, by być gotową na zimową przygodę.",
    icon: "sled",
    gradient: "from-[#e4fbff] via-[#caf1ff] to-[#a4e2ff]",
  },
];

type SliderState = Record<string, number>;

const confettiColors = [
  "#e6f6ff",
  "#cfe9ff",
  "#bcdfff",
  "#f5ecff",
  "#ffd7f2",
  "#c7f3ff",
];

type ConfettiStyle = CSSProperties &
  Record<"--i" | "--confetti-color", string>;

type SliderStyle = CSSProperties & { "--progress": string };

const SLIDER_MAX = 100;

const STEP_ICONS: Record<IconName, (props: IconProps) => ReactElement> = {
  snowflake: SnowflakeIcon,
  fountain: FountainIcon,
  sparkles: SparklesIcon,
  cape: CapeIcon,
  cocoa: CocoaIcon,
  sled: SledIcon,
};

const SNOWFLAKES: CSSProperties[] = Array.from(
  { length: 36 },
  (_, index): CSSProperties => {
    const size = 6 + ((index * 3) % 12);
    return {
      left: `${(index * 7) % 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `-${(index % 12) * 0.35}s`,
      animationDuration: `${8 + (index % 6)}s`,
    };
  }
);

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

export default function FrozenVersion() {
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
    <div className={`${heading.variable} ${body.variable} frozen-root`}>
      <style>{`
        .frozen-root {
          font-family: var(--font-body), "Nunito", "Segoe UI", sans-serif;
        }
        .frozen-root .font-heading {
          font-family: var(--font-heading), "Baloo 2", "Segoe UI", cursive;
        }
        .snowfall {
          pointer-events: none;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .snowflake {
          position: absolute;
          top: -10%;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.05) 70%
          );
          animation: snowfall linear infinite;
          filter: drop-shadow(0 0 8px rgba(155, 219, 255, 0.7));
          opacity: 0.85;
        }
        @keyframes snowfall {
          0% {
            transform: translate3d(0, -10%, 0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(-8px, 110vh, 0) scale(1);
            opacity: 0;
          }
        }
        .reward-confetti {
          pointer-events: none;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .reward-confetti span {
          position: absolute;
          width: 8px;
          height: 18px;
          border-radius: 9999px;
          opacity: 0;
          transform: translate3d(0, 20px, 0) rotate(0deg);
          background: var(--confetti-color);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.35);
          animation: confetti-pop 3.6s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.18s);
        }
        @keyframes confetti-pop {
          0% {
            opacity: 0;
            transform: translate3d(0, 40px, 0) rotate(-8deg);
          }
          30% {
            opacity: 1;
            transform: translate3d(-6px, -6px, 0) rotate(6deg);
          }
          60% {
            opacity: 0.9;
            transform: translate3d(8px, -48px, 0) rotate(-10deg);
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
          border: 1px solid rgba(154, 215, 255, 0.5);
          background: linear-gradient(
            90deg,
            #9ad7ff var(--progress),
            rgba(255, 255, 255, 0.08) var(--progress)
          );
        }
        .step-slider::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: #0f2d52;
          border: 3px solid #9ad7ff;
          box-shadow: 0 10px 24px rgba(12, 40, 78, 0.45);
          margin-top: -8px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .step-slider:active::-webkit-slider-thumb {
          transform: scale(1.05);
          box-shadow: 0 12px 28px rgba(12, 40, 78, 0.6);
        }
        .step-slider::-moz-range-track {
          height: 14px;
          border-radius: 9999px;
          border: 1px solid rgba(154, 215, 255, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }
        .step-slider::-moz-range-progress {
          height: 14px;
          border-radius: 9999px;
          background: #9ad7ff;
        }
        .step-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: #0f2d52;
          border: 3px solid #9ad7ff;
          box-shadow: 0 10px 24px rgba(12, 40, 78, 0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-[#020b1c] text-[#f5fbff]">
        <SnowfallBackground />

        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-9 px-4 pb-24 pt-14 sm:px-6">
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#cfe9ff] backdrop-blur transition hover:bg-white/20"
            >
              Wróć do aktualnej wersji
            </Link>
          </div>
          <header className="flex items-center gap-4 rounded-[36px] border border-white/15 bg-white/5 px-6 py-6 shadow-[0_24px_60px_rgba(3,18,41,0.55)] backdrop-blur-xl sm:gap-6 sm:px-8">
            <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
              <MorningBuddyIllustration />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9bd8ff]">
                Dzień dobry, królowo lodu!
              </span>
              <h1 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Poranek w Krainie Lodu
              </h1>
              <p className="text-sm text-[#d0e7ff] sm:text-base">
                Przesuwaj suwaki, aby rozświetlić lodowy pałac krok po kroku.
              </p>
            </div>
          </header>

          <section className="rounded-[34px] border border-white/15 bg-white/5 px-6 py-6 shadow-lg shadow-[#020b1c]/50 backdrop-blur-lg sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7dc4ff]">
                  Postęp rytuału
                </p>
                <p className="font-heading text-2xl font-semibold text-white">
                  {completedCount} / {ROUTINE_STEPS.length} kroków
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#9ad7ff] to-[#7abfff] text-xl font-semibold text-[#032749] shadow-inner shadow-white/40">
                {progressPercent}%
              </div>
            </div>
            <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#9ad7ff] via-[#86c9ff] to-[#c3b6ff] transition-all duration-500 ease-out"
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
                  className={`group relative flex flex-col gap-4 rounded-[34px] border px-5 py-5 text-left shadow-lg transition-all duration-300 sm:flex-row sm:items-center sm:px-6 sm:py-6 ${
                    isComplete
                      ? "border-transparent bg-gradient-to-br from-[#d6f1ff]/90 via-[#b8e5ff]/95 to-[#8acfff] text-[#031c33]"
                      : "border-white/15 bg-white/5 text-[#f5fbff] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(8,33,68,0.35)]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-[26px] bg-gradient-to-br text-3xl shadow-md shadow-black/30 transition-transform duration-300 sm:h-20 sm:w-20 sm:text-4xl ${step.gradient}`}
                    >
                      <StepIcon
                        name={step.icon}
                        className={`h-10 w-10 ${
                          isComplete ? "text-[#0f2b46]" : "text-white"
                        } drop-shadow-[0_4px_16px_rgba(2,9,28,0.35)]`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#9bd8ff]">
                        Etap poranka {index + 1}
                      </p>
                      <h2 className="font-heading text-xl font-semibold text-current sm:text-2xl">
                        {step.title}
                      </h2>
                      <p
                        className={`mt-1 text-sm sm:text-base ${
                          isComplete ? "text-[#0f2b46]" : "text-[#d8ecff]"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:ml-auto sm:w-[220px]">
                    <label
                      htmlFor={sliderId}
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a8dcff]"
                    >
                      Przesuń suwak, aby{" "}
                      {isComplete ? "wrócić do zabawy" : "uruchomić czar"}
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

          <section className="relative mt-4">
            {allDone ? (
              <RewardCard onReset={resetSteps} />
            ) : (
              <div className="rounded-[34px] border-2 border-dashed border-white/25 bg-white/5 px-6 py-8 text-center shadow-inner shadow-[#00040a]/60 backdrop-blur-sm sm:px-8">
                <p className="font-heading text-xl text-[#9bd8ff] sm:text-2xl">
                  Ukończ każdy krok, aby odsłonić lodową nagrodę!
                </p>
                <p className="mt-2 text-sm text-[#d0e7ff] sm:text-base">
                  Każde przesunięcie rozsypuje świetlisty pył i rozgrzewa
                  poranek.
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
    <div className="relative overflow-hidden rounded-[34px] border border-white/20 bg-gradient-to-br from-[#081a3b]/80 via-[#12335f]/90 to-[#54c1ff]/70 px-6 py-9 text-center shadow-2xl shadow-[#02102b]/70 backdrop-blur">
      <RewardConfetti />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.5em] text-[#bfe4ff]">
          Diadem zorzy zdobyty
        </span>
        <AuroraBadgeIcon className="h-16 w-16 text-white" />
        <h3 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Królowa świtu!
        </h3>
        <p className="text-sm text-[#e0f2ff] sm:text-base">
          Wszystkie zadania ukończone — czas zatańczyć w płatkach śniegu i
          przywitać nowy dzień.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#0d2545]/70 px-5 py-2 text-sm font-semibold text-[#9bd8ff] shadow-md shadow-[#020c1f]/60 transition hover:bg-[#14345e]"
        >
          Przeżyj poranek od nowa
        </button>
      </div>
    </div>
  );
}

function SnowflakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M32 6v52" />
        <path d="M8 32h48" />
        <path d="M14 18l36 28" />
        <path d="M14 46l36-28" />
      </g>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function FountainIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <path
        d="M22 40c0-6.627 4.925-12 11-12s11 5.373 11 12v4c0 5.523-4.477 10-10 10h-2c-5.523 0-10-4.477-10-10Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M32 10c-7 5-11 12-11 19m11-19c7 5 11 12 11 19"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 22c-4 3-6 7-6 11"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M18 40c0 5.523-4.477 10-10 10m48 0c-5.523 0-10-4.477-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function SparklesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <path
        d="M32 8l4 12 12 4-12 4-4 12-4-12-12-4 12-4Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M48 32l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M16 36l1.5 4.5 4.5 1.5-4.5 1.5L16 48l-1.5-4.5L10 42l4.5-1.5Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

function CapeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <path
        d="M18 18c4 6 7 18 7 28s-2 12-2 12h18s-2-2-2-12 3-22 7-28c-5-4-9-6-12-6s-7 2-12 6Z"
        fill="currentColor"
      />
      <path
        d="M24 18c2-3 5-5 8-5s6 2 8 5"
        stroke="#f4f6ff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M16 46c4 4 10 6 16 6s12-2 16-6"
        stroke="#f4f6ff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

function CocoaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <rect
        x="16"
        y="20"
        width="28"
        height="24"
        rx="10"
        fill="currentColor"
      />
      <path
        d="M44 28h4c3.866 0 7 3.134 7 7s-3.134 7-7 7h-4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M24 16c0-3 3-6 6-6m4 6c0-3 3-6 6-6"
        stroke="#fdeff7"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="26" cy="32" r="3" fill="#fdeff7" opacity="0.8" />
      <circle cx="34" cy="32" r="3" fill="#fdeff7" opacity="0.6" />
    </svg>
  );
}

function SledIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <rect
        x="12"
        y="30"
        width="40"
        height="12"
        rx="6"
        fill="currentColor"
      />
      <path
        d="M16 44c-2 3-5 6-9 6m50 0c-4 0-7-3-9-6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M20 22h24l6 8H14Z" fill="#f5fbff" opacity="0.7" />
      <path
        d="M24 18c2-2 5-4 8-4s6 2 8 4"
        stroke="#f5fbff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function AuroraBadgeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 72" aria-hidden className={className} fill="none">
      <circle cx="36" cy="36" r="32" fill="#0a2246" />
      <circle cx="36" cy="34" r="24" fill="#8fd4ff" />
      <path
        d="M36 16l6 12 14 2-10 10 2 14-12-6-12 6 2-14-10-10 14-2Z"
        fill="#f5fbff"
      />
      <circle cx="36" cy="34" r="6" fill="#7abfff" />
    </svg>
  );
}

function RewardConfetti() {
  return (
    <div className="reward-confetti">
      {Array.from({ length: 20 }).map((_, index) => {
        const color = confettiColors[index % confettiColors.length];
        const positions = ["10%", "40%", "70%"];
        const style: ConfettiStyle = {
          "--i": index.toString(),
          "--confetti-color": color,
          left: `${(index * 9) % 100}%`,
          top: positions[index % positions.length],
        };
        return <span key={index} style={style} />;
      })}
    </div>
  );
}

function SnowfallBackground() {
  return (
    <div className="snowfall">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020916] via-[#031c3f] to-[#0b3f6e]" />
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#8cd4ff]/15 blur-3xl sm:-left-24 sm:h-96 sm:w-96" />
      <div className="absolute -right-32 top-24 h-72 w-72 rounded-full bg-[#6ab8ff]/20 blur-3xl sm:-right-16 sm:h-96 sm:w-96" />
      <div className="absolute inset-x-16 bottom-0 h-64 rounded-full bg-[#4dd2ff]/10 blur-[120px]" />
      {SNOWFLAKES.map((style, index) => (
        <span key={index} className="snowflake" style={style} />
      ))}
    </div>
  );
}

function MorningBuddyIllustration() {
  return (
    <svg
      viewBox="0 0 140 140"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-[0_12px_32px_rgba(120,189,255,0.45)]"
    >
      <defs>
        <linearGradient id="auroraSky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#132a52" />
          <stop offset="100%" stopColor="#4bb6ff" />
        </linearGradient>
        <linearGradient id="castleBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2f5ff" />
          <stop offset="100%" stopColor="#a7d6ff" />
        </linearGradient>
        <linearGradient id="castleGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop
            offset="100%"
            stopColor="#b0e4ff"
            stopOpacity="0.7"
          />
        </linearGradient>
      </defs>
      <rect width="140" height="140" rx="36" fill="url(#auroraSky)" />
      <path
        d="M10 118L46 72l26 32 26-40 32 54Z"
        fill="#d4f1ff"
        opacity="0.25"
      />
      <rect
        x="48"
        y="52"
        width="44"
        height="56"
        rx="12"
        fill="url(#castleBody)"
      />
      <rect
        x="62"
        y="72"
        width="16"
        height="36"
        rx="6"
        fill="#f5fbff"
        opacity="0.8"
      />
      <path
        d="M70 28l10 20H60Z"
        fill="url(#castleGlow)"
        stroke="#e6f6ff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M52 52h36"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="70" cy="32" r="6" fill="#f5fbff" opacity="0.7" />
      <circle cx="40" cy="96" r="6" fill="#bfe4ff" opacity="0.8" />
      <circle cx="104" cy="88" r="8" fill="#9ad7ff" opacity="0.7" />
    </svg>
  );
}
