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
    <AppLayout pageTitle="History - English Goal">
      <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span className="text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                </span>
                Activity History
              </h1>
              <p className="text-zinc-400 mt-1">Review all your past learning sessions.</p>
            </div>
            <div className="text-sm font-medium px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              Total Sessions: <span className="text-white font-bold ml-1">{activities.length}</span>
            </div>
          </div>

          {/* Lista de actividades */}
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border items-center border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
              <span className="text-5xl mb-4 opacity-50">📝</span>
              <h3 className="text-xl font-bold text-zinc-300 mb-2">No activities yet</h3>
              <p className="text-zinc-500 max-w-sm">You haven't logged any practice sessions. Start practicing to see your history here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((activity) => (
                <div
                  key={activity.id_activity}
                  className="group relative bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all rounded-xl p-5 flex flex-col overflow-hidden"
                >
                  {/* Subtle red accent on hover */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-white truncate pr-2" title={activity.activity_name}>
                      {activity.activity_name}
                    </h2>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 whitespace-nowrap">
                      {activity.minutes_spent} min
                    </span>
                  </div>
                  
                  <p className="text-zinc-400 text-sm mb-6 flex-grow line-clamp-3">
                    {activity.observation || <span className="italic opacity-50">No notes provided.</span>}
                  </p>
                  
                  <div className="flex items-center text-xs text-zinc-500 mt-auto pt-4 border-t border-zinc-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    {new Date(activity.date_activity).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    <span className="mx-2">•</span>
                    {new Date(activity.date_activity).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default Historial;
