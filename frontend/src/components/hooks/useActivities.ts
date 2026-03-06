import { useState, useEffect } from "react";
import {
  fetchActivities,
  createActivity,
  deleteActivity,
  updateActivity,
} from "../../api/ApiControllers";
import type { Activity, ActivityWithId } from "../../api/interface";

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesWithId, setActivitiesWithId] = useState<ActivityWithId[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //obtener actividades
  useEffect(() => {
    fetchActivities()
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
    setLoading(false);
  }, []);

  //crear una actividad
  const addActivity = async (activity: Activity) => {
    try {
      const newActivity = await createActivity(activity);
      setActivities([...activities, newActivity]);
      return newActivity; // Devolvemos la actividad para que el componente sepa que terminó
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err; // Relanzamos el error para manejarlo en el componente
    }
  };

  //eliminar una actividad
  const deleteActivityById = async (id_activity: number) => {
    try {
      await deleteActivity(id_activity);
      setActivities(
        activitiesWithId.filter(
          (activity) => activity.id_activity !== id_activity,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  //actualizar una actividad
  const updateActivityById = async (activity: ActivityWithId) => {
    try {
      await updateActivity(activity);
      setActivitiesWithId(
        activitiesWithId.map((a) =>
          a.id_activity === activity.id_activity ? activity : a,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return {
    activities,
    loading,
    error,
    addActivity,
    deleteActivityById,
    updateActivityById,
  };
};

export default useActivities;
