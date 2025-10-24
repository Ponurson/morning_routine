"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type RoutineStep = {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
};

const ROUTINE_STEPS: RoutineStep[] = [
  {
    id: "wake",
    title: "Rise & Shine",
    description: "Wake up, stretch big, and peek at the sunshine.",
    icon: "🌞",
    gradient: "from-amber-100 via-orange-50 to-rose-100",
  },
  {
    id: "pee",
    title: "Potty Break",
    description: "Hop to the potty for a quick morning tinkle.",
    icon: "🚽",
    gradient: "from-sky-100 via-blue-50 to-teal-100",
  },
  {
    id: "wash",
    title: "Sparkly Smile",
    description: "Brush those tiny teeth and splash your cheeks.",
    icon: "🪥",
    gradient: "from-emerald-100 via-lime-50 to-sky-100",
  },
  {
    id: "dress",
    title: "Dress-Up Time",
    description: "Pick today’s outfit and button it with pride.",
    icon: "🧦",
    gradient: "from-violet-100 via-purple-50 to-pink-100",
  },
  {
    id: "eat",
    title: "Yummy Breakfast",
    description: "Fuel up with delicious bites and sips.",
    icon: "🥣",
    gradient: "from-rose-100 via-pink-50 to-amber-100",
  },
  {
    id: "bag",
    title: "Ready for Preschool",
    description: "Pack your bag, grab your hugs, and zoom!",
    icon: "🎒",
    gradient: "from-sky-100 via-indigo-50 to-purple-100",
  },
];

type StepState = Record<string, boolean>;

const confettiColors = [
  "#FFC875",
  "#FF9FBB",
  "#AFE6FF",
  "#C4B5FF",
  "#9FF5C2",
  "#FFB482",
];

type ConfettiStyle = CSSProperties &
  Record<"--i" | "--confetti-color", string>;

export default function Home() {
  const [stepState, setStepState] = useState<StepState>(() =>
    Object.fromEntries(ROUTINE_STEPS.map((step) => [step.id, false]))
  );

  const completedCount = useMemo(
    () => ROUTINE_STEPS.filter((step) => stepState[step.id]).length,
    [stepState]
  );

  const progressPercent = Math.round(
    (completedCount / ROUTINE_STEPS.length) * 100
  );
  const allDone = completedCount === ROUTINE_STEPS.length;

  const toggleStep = (id: string) => {
    setStepState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetSteps = () => {
    setStepState(
      Object.fromEntries(ROUTINE_STEPS.map((step) => [step.id, false]))
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f6f8ff] via-[#fef6ff] to-[#f3fbff]">
      <FloatingBackground />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col gap-9 px-4 pb-24 pt-14 sm:px-6">
        <header className="flex items-center gap-4 rounded-[36px] bg-white/80 px-6 py-6 shadow-xl backdrop-blur-md sm:gap-6 sm:px-8">
          <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
            <MorningBuddyIllustration />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
              Good Morning, Star!
            </span>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              Your Sparkly Routine
            </h1>
            <p className="text-sm text-slate-500 sm:text-base">
              Tap a card each time you finish a step to light up the morning.
            </p>
          </div>
        </header>

        <section className="rounded-[34px] border border-white/60 bg-white/60 px-6 py-6 shadow-lg backdrop-blur-md sm:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">
                Progress
              </p>
              <p className="font-heading text-2xl font-semibold text-slate-900">
                {completedCount} / {ROUTINE_STEPS.length} steps
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-100 to-rose-100 text-xl font-semibold text-rose-500 shadow-inner">
              {progressPercent}%
            </div>
          </div>
          <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-slate-200/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-rose-300 to-sky-300 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
              aria-hidden
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          {ROUTINE_STEPS.map((step, index) => {
            const isComplete = stepState[step.id];
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => toggleStep(step.id)}
                aria-pressed={isComplete}
                className={`group relative flex items-center gap-4 rounded-[34px] border-2 px-5 py-4 text-left shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-4 sm:px-6 sm:py-5 ${
                  isComplete
                    ? "border-transparent bg-gradient-to-br from-emerald-100 via-rose-100 to-sky-100 text-slate-900 focus-visible:ring-emerald-300/60"
                    : "border-white/50 bg-white/70 text-slate-800 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-sky-200/70"
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-[26px] bg-gradient-to-br text-3xl shadow-md transition-transform duration-300 sm:h-20 sm:w-20 sm:text-4xl ${step.gradient}`}
                >
                  <span className="drop-shadow-sm">{step.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-300">
                    Step {index + 1}
                  </p>
                  <h2 className="font-heading text-xl font-semibold text-slate-900 sm:text-2xl">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 sm:text-base">
                    {step.description}
                  </p>
                </div>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-semibold transition-all duration-300 sm:h-14 sm:w-14 ${
                    isComplete
                      ? "border-transparent bg-emerald-400 text-white shadow-lg"
                      : "border-rose-200 bg-white/80 text-rose-200"
                  }`}
                  aria-hidden
                >
                  {isComplete ? "✓" : "★"}
                </span>
              </button>
            );
          })}
        </section>

        <section className="relative mt-4">
          {allDone ? (
            <RewardCard onReset={resetSteps} />
          ) : (
            <div className="rounded-[34px] border-2 border-dashed border-rose-200/70 bg-white/70 px-6 py-8 text-center shadow-inner backdrop-blur-sm sm:px-8">
              <p className="font-heading text-xl text-rose-500 sm:text-2xl">
                Finish every step to unlock your rainbow reward!
              </p>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Each tap lights up your morning like a sprinkle of fairy dust.
              </p>
            </div>
          )}
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
    <div className="relative overflow-hidden rounded-[34px] border border-amber-200/70 bg-gradient-to-br from-amber-100 via-pink-100 to-sky-100 px-6 py-9 text-center shadow-2xl backdrop-blur sm:px-10">
      <RewardConfetti />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.5em] text-amber-500">
          Reward Unlocked
        </span>
        <span className="text-6xl sm:text-7xl">🌈</span>
        <h3 className="font-heading text-3xl font-semibold text-slate-900 sm:text-4xl">
          Rainbow Super Star!
        </h3>
        <p className="text-sm text-slate-600 sm:text-base">
          You completed every step—time for a happy dance and a big high five!
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-rose-500 shadow-md transition hover:bg-white"
        >
          Do it again tomorrow ✨
        </button>
      </div>
    </div>
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
      <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-pink-200/50 blur-3xl sm:-left-16 sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -right-32 top-36 h-64 w-64 rounded-full bg-sky-200/60 blur-3xl sm:-right-24 sm:top-20 sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-100/60 blur-3xl sm:bottom-20 sm:h-96 sm:w-96" />
    </>
  );
}

function MorningBuddyIllustration() {
  return (
    <svg
      viewBox="0 0 140 140"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-[0_12px_24px_rgba(255,182,193,0.45)]"
    >
      <defs>
        <linearGradient id="buddyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffeab5" />
          <stop offset="100%" stopColor="#ffbde1" />
        </linearGradient>
        <radialGradient id="buddyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d1" />
          <stop offset="100%" stopColor="#ffbdd2" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      <circle cx="70" cy="70" r="60" fill="url(#buddyGradient)" />
      <circle
        cx="70"
        cy="70"
        r="56"
        fill="url(#buddyGlow)"
        opacity="0.5"
      />
      <ellipse cx="70" cy="82" rx="34" ry="22" fill="#ffffff" opacity="0.65" />
      <ellipse cx="50" cy="62" rx="8" ry="10" fill="#31315b" />
      <ellipse cx="90" cy="62" rx="8" ry="10" fill="#31315b" />
      <circle cx="48" cy="60" r="3" fill="#ffffff" />
      <circle cx="88" cy="60" r="3" fill="#ffffff" />
      <path
        d="M55 92 C62 98, 78 98, 85 92"
        stroke="#ff7a9f"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M38 45 Q70 20, 102 45"
        stroke="#ffe5f1"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="45" cy="82" r="8" fill="#ffcfdf" opacity="0.7" />
      <circle cx="95" cy="82" r="8" fill="#ffcfdf" opacity="0.7" />
      <circle cx="32" cy="90" r="6" fill="#fff4d6" opacity="0.8" />
      <circle cx="108" cy="90" r="6" fill="#fff4d6" opacity="0.8" />
      <circle cx="70" cy="28" r="7" fill="#fff4d6" opacity="0.85" />
    </svg>
  );
}
