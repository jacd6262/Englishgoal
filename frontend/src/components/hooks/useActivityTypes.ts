import { useState, useEffect } from "react";
import { fetchActivityTypes } from "../../api/ApiControllers";
import type { ActivityType } from "../../api/interface";

export function useActivityTypes() {
  const [types, setTypes] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivityTypes()
      .then((data) => {
        setTypes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { types, loading, error };
}
