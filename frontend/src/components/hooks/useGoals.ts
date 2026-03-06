import { useState, useEffect } from "react"
import { fetchGoal } from "../../api/ApiControllers"
import type { Goal } from "../../api/interface"

export function useGoals() {
  const [goals, setGoals] = useState<Goal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadGoals = async () => {
    try {
      const data = await fetchGoal()
      setGoals(data)
      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGoals()
  }, [])

  return { goals, loading, error, reloadGoals: loadGoals }
}