"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties, ReactElement } from "react";

type IconName =
  | "firework"
  | "toast"
  | "sparkle"
  | "mask"
  | "confetti"
  | "wish";

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
    title: "Pobudka przy blasku fajerwerków",
    description:
      "Odsłoń zasłony, przeciągnij się i przywitaj dzień jak po wielkiej nocy.",
    icon: "sparkle",
    gradient: "from-[#ffd58a] via-[#ffb870] to-[#ff8f5a]",
  },
  {
    id: "bathroom",
    title: "Szybki przystanek w łazience",
    description:
      "Wpadnij na chwilę, umyj rączki i poczuj noworoczną świeżość.",
    icon: "confetti",
    gradient: "from-[#ffe2a3] via-[#ffc67c] to-[#ff9b5c]",
  },
  {
    id: "teeth",
    title: "Rozbłyśnij uśmiechem",
    description:
      "Wyszczotkuj zęby, by świeciły jak nocne iskierki.",
    icon: "firework",
    gradient: "from-[#ffe6d3] via-[#ffd0b3] to-[#ffa98f]",
  },
  {
    id: "dress",
    title: "Ubierz się na nowy dzień",
    description:
      "Wybierz strój, popraw warkocz i dodaj odrobinę blasku.",
    icon: "mask",
    gradient: "from-[#ffecd9] via-[#ffd9a8] to-[#ffc178]",
  },
  {
    id: "breakfast",
    title: "Śniadaniowa energia",
    description:
      "Zjedz śniadanie i wypij ciepły napój, jak toast na dobry start.",
    icon: "toast",
    gradient: "from-[#ffd8a0] via-[#ffbfa1] to-[#ff8f8a]",
  },
  {
    id: "bag",
    title: "Spakuj plecak",
    description:
      "Schowaj zeszyty, przekąskę i ulubioną maskotkę na dalszą drogę.",
    icon: "wish",
    gradient: "from-[#ffe0b7] via-[#ffc48f] to-[#ff9872]",
  },
];

type CompletionState = Record<string, boolean>;
type BurstState = Record<string, number>;

const confettiColors = [
  "#ffe7b3",
  "#ffcc7a",
  "#ffb07c",
  "#ff8c8c",
  "#ffd6a6",
  "#f4b56a",
];

type ConfettiStyle = CSSProperties &
  Record<"--i" | "--confetti-color", string>;

const STEP_ICONS: Record<IconName, (props: IconProps) => ReactElement> = {
  firework: FireworkIcon,
  toast: ToastIcon,
  sparkle: SparkleIcon,
  mask: MaskIcon,
  confetti: ConfettiIcon,
  wish: WishIcon,
};

const FIREWORKS: CSSProperties[] = Array.from(
  { length: 12 },
  (_, index): CSSProperties => {
    const left = (index * 13) % 100;
    const top = 8 + ((index * 11) % 55);
    return {
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${index * 0.6}s`,
    };
  }
);

const createInitialCompletionState = (): CompletionState =>
  Object.fromEntries(ROUTINE_STEPS.map((step) => [step.id, false]));

const createInitialBurstState = (): BurstState =>
  Object.fromEntries(ROUTINE_STEPS.map((step) => [step.id, 0]));

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

export default function Home() {
  const [completionState, setCompletionState] = useState<CompletionState>(() =>
    createInitialCompletionState()
  );
  const [burstState, setBurstState] = useState<BurstState>(() =>
    createInitialBurstState()
  );

  const completedCount = useMemo(
    () =>
      ROUTINE_STEPS.filter((step) => completionState[step.id]).length,
    [completionState]
  );

  const progressPercent = Math.round(
    (completedCount / ROUTINE_STEPS.length) * 100
  );
  const allDone = completedCount === ROUTINE_STEPS.length;

  const handleTileToggle = (id: string) => {
    setCompletionState((prev) => {
      const nextValue = !prev[id];
      if (nextValue) {
        setBurstState((bursts) => ({
          ...bursts,
          [id]: (bursts[id] ?? 0) + 1,
        }));
      }
      return { ...prev, [id]: nextValue };
    });
  };

  const resetSteps = () => {
    setCompletionState(createInitialCompletionState());
    setBurstState(createInitialBurstState());
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09050f] text-[#fdf7ec]">
      <FireworksBackground />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-9 px-4 pb-24 pt-14 sm:px-6">
        <header className="flex items-center gap-4 rounded-[36px] border border-white/10 bg-white/5 px-6 py-6 shadow-[0_24px_60px_rgba(12,6,20,0.6)] backdrop-blur-xl sm:gap-6 sm:px-8">
          <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
            <MorningBuddyIllustration />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ffd59a]">
              Witaj, celebrująca duszo!
            </span>
            <h1 className="font-heading text-2xl font-semibold leading-tight text-white sm:text-4xl">
              Sylwestrowy Rozruch
            </h1>
            <p className="text-sm text-[#f9e6c7] sm:text-base">
              Klikaj karty, aby wejść w poranek jak po wielkiej nocy.
            </p>
          </div>
        </header>

        <section className="rounded-[34px] border border-white/10 bg-white/5 px-6 py-6 shadow-lg shadow-[#140817]/60 backdrop-blur-lg sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ffd59a]">
                Postęp poranka
              </p>
              <p className="font-heading text-2xl font-semibold text-white">
                {completedCount} / {ROUTINE_STEPS.length} momentów
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#ffd59a] to-[#ff9a7d] text-xl font-semibold text-[#2b1539] shadow-inner shadow-white/40">
              {progressPercent}%
            </div>
          </div>
          <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ffd59a] via-[#ffb07c] to-[#ff8c8c] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
              aria-hidden
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          {ROUTINE_STEPS.map((step, index) => {
            const isComplete = completionState[step.id];
            const burstKey = `${step.id}-${burstState[step.id] ?? 0}`;
            return (
              <article
                key={step.id}
                aria-live="polite"
                role="button"
                tabIndex={0}
                aria-pressed={isComplete}
                onClick={() => handleTileToggle(step.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleTileToggle(step.id);
                  }
                }}
                className={`group relative flex flex-col gap-4 rounded-[34px] border px-5 py-5 text-left shadow-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd59a]/70 sm:flex-row sm:items-center sm:px-6 sm:py-6 ${
                  isComplete
                    ? "border-transparent bg-gradient-to-br from-[#ffe4b3]/90 via-[#ffc48f]/95 to-[#ff9d7a] text-[#2b1539]"
                    : "border-white/10 bg-white/5 text-[#fdf7ec] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,14,45,0.4)]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-[26px] bg-gradient-to-br text-3xl shadow-md shadow-black/30 transition-transform duration-300 sm:h-20 sm:w-20 sm:text-4xl ${step.gradient}`}
                  >
                    <StepIcon
                      name={step.icon}
                      className={`h-10 w-10 ${
                        isComplete ? "text-[#2b1539]" : "text-white"
                      } drop-shadow-[0_4px_16px_rgba(20,8,24,0.35)]`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#ffd59a]">
                      Etap poranka {index + 1}
                    </p>
                    <h2 className="font-heading text-xl font-semibold text-current sm:text-2xl">
                      {step.title}
                    </h2>
                    <p
                      className={`mt-1 text-sm sm:text-base ${
                        isComplete ? "text-[#2b1539]" : "text-[#f7e3c0]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
                {isComplete ? (
                  <div
                    key={burstKey}
                    className="firework-burst"
                    aria-hidden
                  >
                    {Array.from({ length: 8 }).map((_, index) => (
                      <span key={index} />
                    ))}
                  </div>
                ) : null}
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd59a] sm:ml-auto sm:w-[220px] sm:justify-end">
                  {isComplete ? "Zrobione!" : "Kliknij, aby ukończyć"}
                </div>
              </article>
            );
          })}
        </section>

        <section className="relative mt-4">
          {allDone ? (
            <RewardCard onReset={resetSteps} />
          ) : (
            <div className="rounded-[34px] border-2 border-dashed border-white/20 bg-white/5 px-6 py-8 text-center shadow-inner shadow-[#0a040f]/60 backdrop-blur-sm sm:px-8">
                <p className="font-heading text-xl text-[#ffd59a] sm:text-2xl">
                  Ukończ każdy krok, aby odsłonić nagrodę!
                </p>
                <p className="mt-2 text-sm text-[#f7e3c0] sm:text-base">
                  Każde kliknięcie dodaje blasku i pomaga rozpocząć dzień.
                </p>
              </div>
            )}
        </section>

        <section className="rounded-[34px] border border-white/10 bg-white/5 px-6 py-8 text-center shadow-lg shadow-[#140817]/50 backdrop-blur-lg sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffd59a]">
            Poprzednie wersje
          </p>
          <h3 className="mt-3 font-heading text-2xl text-white sm:text-3xl">
            Zajrzyj do wcześniejszych motywów
          </h3>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/versions/initial"
              className="rounded-full border border-white/25 bg-[#2b1539]/70 px-5 py-2 text-sm font-semibold text-[#ffe7b3] shadow-md shadow-[#0b050f]/50 transition hover:bg-[#3b1a3b]"
            >
              Pierwsza wersja
            </Link>
            <Link
              href="/versions/frozen"
              className="rounded-full border border-white/25 bg-[#2b1539]/70 px-5 py-2 text-sm font-semibold text-[#ffe7b3] shadow-md shadow-[#0b050f]/50 transition hover:bg-[#3b1a3b]"
            >
              Kraina Lodu
            </Link>
            <Link
              href="/versions/halloween"
              className="rounded-full border border-white/25 bg-[#2b1539]/70 px-5 py-2 text-sm font-semibold text-[#ffe7b3] shadow-md shadow-[#0b050f]/50 transition hover:bg-[#3b1a3b]"
            >
              Halloween
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

type RewardCardProps = {
  onReset: () => void;
};

function RewardCard({ onReset }: RewardCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/15 bg-gradient-to-br from-[#2b1539]/85 via-[#3b1a3b]/90 to-[#ff9a7d]/75 px-6 py-9 text-center shadow-2xl shadow-[#0b050f]/70 backdrop-blur">
      <RewardConfetti />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.5em] text-[#ffd59a]">
          Noworoczny start
        </span>
        <MidnightBadgeIcon className="h-16 w-16 text-white" />
        <h3 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Królowa poranka!
        </h3>
        <p className="text-sm text-[#f9e6c7] sm:text-base">
          Wszystko gotowe — czas ruszyć w dzień z energią i uśmiechem.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#2b1539]/70 px-5 py-2 text-sm font-semibold text-[#ffd59a] shadow-md shadow-[#0b050f]/60 transition hover:bg-[#3b1a3b]"
        >
          Zrób poranek jeszcze raz
        </button>
      </div>
    </div>
  );
}

function FireworkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 7v15" />
        <path d="M32 42v15" />
        <path d="M7 32h15" />
        <path d="M42 32h15" />
        <path d="M14 15l9 9" />
        <path d="M41 40l9 9" />
        <path d="M50 15l-9 9" />
        <path d="M23 40l-9 9" />
        <path d="M26 32c2-3 6-4 10-2 2 1 4 3 4 5" />
      </g>
      <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function ToastIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 18h14l-2 20c0 7-4 10-8 10s-8-3-8-10l-2-20Z" />
        <path d="M38 18h14l-2 20c0 7-4 10-8 10s-8-3-8-10l-2-20Z" />
        <path d="M14 16l10 10m16-10l-10 10" />
        <path d="M20 20c1 6 1 12 0 18" />
        <path d="M44 20c1 6 1 12 0 18" />
      </g>
      <circle cx="22" cy="40" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="42" cy="40" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 9l4 11 11 4-11 4-4 11-4-11-11-4 11-4Z" />
        <path d="M48 32l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
        <path d="M16 36l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z" />
      </g>
      <circle cx="24" cy="22" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="42" cy="44" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function MaskIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 26c7-8 16-12 20-12s13 4 20 12c-2 14-11 22-20 22S14 40 12 26Z" />
        <path d="M22 28c3 0 6 3 6 6m8-6c3 0 6 3 6 6" />
        <path d="M8 22l6 4m42-4l-6 4" />
        <path d="M18 34c4 4 8 6 14 6s10-2 14-6" />
      </g>
      <circle cx="24" cy="30" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="40" cy="30" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function ConfettiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 44l12-28 20 12-12 28Z" />
        <path d="M30 26l8 4" />
        <path d="M22 40l6-14" />
      </g>
      <circle cx="42" cy="20" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="50" cy="30" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function WishIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M44 24a12 12 0 1 1-10-14 12 12 0 0 0 10 14Z" />
        <path d="M28 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
      </g>
      <circle cx="46" cy="38" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="22" cy="22" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function MidnightBadgeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 72" aria-hidden className={className} fill="none">
      <circle cx="36" cy="36" r="32" fill="#2b1539" />
      <circle cx="36" cy="34" r="24" fill="#ffb07c" opacity="0.3" />
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M36 16l6 12 14 2-10 10 2 14-12-6-12 6 2-14-10-10 14-2Z" />
        <path d="M28 40c4 2 12 2 16 0" />
      </g>
      <circle cx="36" cy="34" r="6" fill="currentColor" opacity="0.7" />
      <circle cx="24" cy="28" r="3" fill="currentColor" opacity="0.5" />
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

function FireworksBackground() {
  return (
    <div className="spark-field">
      <div className="absolute inset-0 bg-gradient-to-br from-[#09050f] via-[#1b0d2e] to-[#2b1539]" />
      <div className="absolute -left-20 top-6 h-72 w-72 rounded-full bg-[#ffb07c]/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-24 top-16 h-64 w-64 rounded-full bg-[#ff8c8c]/15 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute inset-x-12 bottom-0 h-64 rounded-full bg-[#ffd59a]/10 blur-[140px]" />
      <div className="fireworks-sky">
        {FIREWORKS.map((style, index) => (
          <div key={index} className="firework" style={style}>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    </div>
  );
}

function MorningBuddyIllustration() {
  return (
    <svg
      viewBox="0 0 140 140"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-[0_12px_32px_rgba(255,179,122,0.45)]"
    >
      <defs>
        <linearGradient id="nySky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#24102d" />
          <stop offset="100%" stopColor="#ff9f74" />
        </linearGradient>
      </defs>
      <rect width="140" height="140" rx="36" fill="url(#nySky)" />
      <g
        stroke="#fff1d6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M14 112L36 86l16 18 18-30 28 38" />
        <path d="M40 96v-36h14v36" />
        <path d="M60 98v-46h22v46" />
        <path d="M86 102v-28h14v28" />
        <path d="M40 60h42" />
        <path d="M66 40l6 12h-12Z" />
      </g>
      <g fill="#fff1d6" opacity="0.85">
        <circle cx="72" cy="34" r="5" />
        <circle cx="30" cy="92" r="4" />
        <circle cx="108" cy="82" r="6" />
      </g>
      <g stroke="#fff1d6" strokeWidth="2.5" strokeLinecap="round">
        <path d="M96 28l8 6" />
        <path d="M102 24l-2 10" />
        <path d="M30 26l6 4" />
        <path d="M36 22l-2 8" />
      </g>
    </svg>
  );
}
