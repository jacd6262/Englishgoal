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
    <AppLayout pageTitle="⏱ Cronómetro">
      <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow">
        <h1 className="text-xl font-bold">Cronometro</h1>
        <h2 className="text-3xl font-bold font-mono">{formatTime(time)}</h2>
        <div className="flex gap-2">
          <Button onClick={handleStart} disabled={isRunning}>
            Iniciar
          </Button>
          <Button
            onClick={handlePause}
            disabled={!isRunning}
            variant="secondary"
          >
            Pausar
          </Button>
          <Button onClick={handleReset} className="bg-rose-900">
            Reiniciar
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Cronometro;
