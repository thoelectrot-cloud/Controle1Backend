import express from "express";
import vehiculesRouter from "./routes/vehicules.js";
import { journal } from "./middlewares/journal.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(journal);

app.use("/vehicules", vehiculesRouter);

// Middleware placé après les routes pour les URL non trouvées
app.use((req, res) => {
  res.status(404).json({ erreur: "Route introuvable" });
});

app.listen(PORT, () => {
  console.log(`Serveur actif sur http://localhost:${PORT}`);
});