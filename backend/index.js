import express from "express";
import usersRoutes from "./routes/users.routes.js";
import goalsRoutes from "./routes/goals.routes.js";
import activityTypesRoutes from "./routes/activityTypes.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import cors from "cors";

const app = express();

//configuracion de cors
app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con el origen de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permitir credenciales (cookies, autenticación)
  }),
);
app.use(express.json());

// Prefijo /api
app.use("/api", usersRoutes);
app.use("/api", goalsRoutes);
app.use("/api", activityTypesRoutes);
app.use("/api", activityRoutes);

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
