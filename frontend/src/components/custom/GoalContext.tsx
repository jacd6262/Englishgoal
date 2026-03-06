// src/context/GoalsContext.tsx
import { createContext, useContext } from "react"
import { useGoals } from "../hooks/useGoals"

const GoalsContext = createContext<ReturnType<typeof useGoals> | null>(null)

export function GoalsProvider({ children }: { children: React.ReactNode }) {
  const goalsState = useGoals()
  return (
    <GoalsContext.Provider value={goalsState}>
      {children}
    </GoalsContext.Provider>
  )
}

export function useGoalsContext() {
  const ctx = useContext(GoalsContext)
  if (!ctx) throw new Error("useGoalsContext must be used within GoalsProvider")
  return ctx
}