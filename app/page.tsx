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

  const todayIds = completions[today()] ?? [];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <ProgressBar done={todayIds.length} total={habits.length} />

        <AddHabitForm onAdd={addHabit} />

        <HabitList
          habits={habits}
          completedIds={todayIds}
          onToggle={toggleCompletion}
          onDelete={deleteHabit}
        />
      </div>
    </main>
  );
}
