import { useGoalsContext } from "../../components/custom/GoalContext"

export function BannerGoal() {
  const { goals, loading, error } = useGoalsContext()

  if (error) return <p className="text-red-500">Error: {error}</p>
  if (loading || !goals) return <p className="text-gray-500">Cargando...</p>

  const targetHours = Math.floor(goals.target_minutes / 60);
  const completedMinutes = goals.remaining_minutes; // Horas registradas
  const completedHours = Math.floor(completedMinutes / 60);
  const completedExtraMinutes = completedMinutes % 60;
  const completedFormatted = `${completedHours}h ${completedExtraMinutes}m`;

  const actualRemainingMinutes = Math.max(0, goals.target_minutes - completedMinutes);
  const actualRemainingHours = Math.floor(actualRemainingMinutes / 60);
  const remainingFormatted = `${actualRemainingHours}h ${actualRemainingMinutes % 60}m`;

  // Calculamos el porcentaje de lo que ya se hizo (las horas registradas)
  const progressPercentage = Math.min(100, Math.max(0, (completedMinutes / goals.target_minutes) * 100));
  return (
    <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-900/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span className="bg-rose-600/20 text-rose-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="m17 5-5-3-5 3v5.5c0 4.3 3.3 8.1 8 9.5 4.7-1.4 8-5.2 8-9.5V5Z" /></svg>
              </span>
              Current Goal
            </h1>
            <p className="text-zinc-400 mt-2 max-w-md">Track your progress and stay focused on your learning objectives.</p>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-end bg-black/40 px-4 py-2 rounded-xl border border-zinc-800/50">
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500">Target</span>
              <span className="text-2xl font-bold text-white">{targetHours} <span className="text-sm font-normal text-zinc-500">hrs</span></span>
            </div>
            <div className="flex flex-col items-end bg-rose-950/30 px-4 py-2 rounded-xl border border-rose-900/30 shadow-[inset_0_0_20px_rgba(225,29,72,0.05)]">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-400/80">Completed</span>
              <span className="text-2xl font-bold text-rose-500">{completedFormatted}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-zinc-300">Progress</span>
            <span className="text-white bg-zinc-800 px-2 py-0.5 rounded text-xs select-all">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="relative w-full h-4 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-700 to-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.8)] transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-right text-zinc-500">
            Only <strong className="text-zinc-300">{remainingFormatted}</strong> left to reach your goal! Keep going!
          </p>
        </div>
      </div>
    </div>
  )
}