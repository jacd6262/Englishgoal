import { BannerGoal } from "../src/components/custom/BanerGoal.tsx";
import { AppLayout } from "./layout/titleLayout.tsx";
import { useState } from "react";
import { Button } from "./components/ui/button.tsx";
import { Input } from "./components/ui/input.tsx";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useActivityTypes } from "./components/hooks/useActivityTypes.ts";
import { useActivities } from "./components/hooks/useActivities.ts";
import { toast } from "sonner";
import { useGoalsContext } from "./components/custom/GoalContext.tsx";

function App() {
  const { types, loading } = useActivityTypes();
  const { addActivity } = useActivities();
  const { reloadGoals } = useGoalsContext();

  const [form, setForm] = useState({
    id_user: 1,
    id_goal: 1,
    id_activity_type: 0,
    activity_name: "",
    observation: "",
    minutes_spent: "",
    date_activity: new Date().toISOString().split("T")[0],
    time_activity: new Date().toLocaleTimeString("en-GB"),
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addActivity({
        ...form,
        minutes_spent: Number(form.minutes_spent),
      });
      
      // Recargar las metas para que el banner se actualice
      reloadGoals();

    // Reset form
    setForm({
      id_user: 1,
      id_goal: 1,
      id_activity_type: 0,
      activity_name: "",
      observation: "",
      minutes_spent: "",
      date_activity: new Date().toISOString().split("T")[0],
      time_activity: new Date().toLocaleTimeString("en-GB"),
    });

      //mostrar alerta de exito
      toast.success("Activity Logged!", {
        description: "La actividad se registró correctamente en tu historial ✅",
        className: "!bg-gradient-to-r !from-zinc-800 !to-rose-900 !text-white !border-rose-500 !shadow-[0_0_20px_rgba(225,29,72,0.4)]",
      });
    } catch (error) {
      toast.error("Error logging activity", {
        description: "Hubo un problema al guardar la actividad.",
        className: "!bg-zinc-950 !text-white !border-red-500",
      });
    }
  };

  return (
    <AppLayout pageTitle="English Goal">
      <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-100 flex flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          {/* Banner siempre visible */}
          <BannerGoal />

          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Formulario */}
            <div className="flex-1 w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-white">Log Activity</h2>
                <p className="text-sm text-zinc-400 mt-1">Record your language learning sessions.</p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Activity Name</label>
                  <Input
                    placeholder="E.g. Watching a movie, Reading a book"
                    className="bg-zinc-950 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-rose-600"
                    value={form.activity_name}
                    onChange={(e) =>
                      setForm({ ...form, activity_name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Notes / Details</label>
                  <Input
                    placeholder="Any specific thoughts or words learned?"
                    className="bg-zinc-950 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-rose-600"
                    value={form.observation}
                    onChange={(e) => setForm({ ...form, observation: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Duration (Minutes)</label>
                  <Input
                    type="number"
                    placeholder="45"
                    className="bg-zinc-950 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-rose-600"
                    value={form.minutes_spent}
                    onChange={(e) =>
                      setForm({ ...form, minutes_spent: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Category</label>
                  {loading ? (
                    <div className="h-10 w-full animate-pulse rounded-md bg-zinc-800/50"></div>
                  ) : (
                    <Select
                      onValueChange={(val) =>
                        setForm({ ...form, id_activity_type: Number(val) })
                      }
                    >
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-200 focus-visible:ring-rose-600 font-medium">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-200">
                        {types.map((t) => (
                          <SelectItem
                            key={t.id_activity_type}
                            value={t.id_activity_type.toString()}
                            className="focus:bg-zinc-800 focus:text-white cursor-pointer"
                          >
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all cursor-pointer">
                    Save Session
                  </Button>
                </div>
              </form>
            </div>

            {/* Espacio para contenido futuro (como un resumen rápido) en la otra columna */}
            <div className="flex-1 hidden lg:flex flex-col gap-4">
              {/* Podrían ir widgets aquí */}
              <div className="flex flex-col justify-center items-center h-full border border-dashed border-zinc-800 rounded-xl bg-zinc-950/50 p-6 text-center text-zinc-500">
                <span className="text-4xl mb-4">🏆</span>
                <p className="font-medium text-zinc-400">Consistency is Key</p>
                <p className="text-sm mt-2 max-w-[250px]">Log your daily activities to maintain your learning streak and hit your goals faster.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default App;
