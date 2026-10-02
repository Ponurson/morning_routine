"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties, ReactElement } from "react";

type IconName = "sun" | "water" | "brush" | "cloak" | "feast" | "satchel";

type IconProps = {
  className?: string;
};

type RoutineStep = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  accent: string;
  initial: string;
};

const ROUTINE_STEPS: RoutineStep[] = [
  {
    id: "wake",
    title: "Powitanie świtu",
    description:
      "Rozsuń zasłony, przeciągnij się i wpuść pierwsze światło do komnaty.",
    icon: "sun",
    accent: "from-[#f0d28b] via-[#ca9f4f] to-[#8b5623]",
    initial: "P",
  },
  {
    id: "wash",
    title: "Źródlana świeżość",
    description:
      "Odwiedź umywalnię, obmyj dłonie i twarz, by zacząć dzień z czystą kartą.",
    icon: "water",
    accent: "from-[#d8d6b2] via-[#9ea17a] to-[#676945]",
    initial: "Ź",
  },
  {
    id: "smile",
    title: "Rycerski uśmiech",
    description:
      "Wyszoruj zęby starannie, aby uśmiech lśnił jak polerowana zbroja.",
    icon: "brush",
    accent: "from-[#f3e1bf] via-[#d5b179] to-[#966132]",
    initial: "R",
  },
  {
    id: "dress",
    title: "Szata na dzień",
    description:
      "Wybierz wygodne ubranie, popraw kołnierz i przygotuj się do wyjścia.",
    icon: "cloak",
    accent: "from-[#d5bea7] via-[#a27a5d] to-[#6a4631]",
    initial: "S",
  },
  {
    id: "breakfast",
    title: "Uczta o świcie",
    description:
      "Zjedz pożywne śniadanie i wypij ciepły napój przed dalszą drogą.",
    icon: "feast",
    accent: "from-[#f1d39c] via-[#d39b4d] to-[#8d4e21]",
    initial: "U",
  },
  {
    id: "bag",
    title: "Sakwa gotowa",
    description:
      "Spakuj plecak, zeszyty i drobiazgi, żeby nic nie zaginęło po drodze.",
    icon: "satchel",
    accent: "from-[#e6d2aa] via-[#bc9a62] to-[#7a5128]",
    initial: "S",
  },
];

type CompletionState = Record<string, boolean>;
type BurstState = Record<string, number>;

type GildingStyle = CSSProperties & Record<"--i" | "--flake-color", string>;

const gildingColors = [
  "#f5df9b",
  "#e0b865",
  "#d19b43",
  "#f3e7c3",
  "#c58a37",
];

const STEP_ICONS: Record<IconName, (props: IconProps) => ReactElement> = {
  sun: SunIcon,
  water: WaterIcon,
  brush: BrushIcon,
  cloak: CloakIcon,
  feast: FeastIcon,
  satchel: SatchelIcon,
};

const FLOATING_MOTES: CSSProperties[] = Array.from(
  { length: 18 },
  (_, index): CSSProperties => ({
    left: `${4 + ((index * 11) % 92)}%`,
    top: `${6 + ((index * 9) % 82)}%`,
    animationDelay: `${index * 0.45}s`,
    animationDuration: `${6 + (index % 5)}s`,
  })
);

const createInitialCompletionState = (): CompletionState =>
  Object.fromEntries(ROUTINE_STEPS.map((step) => [step.id, false]));

const createInitialBurstState = (): BurstState =>
  Object.fromEntries(ROUTINE_STEPS.map((step) => [step.id, 0]));

const getPolishCountWord = (
  value: number,
  one: string,
  few: string,
  many: string
): string => {
  const remainder10 = value % 10;
  const remainder100 = value % 100;

  if (value === 1) {
    return one;
  }

  if (
    remainder10 >= 2 &&
    remainder10 <= 4 &&
    (remainder100 < 12 || remainder100 > 14)
  ) {
    return few;
  }

  return many;
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

  const remainingCount = ROUTINE_STEPS.length - completedCount;
  const progressPercent = Math.round(
    (completedCount / ROUTINE_STEPS.length) * 100
  );
  const allDone = completedCount === ROUTINE_STEPS.length;
  const nextStep = ROUTINE_STEPS.find((step) => !completionState[step.id]);

  const handleTileToggle = (id: string) => {
    setCompletionState((previous) => {
      const nextValue = !previous[id];

      if (nextValue) {
        setBurstState((bursts) => ({
          ...bursts,
          [id]: (bursts[id] ?? 0) + 1,
        }));
      }

      return { ...previous, [id]: nextValue };
    });
  };

  const resetSteps = () => {
    setCompletionState(createInitialCompletionState());
    setBurstState(createInitialBurstState());
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-[#452715]">
      <ManuscriptBackground />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-start px-3 py-4 sm:px-6 sm:py-8">
        <div className="relative w-full overflow-hidden rounded-[32px] border border-[#8b5a2b]/30 bg-[#f8efdc]/88 px-4 py-6 shadow-[0_28px_90px_rgba(88,54,19,0.22)] backdrop-blur-[2px] sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          <FrameOrnaments />

          <header className="relative grid gap-8 border-b border-[#9f7b4a]/30 pb-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8e6234]">
                Karta porannego obrządku
              </p>
              <h1 className="font-heading mt-4 text-5xl leading-none text-[#4b2c18] sm:text-6xl lg:text-7xl">
                Poranny Kodeks
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#643f24] sm:text-lg">
                <span className="illuminated-initial">N</span>
                iech ten pergamin prowadzi przez kolejne zwyczaje poranka:
                światło, świeżość, odwaga, strój, śniadanie i gotowość do
                wyjścia. Każda ukończona karta przybliża do złoconej pieczęci
                dnia.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#6a4426]">
                <span className="rounded-full border border-[#a47b4c]/30 bg-[#fff9ed]/85 px-4 py-2">
                  Pismo z latin-ext
                </span>
                <span className="rounded-full border border-[#a47b4c]/30 bg-[#fff9ed]/85 px-4 py-2">
                  Polskie znaki: ąćęłńóśźż / ĄĆĘŁŃÓŚŹŻ
                </span>
              </div>
            </div>

            <aside className="relative overflow-hidden rounded-[28px] border border-[#8e6234]/30 bg-[linear-gradient(180deg,rgba(255,249,234,0.96),rgba(238,220,183,0.92))] p-6 shadow-inner shadow-[#d9b67a]/20">
              <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-[#a67a46]/40 to-transparent" />
              <div className="relative z-10 flex flex-col items-start">
                <div className="mx-auto h-28 w-28 sm:h-32 sm:w-32">
                  <ManuscriptSealIllustration />
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#8d6234]">
                  Zapis kronikarza
                </p>
                <p className="font-heading mt-3 text-3xl text-[#4b2c18] sm:text-4xl">
                  {completedCount} z {ROUTINE_STEPS.length}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#684226]">
                  {allDone
                    ? "Wszystkie karty zostały opatrzone pieczęcią. Dzień może się rozpocząć."
                    : `Najbliższa karta do odczytania: ${nextStep?.title}.`}
                </p>

                <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-[#ceb186]/55">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#8e5828_0%,#c4903d_50%,#f3dea2_100%)] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                    aria-hidden
                  />
                </div>

                <div className="mt-5 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <StatChip
                    label="Ukończono"
                    value={`${completedCount}`}
                    accent="bg-[#fff6e4]"
                  />
                  <StatChip
                    label="Pozostało"
                    value={`${remainingCount}`}
                    accent="bg-[#f6ebd1]"
                  />
                </div>
              </div>
            </aside>
          </header>

          <div className="ornament-divider my-8" aria-hidden>
            <span className="h-3 w-3 rotate-45 border border-[#9f7b4a]/60 bg-[#f6e9c8]" />
          </div>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)]">
            <div className="space-y-4">
              {ROUTINE_STEPS.map((step, index) => {
                const isComplete = completionState[step.id];
                const burstKey = `${step.id}-${burstState[step.id] ?? 0}`;
                const stepNumber = `${index + 1}`.padStart(2, "0");

                return (
                  <button
                    key={step.id}
                    type="button"
                    aria-pressed={isComplete}
                    onClick={() => handleTileToggle(step.id)}
                    className={`group relative flex w-full flex-col gap-4 overflow-hidden rounded-[26px] border px-5 py-5 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5a2b] sm:px-6 ${
                      isComplete
                        ? "border-[#8f6b33]/40 bg-[linear-gradient(135deg,rgba(251,243,220,0.98),rgba(232,208,162,0.94))] shadow-[0_16px_36px_rgba(133,90,32,0.18)]"
                        : "border-[#8f6b33]/25 bg-[rgba(255,250,238,0.74)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(133,90,32,0.16)]"
                    }`}
                  >
                    <div className="absolute inset-y-0 right-0 w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(181,139,68,0.08))]" />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex items-start gap-4">
                        <div
                          className={`relative flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br p-[1px] shadow-[0_10px_24px_rgba(89,55,23,0.22)] sm:h-20 sm:w-20 ${step.accent}`}
                        >
                          <div className="flex h-full w-full items-center justify-center rounded-[21px] bg-[#f7ecd2]">
                            <StepIcon
                              name={step.icon}
                              className="h-9 w-9 text-[#6a4020] sm:h-10 sm:w-10"
                            />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#8c6435]">
                              Karta {stepNumber}
                            </p>
                            <span className="rounded-full border border-[#b38b58]/25 bg-[#fff8ea]/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#7d5528]">
                              {isComplete
                                ? "Pieczęć odbita"
                                : "Czeka na pieczęć"}
                            </span>
                          </div>

                          <h2 className="font-heading mt-2 text-2xl text-[#4a2c18] sm:text-[2rem]">
                            {step.title}
                          </h2>
                          <p className="mt-1 text-base leading-7 text-[#654126]">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:ml-auto">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#9f7b4a]/35 bg-[#fff8e8] font-heading text-xl text-[#7d4d26] shadow-inner shadow-[#d8bc8d]/20">
                          {step.initial}
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7d5528] sm:text-sm">
                          {isComplete ? "Odczytane" : "Dotknij, aby odczytać"}
                        </span>
                      </div>
                    </div>

                    {isComplete ? (
                      <div key={burstKey} className="seal-burst" aria-hidden>
                        {Array.from({ length: 8 }).map((_, burstIndex) => (
                          <span key={burstIndex} />
                        ))}
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-6">
              <section className="rounded-[26px] border border-[#8f6b33]/25 bg-[rgba(255,248,234,0.86)] p-6 shadow-[0_18px_40px_rgba(94,61,27,0.14)]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8d6234]">
                  Margines kroniki
                </p>
                <h2 className="font-heading mt-3 text-3xl text-[#4b2c18]">
                  Dzisiejszy stan zapisu
                </h2>
                <p className="mt-3 text-base leading-7 text-[#654126]">
                  {allDone
                    ? "Każdy poranny zwyczaj został zapisany i opieczętowany. Pergamin jest kompletny."
                    : `Do końca zostało jeszcze ${remainingCount} ${
                        getPolishCountWord(
                          remainingCount,
                          "zadanie",
                          "zadania",
                          "zadań"
                        )
                      }. Najbliższa karta prowadzi do kroku: ${nextStep?.title}.`}
                </p>

                <div className="mt-5 rounded-[20px] border border-[#b8935f]/25 bg-[#fff9ec]/80 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6234]">
                    Podpowiedź
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#684226]">
                    Każde kliknięcie odciska pieczęć. Ponowne kliknięcie zdejmuje
                    ją, jeśli chcesz poprawić zapis.
                  </p>
                </div>
              </section>

              <section className="relative">
                {allDone ? (
                  <RewardCard onReset={resetSteps} />
                ) : (
                  <AwaitingSealCard
                    nextStepTitle={nextStep?.title ?? "Ostatnia karta"}
                    remainingCount={remainingCount}
                  />
                )}
              </section>

              <section className="rounded-[26px] border border-[#8f6b33]/25 bg-[rgba(255,248,234,0.84)] p-6 shadow-[0_18px_40px_rgba(94,61,27,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8d6234]">
                  Archiwum motywów
                </p>
                <h3 className="font-heading mt-3 text-2xl text-[#4a2c18] sm:text-3xl">
                  Poprzednie karty stylów
                </h3>
                <Link
                  href="/versions/sylwestrowy"
                  className="mt-5 inline-flex items-center rounded-full border border-[#9a6b30]/40 bg-[linear-gradient(135deg,#8e5828,#c78d3d)] px-5 py-3 text-sm font-semibold text-[#fff5dc] shadow-[0_12px_28px_rgba(121,76,28,0.2)] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Przełącz na styl sylwestrowy
                </Link>

                <div className="mt-5 flex flex-wrap gap-3">
                  <ArchiveLink href="/versions/initial" label="Pierwsza wersja" />
                  <ArchiveLink href="/versions/frozen" label="Kraina Lodu" />
                  <ArchiveLink href="/versions/halloween" label="Halloween" />
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ArchiveLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-[#9a7443]/35 bg-[#fff7e8] px-5 py-2 text-sm font-semibold text-[#6b4323] shadow-[0_8px_20px_rgba(103,67,35,0.12)] transition hover:-translate-y-0.5 hover:bg-[#f7ecd1]"
    >
      {label}
    </Link>
  );
}

function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className={`rounded-[18px] border border-[#b08a56]/20 px-4 py-3 ${accent}`}>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8c6435]">
        {label}
      </p>
      <p className="font-heading mt-2 text-2xl text-[#4b2c18]">{value}</p>
    </div>
  );
}

function AwaitingSealCard({
  nextStepTitle,
  remainingCount,
}: {
  nextStepTitle: string;
  remainingCount: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border-2 border-dashed border-[#9b7648]/35 bg-[rgba(250,242,224,0.8)] px-6 py-7 shadow-inner shadow-[#caa56f]/18">
      <div className="absolute right-4 top-4 h-16 w-16 rounded-full border border-[#b58a56]/25 bg-[#fff7e8]/60" />
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8d6234]">
        Pieczęć jutrzenki
      </p>
      <h3 className="font-heading mt-3 text-3xl text-[#4b2c18]">
        Jeszcze {remainingCount}{" "}
        {getPolishCountWord(remainingCount, "karta", "karty", "kart")}
      </h3>
      <p className="mt-2 text-base leading-7 text-[#654126]">
        Odczytaj pozostałe kroki, a na końcu pergamin odsłoni złocony znak
        ukończenia.
      </p>
      <p className="mt-4 rounded-[18px] border border-[#b8935f]/25 bg-[#fff9ec]/75 px-4 py-3 text-sm font-semibold text-[#7d5528]">
        Najbliższa karta: {nextStepTitle}
      </p>
    </div>
  );
}

type RewardCardProps = {
  onReset: () => void;
};

function RewardCard({ onReset }: RewardCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#8e6234]/35 bg-[linear-gradient(135deg,rgba(88,54,28,0.96),rgba(126,86,40,0.94),rgba(194,148,67,0.88))] px-6 py-8 text-[#fff7e2] shadow-[0_22px_50px_rgba(88,54,19,0.32)]">
      <RewardGilding />

      <div className="relative z-10 flex flex-col items-start gap-3 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2d690]">
          Pieczęć jutrzenki
        </p>
        <SealBadgeIcon className="h-16 w-16 text-[#fff1c8]" />
        <h3 className="font-heading text-3xl text-[#fff7e2] sm:text-4xl">
          Kodeks ukończony
        </h3>
        <p className="text-base leading-7 text-[#fff0cf]">
          Wszystkie rytuały są gotowe. Można ruszać w dzień z porządkiem,
          spokojem i pełnym ekwipunkiem.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-3 inline-flex items-center rounded-full border border-[#f0d89b]/40 bg-[#fff2ce]/12 px-5 py-2 text-sm font-semibold text-[#fff2ce] transition hover:bg-[#fff2ce]/20"
        >
          Spisz kodeks od nowa
        </button>
      </div>
    </div>
  );
}

function RewardGilding() {
  return (
    <div className="reward-gilding">
      {Array.from({ length: 18 }).map((_, index) => {
        const color = gildingColors[index % gildingColors.length];
        const style: GildingStyle = {
          "--i": index.toString(),
          "--flake-color": color,
          left: `${6 + ((index * 11) % 88)}%`,
          top: `${20 + ((index * 7) % 48)}%`,
        };

        return <span key={index} style={style} />;
      })}
    </div>
  );
}

function ManuscriptBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,248,232,0.95),rgba(255,248,232,0.18)_24%,rgba(255,248,232,0)_42%)]" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#b07a3b]/10 blur-[100px]" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#7c2e18]/8 blur-[120px]" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(156,117,63,0.18),transparent)]" />
      <div className="manuscript-dust">
        {FLOATING_MOTES.map((style, index) => (
          <span key={index} className="dust-mote" style={style} />
        ))}
      </div>
    </div>
  );
}

function FrameOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-4 rounded-[28px] border border-[#a87d47]/25" />
      <div className="absolute inset-[18px] rounded-[24px] border border-[#fff6df]/55" />
      <span className="absolute left-3 top-3 h-14 w-14 rounded-tl-[28px] border-l-2 border-t-2 border-[#8b5a2b]/35" />
      <span className="absolute right-3 top-3 h-14 w-14 rounded-tr-[28px] border-r-2 border-t-2 border-[#8b5a2b]/35" />
      <span className="absolute bottom-3 left-3 h-14 w-14 rounded-bl-[28px] border-b-2 border-l-2 border-[#8b5a2b]/35" />
      <span className="absolute bottom-3 right-3 h-14 w-14 rounded-br-[28px] border-b-2 border-r-2 border-[#8b5a2b]/35" />
    </div>
  );
}

function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="32" r="10" />
        <path d="M32 8v8" />
        <path d="M32 48v8" />
        <path d="M8 32h8" />
        <path d="M48 32h8" />
        <path d="M15 15l6 6" />
        <path d="M43 43l6 6" />
        <path d="M49 15l-6 6" />
        <path d="M21 43l-6 6" />
      </g>
    </svg>
  );
}

function WaterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 18h28l-4 22H22l-4-22Z" />
        <path d="M16 18c4-4 10-6 16-6s12 2 16 6" />
        <path d="M24 48c3 2 5 4 8 4s5-2 8-4" />
        <path d="M24 28c2 2 4 3 8 3s6-1 8-3" />
      </g>
    </svg>
  );
}

function BrushIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 40 38 16" />
        <path d="m38 16 10 10" />
        <path d="M16 42c-4 4-4 8-2 10s6 2 10-2l4-4-8-8-4 4Z" />
        <path d="M46 14l4-4" />
        <path d="M50 26l4-4" />
      </g>
    </svg>
  );
}

function CloakIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 14c2-3 6-5 8-5s6 2 8 5l6 36H18l6-36Z" />
        <path d="M24 14c2 4 5 6 8 6s6-2 8-6" />
        <path d="M28 28v22" />
        <path d="M36 28v22" />
      </g>
    </svg>
  );
}

function FeastIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 40c4-10 10-14 18-14s14 4 18 14" />
        <path d="M18 40h28a6 6 0 0 1 0 12H18a6 6 0 0 1 0-12Z" />
        <path d="M24 18c0 4 2 8 6 8" />
        <path d="M34 12v14" />
        <path d="M42 16c0 4-2 8-6 8" />
      </g>
    </svg>
  );
}

function SatchelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 22h28l-2 26H20l-2-26Z" />
        <path d="M24 22c0-6 4-10 8-10s8 4 8 10" />
        <path d="M18 26c4 6 10 9 14 9s10-3 14-9" />
        <path d="M28 34h8" />
      </g>
    </svg>
  );
}

function SealBadgeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 72" aria-hidden className={className} fill="none">
      <circle cx="36" cy="36" r="28" fill="currentColor" opacity="0.15" />
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M36 14l6 10 12 2-8 8 2 12-12-6-12 6 2-12-8-8 12-2Z" />
        <path d="M28 36c2 3 4 5 8 5s6-2 8-5" />
      </g>
    </svg>
  );
}

function ManuscriptSealIllustration() {
  return (
    <svg
      viewBox="0 0 140 140"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full drop-shadow-[0_14px_28px_rgba(154,110,48,0.18)]"
    >
      <defs>
        <linearGradient id="sealGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5de9d" />
          <stop offset="100%" stopColor="#b67d30" />
        </linearGradient>
      </defs>
      <circle cx="70" cy="70" r="54" fill="#f8edd3" stroke="#b68b4d" strokeWidth="3" />
      <circle cx="70" cy="70" r="42" fill="url(#sealGlow)" opacity="0.28" />
      <g
        fill="none"
        stroke="#6f421e"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 84V42h60v42" />
        <path d="M48 42c4 6 11 10 22 10s18-4 22-10" />
        <path d="M52 88h36" />
        <path d="M54 68h32" />
        <path d="M70 30v12" />
        <path d="M58 34h24" />
      </g>
      <circle cx="70" cy="69" r="6" fill="#8a5327" opacity="0.72" />
    </svg>
  );
}
