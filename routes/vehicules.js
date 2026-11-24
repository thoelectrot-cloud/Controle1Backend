import { Router } from "express";

const router = Router();

let vehicules = [
  { id: 1, marque: "Dacia", modele: "Logan", immatriculation: "12345-A-6", disponible: true },
  { id: 2, marque: "Renault", modele: "Clio", immatriculation: "67890-B-6", disponible: false },
  { id: 3, marque: "Peugeot", modele: "208", immatriculation: "24680-D-1", disponible: true }
];

let nextId = 4;

// GET /vehicules (avec filtre optionnel ?disponible=true)
router.get("/", (req, res) => {
  const { disponible } = req.query;

  if (disponible === "true") {
    return res.status(200).json(vehicules.filter((v) => v.disponible === true));
  }
  if (disponible === "false") {
    return res.status(200).json(vehicules.filter((v) => v.disponible === false));
  }

  return res.status(200).json(vehicules);
});

// GET /vehicules/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const vehicule = vehicules.find((v) => v.id === id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  return res.status(200).json(vehicule);
});

// POST /vehicules
router.post("/", (req, res) => {
  const { marque, modele, immatriculation } = req.body;

  if (!marque || !modele || !immatriculation) {
    return res.status(400).json({ erreur: "Champs obligatoires manquants" });
  }

  const nouveauVehicule = {
    id: nextId++,
    marque: String(marque).trim(),
    modele: String(modele).trim(),
    immatriculation: String(immatriculation).trim(),
    disponible: true
  };

  vehicules.push(nouveauVehicule);
  return res.status(201).json(nouveauVehicule);
});

// PATCH /vehicules/:id
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const vehicule = vehicules.find((v) => v.id === id);

  if (!vehicule) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  const { marque, modele, immatriculation, disponible } = req.body;

  if (marque !== undefined) vehicule.marque = String(marque).trim();
  if (modele !== undefined) vehicule.modele = String(modele).trim();
  if (immatriculation !== undefined) vehicule.immatriculation = String(immatriculation).trim();
  if (disponible !== undefined) vehicule.disponible = Boolean(disponible);

  return res.status(200).json(vehicule);
});

// DELETE /vehicules/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = vehicules.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ erreur: "Véhicule introuvable" });
  }

  vehicules.splice(index, 1);
  return res.status(204).send();
});

export default router;