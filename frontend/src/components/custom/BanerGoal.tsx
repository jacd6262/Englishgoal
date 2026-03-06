import { Progress } from "@/components/ui/progress"
import { useGoalsContext } from "../../components/custom/GoalContext"

export function BannerGoal() {
  const { goals, loading, error } = useGoalsContext()

  if (error) return <p className="text-red-500">Error: {error}</p>
  if (loading || !goals) return <p className="text-gray-500">Cargando...</p>

  const targetHours = Math.floor(goals.target_minutes / 60)
  const remainingHours = Math.floor(goals.remaining_minutes / 60)
  const progress = (goals.remaining_minutes / goals.target_minutes) * 100

  return (
    <div className="w-7xl bg-gray-100 contain-content mx-auto p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">English Goal</h1>
      <p className="text-lg">Meta: {targetHours} horas</p>
      <p className="text-lg">Progreso: {remainingHours} horas</p>
      <p className="text-sm text-gray-600 mb-2">
        Horas faltantes: {targetHours - remainingHours}
      </p>

      <div className="relative w-full">
        <Progress
          value={progress}
          className={`h-4 ${
            progress > 70
              ? "bg-green-900"
              : progress > 40
              ? "bg-blue-900"
              : "bg-rose-900"
          }`}
        />
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
          {progress.toFixed(1)}%
        </span>
      </div>
    </div>
  )
}