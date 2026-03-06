import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "../layout/titleLayout";

const Cronometro = () => {
  const [time, setTime] = useState(0); // tiempo en ms acumulado
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (startTime !== null) {
          const now = Date.now();
          setTime((prev) => prev + (now - startTime));
          setStartTime(now);
        }
      }, 10); // refrescamos cada 10 ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const handlePause = () => {
    setIsRunning(false);
    setStartTime(null);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setStartTime(null);
  };

  // Formatear tiempo en mm:ss:ms
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10); // centésimas
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
  };

  // Formato simple: mm:ss (para la pestaña)
  const formatTimeSimple = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Mostrar también en la pestaña
  useEffect(() => {
    document.title = `⏱ ${formatTimeSimple(time)}`;
  }, [time]);

  return (
    <AppLayout pageTitle="⏱ Timer - English Goal">
      <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm flex flex-col items-center gap-8 relative overflow-hidden">
          
          {/* Decorative glows */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-600/10 rounded-full blur-[60px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-rose-900/10 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="text-center relative z-10 w-full">
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <span className="text-rose-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </span>
              Practice Timer
            </h1>
            <p className="text-sm text-zinc-400">Track your focused learning sessions</p>
          </div>

          <div className="bg-black/50 border border-zinc-800/80 rounded-xl px-8 py-6 w-full text-center relative z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {formatTime(time)}
            </h2>
          </div>

          <div className="flex w-full gap-3 relative z-10">
            {/* Si no está corriendo y el tiempo es 0 (no ha empezado) o si está pausado pero tiene tiempo */}
            {!isRunning ? (
              <Button 
                onClick={handleStart} 
                className="flex-1 bg-white hover:bg-zinc-200 text-black font-bold h-12 text-md transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                {time === 0 ? "Start Session" : "Resume"}
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold h-12 text-md border border-zinc-700 transition-all"
              >
                Pause
              </Button>
            )}

            <Button 
              onClick={handleReset} 
              disabled={time === 0 && !isRunning}
              className="px-6 bg-rose-600 hover:bg-rose-500 text-white font-bold h-12 disabled:opacity-30 disabled:hover:bg-rose-600 transition-all shadow-[0_0_10px_rgba(225,29,72,0.2)]"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Cronometro;
