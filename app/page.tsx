"use client";

import { useEffect, useState } from "react";
import AddHabitForm from "@/components/AddHabitForm";
import HabitList from "@/components/HabitList";
import ProgressBar from "@/components/ProgressBar";
import {
  Habit,
  Completions,
  getHabits,
  saveHabits,
  getCompletions,
  saveCompletions,
  today,
} from "@/lib/storage";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getWeekDays(): Date[] {
  const now = new Date();
  const dow = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
  monday.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function dateToKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getMonthCompletions(
  completions: Completions,
  year: number,
  month: number
): number {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return Object.entries(completions)
    .filter(([date]) => date.startsWith(prefix))
    .reduce((sum, [, ids]) => sum + ids.length, 0);
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Completions>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHabits(getHabits());
    setCompletions(getCompletions());
    setMounted(true);
  }, []);

  function addHabit(name: string) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };
    const updated = [...habits, newHabit];
    setHabits(updated);
    saveHabits(updated);
  }

  function deleteHabit(id: string) {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    saveHabits(updated);
    const updatedCompletions: Completions = {};
    for (const [date, ids] of Object.entries(completions)) {
      const filtered = ids.filter((i) => i !== id);
      if (filtered.length > 0) updatedCompletions[date] = filtered;
    }
    setCompletions(updatedCompletions);
    saveCompletions(updatedCompletions);
  }

  function toggleCompletion(id: string) {
    const date = today();
    const current = completions[date] ?? [];
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    const updatedCompletions = { ...completions, [date]: updated };
    setCompletions(updatedCompletions);
    saveCompletions(updatedCompletions);
  }

  const todayKey = today();
  const todayIds = completions[todayKey] ?? [];
  const weekDays = getWeekDays();
  const totalHabits = habits.length;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const weekCompleted = weekDays.reduce(
    (sum, day) => sum + (completions[dateToKey(day)]?.length ?? 0),
    0
  );
  const weekPct =
    totalHabits > 0 ? Math.round((weekCompleted / totalHabits) * 100) : 0;

  const totalEverCompleted = Object.values(completions).reduce(
    (sum, ids) => sum + ids.length,
    0
  );
  const overallPct =
    totalHabits > 0
      ? Math.round((totalEverCompleted / totalHabits) * 100)
      : 0;

  if (!mounted) return null;

  return (
    <main className="h-[calc(100vh-56px)] overflow-hidden bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-6xl h-full flex gap-4">

        {/* Card 1: Monthly Progress */}
        <div className="w-64 flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="overflow-y-auto flex-1 px-5 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Progress
            </h2>
            <div className="space-y-3">
              {MONTH_NAMES.map((name, month) => {
                const isFuture = month > currentMonth;
                const isCurrentMonth = month === currentMonth;
                const completed = getMonthCompletions(completions, currentYear, month);
                const pct =
                  totalHabits > 0 && !isFuture
                    ? Math.round((completed / totalHabits) * 100)
                    : 0;
                const isComplete = pct === 100 && totalHabits > 0;

                return (
                  <div key={month} className={isFuture ? "opacity-40" : ""}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-medium ${
                            isCurrentMonth ? "text-blue-600" : "text-gray-700"
                          }`}
                        >
                          {name}
                        </span>
                        {isCurrentMonth && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium leading-none">
                            Now
                          </span>
                        )}
                      </div>
                      {!isFuture && totalHabits > 0 && (
                        <span className="text-xs text-gray-400">{pct}%</span>
                      )}
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isComplete
                            ? "bg-green-500"
                            : isCurrentMonth
                            ? "bg-blue-500"
                            : "bg-indigo-300"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall cumulative */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs font-semibold text-gray-700">Overall</span>
                <span className="text-xs text-gray-400">
                  {totalEverCompleted}&nbsp;/&nbsp;
                  {totalHabits > 0 ? totalHabits : "—"}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {totalHabits > 0
                  ? `${overallPct}% overall completion`
                  : "No habits tracked yet"}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Weekly Progress */}
        <div className="w-64 flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="overflow-y-auto flex-1 px-5 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Week&apos;s Progress
            </h2>
            <div className="space-y-3">
              {weekDays.map((day, i) => {
                const key = dateToKey(day);
                const dayStart = new Date(day);
                dayStart.setHours(0, 0, 0, 0);
                const isFuture = dayStart > startOfToday;
                const isToday = key === todayKey;
                const completed = completions[key]?.length ?? 0;
                const pct =
                  totalHabits > 0 && !isFuture
                    ? Math.round((completed / totalHabits) * 100)
                    : 0;
                const isComplete = pct === 100 && totalHabits > 0;

                return (
                  <div key={key} className={isFuture ? "opacity-40" : ""}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-sm font-medium ${
                            isToday ? "text-blue-600" : "text-gray-700"
                          }`}
                        >
                          {DAY_NAMES[i]}
                        </span>
                        <span className="text-xs text-gray-400">
                          {day.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {isToday && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-medium leading-none">
                            Today
                          </span>
                        )}
                      </div>
                      {!isFuture && totalHabits > 0 && (
                        <span className="text-xs text-gray-400">{pct}%</span>
                      )}
                    </div>

                    {isFuture ? (
                      <button className="text-xs text-blue-500 border border-blue-200 rounded-md px-2.5 py-1 hover:bg-blue-50 transition-colors">
                        Plan Tasks
                      </button>
                    ) : (
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isComplete
                              ? "bg-green-500"
                              : isToday
                              ? "bg-blue-500"
                              : "bg-green-400"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Weekly cumulative */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs font-semibold text-gray-700">
                  Weekly Total
                </span>
                <span className="text-xs text-gray-400">
                  {weekCompleted}&nbsp;/&nbsp;
                  {totalHabits > 0 ? totalHabits : "—"}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${weekPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {totalHabits > 0
                  ? `${weekPct}% of habits completed this week`
                  : "No habits tracked yet"}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Daily Progress */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <ProgressBar done={todayIds.length} total={habits.length} />
            <AddHabitForm onAdd={addHabit} />
            <HabitList
              habits={habits}
              completedIds={todayIds}
              onToggle={toggleCompletion}
              onDelete={deleteHabit}
            />
          </div>
        </div>

      </div>
    </main>
  );
}
