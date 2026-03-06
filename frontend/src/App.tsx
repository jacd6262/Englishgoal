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

function App() {
  const { types, loading } = useActivityTypes();
  const { addActivity } = useActivities();

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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    addActivity({
      ...form,
      minutes_spent: Number(form.minutes_spent),
    });

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
    alert("Actividad registrada correctamente ✅");
  };

  return (
    <AppLayout pageTitle="English Goal">
      <div className="w-7xl bg-amber-50 contain-content mx-auto">
        {/* Banner siempre visible */}
        <BannerGoal />
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 bg-white rounded shadow"
        >
          <Input
            placeholder="Nombre de la actividad"
            value={form.activity_name}
            onChange={(e) =>
              setForm({ ...form, activity_name: e.target.value })
            }
          />
          <Input
            placeholder="Observación"
            value={form.observation}
            onChange={(e) => setForm({ ...form, observation: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Minutos"
            value={form.minutes_spent}
            onChange={(e) =>
              setForm({ ...form, minutes_spent: e.target.value })
            }
          />

          {/* Select de tipos */}
          {loading ? (
            <p>Cargando tipos...</p>
          ) : (
            <Select
              onValueChange={(val) =>
                setForm({ ...form, id_activity_type: Number(val) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tipo de actividad" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem
                    key={t.id_activity_type}
                    value={t.id_activity_type.toString()}
                  >
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button type="submit" className="bg-rose-900 hover:bg-rose-800 cursor-pointer">Registrar actividad</Button>
        </form>
      </div>
    </AppLayout>
  );
}

export default App;
