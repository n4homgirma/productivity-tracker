export type Habit = {
  id: string;
  name: string;
  createdAt: string;
  date: string; // YYYY-MM-DD — which day this task belongs to
};

export type Completions = {
  [date: string]: string[];
};

export function getHabits(): Habit[] {
  const raw = localStorage.getItem("habits");
  return raw ? JSON.parse(raw) : [];
}

export function saveHabits(habits: Habit[]): void {
  localStorage.setItem("habits", JSON.stringify(habits));
}

export function getCompletions(): Completions {
  const raw = localStorage.getItem("completions");
  return raw ? JSON.parse(raw) : {};
}

export function saveCompletions(completions: Completions): void {
  localStorage.setItem("completions", JSON.stringify(completions));
}

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
