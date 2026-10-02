"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import wakeImg from "./assets/wake.webp";
import pottyImg from "./assets/potty.webp";
import teethImg from "./assets/teeth.webp";
import dressImg from "./assets/dress.webp";
import breakfastImg from "./assets/breakfast.webp";
import hairImg from "./assets/hair.webp";
import foxImg from "./assets/fox.webp";

type RoutineStep = {
  id: string;
  label: string;
  image: StaticImageData;
  tint: string;
};

const ROUTINE_STEPS: RoutineStep[] = [
  { id: "wake", label: "Wstałem/am", image: wakeImg, tint: "bg-[#fff1d6]" },
  { id: "potty", label: "Zrobiłem/am siku", image: pottyImg, tint: "bg-[#ffe4ec]" },
  { id: "teeth", label: "Umyłem/am zęby", image: teethImg, tint: "bg-[#e3f0ff]" },
  { id: "dress", label: "Ubrałem/am się", image: dressImg, tint: "bg-[#ffe9f3]" },
  { id: "breakfast", label: "Zjadłem/am śniadanie", image: breakfastImg, tint: "bg-[#fff0dc]" },
  { id: "hair", label: "Uczesałem/am się", image: hairImg, tint: "bg-[#e6f5e4]" },
];

const FOX_LINES = [
  "Dzień dobry! Zaczynamy przygodę?",
  "Brawo! Pierwszy krok za Tobą!",
  "Super Ci idzie!",
  "Jesteś dzielny/a!",
  "Jeszcze tylko trochę!",
  "Ostatni krok, dasz radę!",
  "Jesteś wspaniały/a! Przygoda czeka!",
];

const LEAVES: CSSProperties[] = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  animationDelay: `${(i * 1.3) % 9}s`,
  animationDuration: `${9 + (i % 5) * 2}s`,
  fontSize: `${18 + (i % 4) * 6}px`,
}));

// ponytail: progress resets daily by keying storage on the date
const storageKey = () => `moj-poranek-${new Date().toDateString()}`;

export default function Home() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [popId, setPopId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey());
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
      if (saved) setDone(JSON.parse(saved));
    } catch {}
  }, []);

  const save = (next: Record<string, boolean>) => {
    setDone(next);
    try {
      localStorage.setItem(storageKey(), JSON.stringify(next));
    } catch {}
  };

  const toggle = (id: string) => {
    if (!done[id]) setPopId(id);
    save({ ...done, [id]: !done[id] });
  };

  const count = ROUTINE_STEPS.filter((s) => done[s.id]).length;
  const total = ROUTINE_STEPS.length;
  const allDone = count === total;

  return (
    <div className="candy relative min-h-screen overflow-hidden">
      <div className="candy-bg" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        {LEAVES.map((style, i) => (
          <span key={i} className="leaf" style={style}>
            {i % 3 === 0 ? "🍂" : "🍁"}
          </span>
        ))}
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pb-10 pt-6">
        <header className="flex items-start justify-between gap-3">
          <div className="wobble rounded-[28px] bg-white/85 px-5 py-3 shadow-[0_10px_30px_rgba(214,110,60,0.25)]">
            <h1 className="text-[2.6rem] font-extrabold leading-[0.9]">
              <span className="text-[#e5455f]">Mój</span>{" "}
              <span className="text-[#8a3fa0]">poranek</span>{" "}
              <span className="inline-block animate-bounce">🌰</span>
            </h1>
            <p className="mt-1 text-sm font-semibold text-[#7a4a2a]">
              Małe kroki do wielkich przygód!
            </p>
          </div>
          <div className="sticky-note shrink-0 rotate-3 px-3 py-3 text-center text-sm font-bold leading-tight text-[#7a3b1d]">
            Dasz radę!
            <br />
            Każdy dzień
            <br />
            to nowa
            <br />
            przygoda! 💖
          </div>
        </header>

        <section className="rounded-[26px] bg-white/90 px-5 py-4 shadow-[0_10px_30px_rgba(214,110,60,0.2)]">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-[#8a3fa0]">
              {allDone ? "Hura! Wszystko gotowe!" : "Super Ci idzie!"}
            </p>
            <p className="text-2xl font-extrabold text-[#5b2d6e]">
              {count}/{total} <span className="text-[#e5455f]">❤</span>
            </p>
          </div>
          <div className="mt-2 h-5 overflow-hidden rounded-full border-2 border-[#f3d9c4] bg-[#fdf3ea]">
            <div
              className="candy-progress h-full rounded-full transition-all duration-700"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {ROUTINE_STEPS.map((step, index) => {
            const isDone = !!done[step.id];
            return (
              <button
                key={step.id}
                type="button"
                aria-pressed={isDone}
                onClick={() => toggle(step.id)}
                onAnimationEnd={(e) => {
                  if (e.target === e.currentTarget) setPopId(null);
                }}
                className={`relative flex flex-col overflow-hidden rounded-[24px] border-4 bg-white/95 p-2 text-left shadow-[0_8px_20px_rgba(214,110,60,0.2)] transition active:scale-95 ${
                  isDone ? "border-[#7fd18b]" : "border-white"
                } ${popId === step.id ? "card-pop" : ""}`}
              >
                <span
                  className={`absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full text-lg font-extrabold text-white shadow ${
                    isDone ? "bg-[#3fae55]" : "bg-[#f06a85]"
                  }`}
                >
                  {index + 1}
                </span>
                <div className={`overflow-hidden rounded-[18px] ${step.tint}`}>
                  <Image
                    src={step.image}
                    alt=""
                    className={`aspect-square w-full object-cover transition ${
                      isDone ? "" : "saturate-[0.85]"
                    }`}
                  />
                </div>
                <div className="flex flex-1 items-center justify-between gap-2 px-1 pt-2">
                  <span className="text-[0.95rem] font-bold leading-tight text-[#4a2a5c]">
                    {step.label}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-[3px] text-xl font-black text-white transition ${
                      isDone
                        ? "check-in border-[#3fae55] bg-[#3fae55]"
                        : "border-[#e8d6cc] bg-white"
                    }`}
                  >
                    {isDone ? "✓" : ""}
                  </span>
                </div>
                {popId === step.id ? (
                  <span className="heart-burst" aria-hidden>
                    {["💖", "⭐", "💛", "🌟", "💗", "✨"].map((h, i) => (
                      <span key={i} style={{ "--i": i } as CSSProperties}>
                        {h}
                      </span>
                    ))}
                  </span>
                ) : null}
              </button>
            );
          })}
        </section>

        <section className="flex items-end gap-2">
          <Image
            src={foxImg}
            alt="Lisek"
            className={`w-36 shrink-0 drop-shadow-lg ${allDone ? "fox-dance" : "fox-bob"}`}
          />
          <div className="speech mb-10 flex-1 rounded-[24px] bg-white/95 px-4 py-3 text-center text-lg font-bold leading-snug text-[#8a3a2a] shadow-[0_8px_20px_rgba(214,110,60,0.2)]">
            <span key={count} className="inline-block card-pop">
              {FOX_LINES[count]}
            </span>
            {allDone ? (
              <button
                type="button"
                onClick={() => save({})}
                className="mt-2 block w-full rounded-full bg-[#f06a85] px-4 py-2 text-sm font-bold text-white shadow active:scale-95"
              >
                Jutro od nowa 🌅
              </button>
            ) : null}
          </div>
        </section>

        {allDone ? (
          <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
            {LEAVES.map((style, i) => (
              <span key={i} className="confetti" style={style}>
                {["💖", "⭐", "🎉", "💛", "🌟"][i % 5]}
              </span>
            ))}
          </div>
        ) : null}

        <footer className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold">
          {[
            ["/versions/manuskrypt", "Manuskrypt"],
            ["/versions/sylwestrowy", "Sylwester"],
            ["/versions/halloween", "Halloween"],
            ["/versions/frozen", "Kraina Lodu"],
            ["/versions/initial", "Pierwsza wersja"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full bg-white/70 px-3 py-1 text-[#7a4a2a] hover:bg-white"
            >
              {label}
            </Link>
          ))}
        </footer>
      </main>
    </div>
  );
}
