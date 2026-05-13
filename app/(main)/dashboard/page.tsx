"use client";

import { useEffect, useState } from "react";
import {
  Habit,
  Completions,
  getHabits,
  saveHabits,
  getCompletions,
  saveCompletions,
  today,
} from "@/lib/storage";

const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_SHORT   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DAY_FULL    = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];


function dateToKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getDaysCompletedInMonth(c: Completions, y: number, m: number) {
  const pre = `${y}-${String(m + 1).padStart(2, "0")}`;
  return Object.keys(c).filter((d) => d.startsWith(pre) && c[d].length > 0).length;
}
function getWeekDays(start: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i); return d;
  });
}
function getWeeksOfMonth(year: number, month: number): Array<{ start: Date; end: Date }> {
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0); lastDay.setHours(23, 59, 59, 999);
  const dow = firstDay.getDay();
  const firstMonday = new Date(firstDay);
  firstMonday.setDate(firstDay.getDate() - (dow === 0 ? 6 : dow - 1));
  firstMonday.setHours(0, 0, 0, 0);
  const weeks: Array<{ start: Date; end: Date }> = [];
  let cur = new Date(firstMonday);
  while (cur <= lastDay) {
    const start = new Date(cur);
    const end   = new Date(cur); end.setDate(cur.getDate() + 6); end.setHours(23, 59, 59, 999);
    weeks.push({ start, end });
    cur.setDate(cur.getDate() + 7);
  }
  return weeks;
}
function fmtMonthDay(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function getWeekStartFromDate(d: Date): Date {
  const dow = d.getDay();
  const mon = new Date(d);
  mon.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
  mon.setHours(0, 0, 0, 0);
  return mon;
}

export default function Home() {
  const [habits, setHabits]         = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Completions>({});
  const [mounted, setMounted]       = useState(false);
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(() => {
    const n = new Date();
    const weeks = getWeeksOfMonth(n.getFullYear(), n.getMonth());
    const t = new Date(); t.setHours(0, 0, 0, 0);
    const idx = weeks.findIndex((w) => t >= w.start && t <= w.end);
    return Math.max(0, idx);
  });
  const [newHabit, setNewHabit]     = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d;
  });

  useEffect(() => {
    setHabits(getHabits());
    setCompletions(getCompletions());
    setMounted(true);
  }, []);

  function addHabit(name: string, dateKey: string) {
    const h: Habit = { id: crypto.randomUUID(), name, createdAt: new Date().toISOString(), date: dateKey };
    const next = [...habits, h];
    setHabits(next); saveHabits(next);
  }
  function deleteHabit(id: string) {
    const next = habits.filter((h) => h.id !== id);
    setHabits(next); saveHabits(next);
    const nc: Completions = {};
    for (const [date, ids] of Object.entries(completions)) {
      const f = ids.filter((i) => i !== id);
      if (f.length) nc[date] = f;
    }
    setCompletions(nc); saveCompletions(nc);
  }
  function toggleCompletion(id: string, dateKey: string) {
    const cur = completions[dateKey] ?? [];
    const updated = cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id];
    const nc = { ...completions, [dateKey]: updated };
    setCompletions(nc); saveCompletions(nc);
  }
  function handleAdd(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const t = newHabit.trim();
    if (t) { addHabit(t, dateToKey(selectedDate)); setNewHabit(""); }
  }

  const todayKey   = today();
  const now        = new Date();
  const currentYear  = now.getFullYear();
  const currentMonth = now.getMonth();
  const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);

  const selectedDateKey  = dateToKey(selectedDate);
  const selectedDateHabits = habits.filter((h) => h.date === selectedDateKey);
  const selectedDateIds  = completions[selectedDateKey] ?? [];
  const dailyMode: "today" | "history" | "plan" =
    selectedDateKey === todayKey     ? "today" :
    selectedDateKey < todayKey       ? "history" : "plan";
  const dailyWeekDays    = getWeekDays(getWeekStartFromDate(selectedDate));

  const weeksOfMonth  = getWeeksOfMonth(currentYear, currentMonth);
  const selectedWeek  = weeksOfMonth[selectedWeekIdx] ?? weeksOfMonth[0];
  const weekDays      = getWeekDays(selectedWeek.start);
  const weekCompleted = weekDays.reduce((s, d) => {
    const k = dateToKey(d);
    const dayHabits = habits.filter((h) => h.date === k);
    const done = (completions[k] ?? []).filter((id) => dayHabits.some((h) => h.id === id)).length;
    return s + done;
  }, 0);
  const weekTotal = weekDays.reduce((s, d) => s + habits.filter((h) => h.date === dateToKey(d)).length, 0);
  const weekPct   = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0;

  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  if (!mounted) return null;

  return (
    <main className="flex-1 overflow-hidden flex bg-white pl-5">

      {/* ── Year timeline sidebar ── */}
      <aside className="w-[103px] flex-shrink-0 relative flex flex-col items-center justify-center px-2.5 py-5">
        <div className="flex flex-col items-center justify-between gap-3.5 h-full relative z-10 w-full">
          {yearRange.map((year) => {
            const isPast    = year < currentYear;
            const isCurrent = year === currentYear;

            if (isCurrent) return (
              <div key={year}
                className="bg-[#ff9060] border border-[#ff8a57] drop-shadow-[0px_0px_4px_rgba(255,144,96,0.5)] flex flex-col items-center justify-center px-2.5 py-[5px] rounded-[14px] text-white whitespace-nowrap w-full"
              >
                <span className="text-[8px] leading-none">You Joined •</span>
                <span className="text-base font-bold leading-snug">{year}</span>
              </div>
            );

            if (isPast) return (
              <div key={year} className="bg-[#efefef] flex items-center gap-1 px-2.5 py-[5px] rounded-[10px] w-full justify-center">
                <svg className="w-2.5 h-2.5 text-[#b1b1b1] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                <span className="text-[10px] text-[#b1b1b1] line-through italic">{year}</span>
              </div>
            );

            return (
              <div key={year} className="bg-[#efefef] flex items-center gap-1 px-2.5 py-[5px] rounded-[10px] w-full justify-center">
                <svg className="w-2.5 h-2.5 text-[#b1b1b1] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                  <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                </svg>
                <span className="text-[10px] text-[#b1b1b1] italic">{year}</span>
              </div>
            );
          })}
        </div>
        {/* fade top */}
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white to-transparent pointer-events-none z-20" />
        {/* fade bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
      </aside>

      {/* ── Right column ── */}
      <div className="flex-1 flex flex-col gap-0 pl-5 pr-5 pt-2.5 pb-4 overflow-hidden min-w-0">

        {/* Three cards */}
        <div className="flex gap-5 flex-1 min-h-0 mb-4">

          {/* ── Monthly Card ── */}
          <div className="w-[323px] flex-shrink-0 bg-[#fffbf9] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden h-full">
            <div className="flex flex-col gap-4 p-[15px] h-full overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#ffeee6] rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#ff9060]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <h2 className="text-base font-bold text-[#ff9060]">Monthly Progress</h2>
                </div>
                <span className="text-sm font-bold text-[#ff9060]">{currentYear}</span>
              </div>

              {/* Banner image */}
              <div className="relative h-[72px] rounded-xl overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-[#fff4f0] rounded-xl" />
                <img
                  src="https://www.figma.com/api/mcp/asset/cf006d8e-e3ee-462d-94eb-9f92d4ce08ce"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Month list */}
              <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0">
                {MONTH_SHORT.map((name, month) => {
                  const isFuture  = month > currentMonth;
                  const isCurrent = month === currentMonth;
                  const isPast    = month < currentMonth;
                  const days         = getDaysInMonth(currentYear, month);
                  const daysCompleted = isFuture ? 0 : getDaysCompletedInMonth(completions, currentYear, month);
                  const pct = days > 0 && !isFuture ? Math.round((daysCompleted / days) * 100) : 0;

                  if (isCurrent) return (
                    <div key={month} className="bg-[#ffeae0] flex items-center gap-2 h-[30.5px] px-2 py-1.5 rounded-lg">
                      <span className="text-xs font-semibold text-[#ff9060] w-6 flex-shrink-0">{name}</span>
                      <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff9060] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-[#6a7282] w-8 text-right flex-shrink-0">{pct}%</span>
                    </div>
                  );

                  if (isPast) return (
                    <div key={month} className="bg-white border border-[#ffded0] flex items-center gap-2 h-[30.5px] px-[9px] py-[7px] rounded-lg">
                      <span className="text-xs text-[#6a7282] line-through w-6 flex-shrink-0">{name}</span>
                      <div className="flex-1 h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ffded0] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-[#6a7282] w-8 text-right flex-shrink-0">{pct}%</span>
                    </div>
                  );

                  return (
                    <div key={month} className="border border-[#ffded0] flex items-center gap-2 h-[30.5px] opacity-40 px-[9px] py-[7px] rounded-lg">
                      <span className="text-xs text-[#6a7282] w-6 flex-shrink-0">{name}</span>
                      <div className="flex-1 h-1.5 bg-[#f3f4f6] rounded-full" />
                      <span className="text-xs text-[#6a7282] w-8 text-right flex-shrink-0">0%</span>
                    </div>
                  );
                })}
              </div>

              {/* Annual report btn */}
              <div className="bg-[#ffeee6] rounded-xl h-[42px] flex items-center justify-center gap-2 flex-shrink-0 opacity-50 cursor-not-allowed">
                <svg className="w-5 h-5 text-[#ff9060]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-xs text-[#ff9060] capitalize">Get Annual Productivity Report</span>
              </div>
            </div>
          </div>

          {/* ── Weekly Card ── */}
          <div className="w-[324px] flex-shrink-0 bg-[#f9fdff] border border-[#e3f6ff] rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden h-full">
            <div className="flex flex-col gap-3 px-[10.5px] py-[14.5px] h-full overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between flex-shrink-0 px-[3px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-[#eff6ff] rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <h2 className="text-base font-bold text-[#0ea5e9]">Weekly Progress</h2>
                </div>
                <div className="relative bg-[#f0f9ff] rounded-[10px] flex items-center pl-3 pr-7 py-[5px]">
                  <span className="text-xs font-medium text-[#0ea5e9] pointer-events-none whitespace-nowrap">
                    Week {selectedWeekIdx + 1}
                  </span>
                  <select
                    value={selectedWeekIdx}
                    onChange={(e) => setSelectedWeekIdx(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  >
                    {weeksOfMonth.map((w, idx) => {
                      const t = new Date(); t.setHours(0,0,0,0);
                      const isCurrent = t >= w.start && t <= w.end;
                      return (
                        <option key={idx} value={idx}>
                          Week {idx + 1}{isCurrent ? " · Current" : ""}
                        </option>
                      );
                    })}
                  </select>
                  <svg className="w-3 h-3 text-[#0ea5e9] absolute right-2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>

              {/* Day list */}
              <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
                {weekDays.map((day, i) => {
                  const key        = dateToKey(day);
                  const ds         = new Date(day); ds.setHours(0, 0, 0, 0);
                  const isFuture   = ds > startOfToday;
                  const isToday    = key === todayKey;
                  const dayHabits  = habits.filter((h) => h.date === key);
                  const dayTotal   = dayHabits.length;
                  const count      = (completions[key] ?? []).filter((id) => dayHabits.some((h) => h.id === id)).length;
                  const pct        = dayTotal > 0 && !isFuture ? Math.round((count / dayTotal) * 100) : 0;
                  const date       = fmtMonthDay(day);

                  if (isToday) return (
                    <div key={key} className="bg-[#e3f6ff] border-l-[3px] border-[#0ea5e9] pl-[13px] pr-[10px] py-[10px] rounded-lg flex items-center gap-2">
                      <div className="w-[56px] flex-shrink-0">
                        <span className="block text-xs font-bold text-[#0ea5e9] leading-4">{DAY_SHORT[i]}</span>
                        <span className="block text-[10px] text-[#0ea5e9] leading-3 mt-0.5">{date}</span>
                      </div>
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#0ea5e9] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-[#0ea5e9] w-10 text-right flex-shrink-0">{count} / {dayTotal}</span>
                    </div>
                  );

                  if (isFuture) return (
                    <div key={key} className="bg-white border border-[#e3f6ff] px-[10.5px] py-[10.5px] rounded-lg flex items-center gap-2 opacity-40">
                      <div className="w-[55px] flex-shrink-0">
                        <span className="block text-xs font-bold text-[#868686] leading-4">{DAY_FULL[i]}</span>
                        <span className="block text-[10px] text-[#99a1af] leading-3 mt-0.5">{date}</span>
                      </div>
                      <div className="flex-1 h-2 bg-[#f3f4f6] rounded-full" />
                      <span className="text-xs text-[#99a1af] w-10 text-right flex-shrink-0">{count} / {dayTotal}</span>
                    </div>
                  );

                  return (
                    <div key={key} className="bg-white border border-[#e3f6ff] px-[10.5px] py-[10.5px] rounded-lg flex items-center gap-2">
                      <div className="w-[55px] flex-shrink-0">
                        <span className="block text-xs font-bold text-[#0ea5e9] line-through leading-4">{DAY_FULL[i]}</span>
                        <span className="block text-[10px] text-[#99a1af] leading-3 mt-0.5">{date}</span>
                      </div>
                      <div className="flex-1 h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0ea5e9] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-[#99a1af] w-10 text-right flex-shrink-0">{count} / {dayTotal}</span>
                    </div>
                  );
                })}
              </div>

              {/* Weekly Goal */}
              <div className="bg-[#eff6ff] rounded-xl p-3 flex-shrink-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span className="text-xs font-bold text-[#364153]">Weekly Progress</span>
                  </div>
                  <span className="text-xs font-bold text-[#0ea5e9]">{weekCompleted} / {weekTotal}</span>
                </div>
                <p className="text-xs text-[#99a1af] mb-2">Your total completed tasks this week</p>
                <div className="h-1.5 bg-[#dbeafe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0ea5e9] rounded-full transition-all duration-300" style={{ width: `${weekPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Daily Card ── */}
          <div className="flex-1 bg-white rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden min-w-0 h-full">
            <div className="flex flex-col gap-4 p-[15px] h-full overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center border bg-[#f0fdf4] border-[#d4f3e0]">
                    <svg className="w-5 h-5 text-[#00a63e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <h2 className="text-base font-bold text-[#00a63e]">Daily Tasks</h2>
                </div>
                <div className="flex items-center gap-5">
                  {/* Mode badge */}
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-xl border ${
                    dailyMode === "today"   ? "bg-[#f0fdf4] border-[#d4f3e0]" :
                    dailyMode === "history" ? "bg-[#f8fafc] border-[#e2e8f0]" :
                                             "bg-[#f0f9ff] border-[#bae6fd]"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      dailyMode === "today"   ? "bg-[#15803d]" :
                      dailyMode === "history" ? "bg-[#334155]" :
                                               "bg-[#0369a1]"
                    }`} />
                    <span className={`text-xs font-medium ${
                      dailyMode === "today"   ? "text-[#15803d]" :
                      dailyMode === "history" ? "text-[#334155]" :
                                               "text-[#0369a1]"
                    }`}>
                      {dailyMode === "today" ? "Today" : dailyMode === "history" ? "History" : "Plan Mode"}
                    </span>
                  </div>
                  {/* Date picker */}
                  <div className={`relative flex items-center pl-4 pr-7 py-[5px] rounded-[10px] ${
                    dailyMode === "today"   ? "bg-[#f0fdf4]" :
                    dailyMode === "history" ? "bg-[#f8fafc]" :
                                             "bg-[#f0f9ff]"
                  }`}>
                    <select
                      value={selectedDateKey}
                      onChange={(e) => {
                        const [y, m, day] = e.target.value.split("-").map(Number);
                        const d = new Date(y, m - 1, day);
                        setSelectedDate(d);
                      }}
                      className={`text-xs font-medium bg-transparent border-none outline-none cursor-pointer appearance-none whitespace-nowrap ${
                        dailyMode === "today"   ? "text-[#147b3b]" :
                        dailyMode === "history" ? "text-[#313e52]" :
                                                 "text-[#03659b]"
                      }`}
                    >
                      {dailyWeekDays.map((d) => {
                        const key = dateToKey(d);
                        const isToday = key === todayKey;
                        return (
                          <option key={key} value={key}>
                            {d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}{isToday ? " · Today" : ""}
                          </option>
                        );
                      })}
                    </select>
                    <svg className={`w-3 h-3 absolute right-2 pointer-events-none ${
                      dailyMode === "today"   ? "text-[#147b3b]" :
                      dailyMode === "history" ? "text-[#313e52]" :
                                               "text-[#03659b]"
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>

              {/* Task list */}
              <div className="flex-1 border border-[#f4f4f4] rounded-[10px] overflow-hidden min-h-0">
                <div className="h-full overflow-y-auto">
                  {selectedDateHabits.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-[#99a1af]">No tasks yet. Add one below!</p>
                    </div>
                  )}
                  <div className="flex flex-col px-1 py-1.5">
                    {selectedDateHabits.map((habit, idx) => {
                      const isDone = selectedDateIds.includes(habit.id);
                      const isLast = idx === selectedDateHabits.length - 1;
                      const checkStroke = dailyMode === "today" ? "#00a63e" : dailyMode === "history" ? "#64748b" : "#0369a1";
                      const checkFill   = dailyMode === "today" ? "#f0fdf4" : dailyMode === "history" ? "#f8fafc" : "#f0f9ff";
                      const hoverBorder = dailyMode === "today" ? "hover:border-[#00a63e]" : dailyMode === "history" ? "hover:border-[#64748b]" : "hover:border-[#0369a1]";
                      return (
                        <div
                          key={habit.id}
                          className={`flex items-center gap-3 h-[52px] px-3 py-[10px] w-full group ${!isLast ? "border-b border-[rgba(236,236,236,0.8)]" : ""}`}
                        >
                          <button
                            onClick={() => toggleCompletion(habit.id, selectedDateKey)}
                            className="relative shrink-0 w-6 h-6 flex items-center justify-center"
                          >
                            {isDone ? (
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill={checkFill} stroke={checkStroke} strokeWidth="1.8"/>
                                <path d="M8 12l3 3 5-5" stroke={checkStroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <div className={`w-6 h-6 rounded-full border-[1.5px] border-[#e5e7eb] ${hoverBorder} transition-colors`} />
                            )}
                          </button>
                          <span className={`flex-1 text-sm text-[#1e2939] truncate ${isDone ? "line-through text-[#99a1af]" : ""}`}>
                            {habit.name}
                          </span>
                          <button
                            onClick={() => deleteHabit(habit.id)}
                            disabled={dailyMode === "history"}
                            className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center text-gray-300 hover:text-red-400 transition-all flex-shrink-0 disabled:pointer-events-none"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Add task — hidden for past days */}
              {dailyMode !== "history" && (
                <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-[10px] flex-shrink-0">
                  <form onSubmit={handleAdd} className="flex items-center gap-3 px-5 h-[52px]">
                    <svg className="w-4 h-4 text-[#9ca3af] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <input
                      type="text"
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      placeholder="Add a new task..."
                      className="flex-1 text-sm text-[#1e2939] placeholder-[#9ca3af] bg-transparent focus:outline-none"
                    />
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs text-[#9ca3af] whitespace-nowrap">Press Enter to Add</span>
                      <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 10L4 15l5 5"/>
                        <path d="M20 4v7a4 4 0 0 1-4 4H4"/>
                      </svg>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-5 text-[#9e9e9e] text-xs flex-shrink-0 capitalize">
          <span>Trasck V1 • {currentYear}</span>
        </div>

      </div>
    </main>
  );
}
