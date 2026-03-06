import { useEffect, useState } from "react";
import { AppLayout } from "../layout/titleLayout.tsx";
import type { ActivityWithId } from "../api/interface.ts";
import { fetchActivities } from "../api/ApiControllers.ts";

function Historial() {
  const [activities, setActivities] = useState<ActivityWithId[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err)),
      );
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <AppLayout pageTitle="Historial de Actividades">
      <div className="w-7xl bg-amber-50 contain-content mx-auto">
        {/* Lista de actividades */}
        {activities.length === 0 ? (
          <p className="text-gray-500 mt-4">No hay actividades registradas</p>
        ) : (
          <ul className="space-y-2 mt-4">
            {activities.map((activity) => (
              <li
                key={activity.id_activity}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-bold mb-4">
                  {activity.activity_name}
                </h2>
                <p className="text-gray-600">{activity.observation}</p>
                <p className="text-gray-600">
                  {activity.minutes_spent} minutos
                </p>
                <p className="text-gray-600">
                  {new Date(activity.date_activity).toLocaleDateString(
                    "es-CO",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}{" "}
                  {new Date(activity.date_activity).toLocaleTimeString(
                    "es-CO",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}

export default Historial;
