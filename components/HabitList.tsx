"use client";

import { Habit } from "@/lib/storage";

type Props = {
  habits: Habit[];
  completedIds: string[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function HabitList({
  habits,
  completedIds,
  onToggle,
  onDelete,
}: Props) {
  if (habits.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400 py-8">
        No habits yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {habits.map((habit) => {
        const done = completedIds.includes(habit.id);
        return (
          <li
            key={habit.id}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
          >
            <input
              type="checkbox"
              checked={done}
              onChange={() => onToggle(habit.id)}
              className="h-4 w-4 cursor-pointer accent-indigo-600"
            />
            <span
              className={`flex-1 text-sm ${
                done ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {habit.name}
            </span>
            <button
              onClick={() => onDelete(habit.id)}
              aria-label={`Delete ${habit.name}`}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
